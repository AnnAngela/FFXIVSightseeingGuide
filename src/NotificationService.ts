declare const Notification: {
    prototype: Notification;
    readonly permission: string;
    new(title: string, options?: NotificationOptions): Notification;
    requestPermission(callback?: NotificationPermissionCallback): Promise<string>;
};
export module NotificationService {
    interface INSSetEventListener {
        (isSucceed: boolean, effectedValue: Notification | undefined): void;
    }

    interface INSSetListenerMap {
        [key: string]: Set<INSSetEventListener>;
    }

    class NSSet extends Set {
        private _listenerMap: INSSetListenerMap = {};
        constructor() {
            super();
        }
        addEventListener(event: string, callback: INSSetEventListener): void {
            if (!this._listenerMap[event]) { this._listenerMap[event] = new Set(); }
            this._listenerMap[event].add(callback);
        }
        add(value: Notification): this {
            let isSucceed: boolean = Set.prototype.add.bind(this)(value);
            if (this._listenerMap.add instanceof Set) {
                this._listenerMap.add.forEach((callback: INSSetEventListener) => {
                    callback.bind(this)(isSucceed, value);
                });
            }
            return Set.prototype.add.bind(this)(value);
        }
        clear(): void {
            if (this._listenerMap.clear instanceof Set) {
                this._listenerMap.clear.forEach((callback: INSSetEventListener) => {
                    callback.bind(this)(true, undefined);
                });
            }
            return Set.prototype.clear.bind(this)();
        }
        delete(value: Notification): boolean {
            let isSucceed: boolean = Set.prototype.delete.bind(this)(value);
            if (this._listenerMap.delete instanceof Set) {
                this._listenerMap.delete.forEach((callback: INSSetEventListener) => {
                    callback.bind(this)(isSucceed, value);
                });
            }
            return isSucceed;
        }
    }

    class NSQuitQueue extends Map {
        constructor() {
            super();
            let date: Date = new Date(), now: number = date.getTime();
            date.setTime((Math.floor(date.getTime() / 2000) + 1) * 2000);
            setTimeout(() => {
                this._clearExpriedNotification();
                setInterval(() => {
                    this._clearExpriedNotification();
                }, 2000);
            }, date.getTime() - now);
        }
        add(notification: Notification): this {
            return this.set(Date.now(), notification);
        }
        deleteNotification(notification: Notification): void {
            this.forEach((v, k) => {
                if (v === notification) { this.delete(k); }
            });
        }
        private _expired(t?: number): number[] {
            let now: number = t || Date.now() - 13000, result: number[] = [];
            for (let k of this.keys()) {
                if (k < now) { result.push(k); }
            }
            return result;
        }
        private _clearExpriedNotification(): void {
            let expiredKey: number | undefined = this._expired()[0];
            if (expiredKey) {
                this.get(expiredKey).close();
                this.delete(expiredKey);
            }
        }
    }

    interface INSOptions {
        title?: string;
        body?: string;
        lang?: string;
        length?: number;
        icon?: string;
    }

    export class Option implements INSOptions {
        title: string = "";
        body: string = "";
        length: number = 0;
        constructor(option?: INSOptions) {
            if (option) {
                this._copyOption(this, option);
            }
        }
        protected _copyOption(target: Option, src: any): void {
            ["title", "lang", "body", "icon"].forEach((key: string) => {
                if (src[key]) { target[key] = src[key]; }
            });
        }
        clone(): Option {
            return new Option(this);
        }
        extend(option?: any): Option {
            let new_option: Option = this.clone();
            if (option) {
                this._copyOption(new_option, option);
            }
            if (new_option.length === 0) { new_option.length = 1; }
            return new_option;
        }
        extendTitle(title: string): Option {
            return this.extend({
                title,
            });
        }
        add(body: string): this {
            if (this.length++ !== 0) { this.body += ", "; }
            this.body += body;
            return this;
        }
    }

    interface INSConstructorOption {
        welcomeOption?: Option;
        defaultOption?: Option;
    }

    export class Main {
        static readonly isSupported = !!("Notification" in window);
        static readonly PERMISSION = {
            GRANTED: "granted",
            DENIED: "denied",
            NEEDGRANTED: "default",
        };
        permission: boolean = !!("Notification" in window) && Notification.permission === Main.PERMISSION.GRANTED;
        defaultOption: Option = new Option();
        isOnBeforeunload = false;
        NSQuitQueue = new NSQuitQueue();
        private notificationSet = new NSSet();
        private notificationQueue: Set<Option> = new Set();
        constructor({ welcomeOption, defaultOption }: INSConstructorOption) {
            if (!Main.isSupported) {
                return;
            }
            if (defaultOption) { this.defaultOption = defaultOption; }
            if (this.permission === true) {
                if (welcomeOption) { this.sendNotification(welcomeOption); }
            } else if (Notification.permission === Main.PERMISSION.NEEDGRANTED) {
                Notification.requestPermission((permission: NotificationPermission) => {
                    if (permission === Main.PERMISSION.GRANTED) {
                        this.permission = true;
                        if (welcomeOption) { this.sendNotification(welcomeOption); }
                    }
                });
            } else {
                return;
            }
            window.addEventListener("beforeunload", () => {
                this.isOnBeforeunload = true;
                this.notificationSet.forEach((notification: Notification) => {
                    notification.close();
                });
            });
            this.notificationSet.addEventListener("delete", (isSucceed) => {
                if (isSucceed && this.notificationQueue.size > 0) {
                    this.notificationQueue.forEach((opt: Option) => {
                        if (this.notificationSet.size < 3) {
                            this.sendNotification(opt);
                            this.notificationQueue.delete(opt);
                        }
                    });
                }
            });
        }
        sendNotification(options: Option | Option[]): void {
            if (this.permission === true && this.isOnBeforeunload === false) {
                if (Array.isArray(options)) {
                    options.forEach((option: Option) => {
                        this.sendNotification(option);
                    });
                } else {
                    if (options.length > 0) {
                        if (this.notificationSet.size < 3) {
                            let o: Option = this.defaultOption.extend(options);
                            let notification: Notification = new Notification(options.title, o);
                            this.bindNotification(notification);
                        } else {
                            this.notificationQueue.add(options);
                        }
                    }
                }
            }
        }
        private bindNotification(notification: Notification): void {
            this.notificationSet.add(notification);
            notification.addEventListener("error", () => {
                notification.close();
            });
            notification.addEventListener("click", () => {
                window.focus();
                notification.close();
            });
            notification.addEventListener("close", () => {
                this.notificationSet.delete(notification);
                this.NSQuitQueue.deleteNotification(notification);
            });
            this.NSQuitQueue.add(notification);
        }
    }
}