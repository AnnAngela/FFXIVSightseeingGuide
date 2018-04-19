declare const Notification: {
    prototype: Notification;
    readonly permission: string;
    new(title: string, options?: NotificationOptions): Notification;
    requestPermission(callback?: NotificationPermissionCallback): Promise<string>;
};

interface NotificationServiceSetEventListener {
    (isSucceed: boolean, effectedValue: Notification | undefined): void;
}

interface NotificationServiceSetListenerMap {
    [key: string]: Set<NotificationServiceSetEventListener>;
}

class NotificationServiceSet extends Set {
    private _listenerMap: NotificationServiceSetListenerMap = {};
    constructor() {
        super();
    }
    addEventListener(event: string, callback: NotificationServiceSetEventListener) {
        if (!this._listenerMap[event]) this._listenerMap[event] = new Set();
        this._listenerMap[event].add(callback);
    }
    add(value: Notification) {
        let isSucceed = Set.prototype.add.bind(this)(value);
        if (this._listenerMap.add instanceof Set) {
            this._listenerMap.add.forEach((callback: NotificationServiceSetEventListener) => {
                callback.bind(this)(isSucceed, value);
            });
        }
        return Set.prototype.add.bind(this)(value);
    }
    clear() {
        if (this._listenerMap.clear instanceof Set) {
            this._listenerMap.clear.forEach((callback: NotificationServiceSetEventListener) => {
                callback.bind(this)(true, undefined);
            });
        }
        return Set.prototype.clear.bind(this)();
    }
    delete(value: Notification) {
        let isSucceed: boolean = Set.prototype.delete.bind(this)(value);
        if (this._listenerMap.delete instanceof Set) {
            this._listenerMap.delete.forEach((callback: NotificationServiceSetEventListener) => {
                callback.bind(this)(isSucceed, value);
            });
        }
        return isSucceed;
    }
}

class NotificationServiceQuitQueue extends Map {
    constructor() {
        super();
        let date = new Date(), now = date.getTime();
        date.setTime((Math.floor(date.getTime() / 1000) + 1) * 1000);
        setTimeout(_ => {
            this._clearExpriedNotification();
            setInterval(_ => {
                this._clearExpriedNotification();
            }, 1000);
        }, date.getTime() - now);
    }
    add(notification: Notification) {
        let expire = Date.now() + 13000;
        while (this._expired(expire).length !== this.size) expire += 2000;
        return this.set(expire, notification);
    }
    private _expired(t?: number) {
        let now = t || Date.now(), result: number[] = [];
        let keys: IterableIterator<number> = this.keys();
        for (let k of keys) {
            if (k < now) result.push(k);
        }
        return result;
    }
    private _clearExpriedNotification() {
        this._expired().forEach(k => {
            this.get(k).close();
            this.delete(k);
        });
    }
}

interface NotificationServiceOptions {
    title?: string;
    body?: string;
    lang?: string;
    length?: number;
    icon?: string;
}

export class NotificationServiceOption implements NotificationServiceOptions {
    title: string = '';
    body: string = '';
    length: number = 0;
    constructor(option?: NotificationServiceOptions) {
        if (option) {
            this._copyOption(this, option);
        }
    }
    protected _copyOption(target: NotificationServiceOption, src: any) {
        ['title', 'lang', 'body', 'icon'].forEach((key: string) => {
            if (src[key]) target[key] = src[key];
        });
    }
    clone() {
        return new NotificationServiceOption(this);
    }
    extend(option?: any) {
        var new_option = this.clone();
        if (option) {
            this._copyOption(new_option, option);
        }
        if (new_option.length === 0) new_option.length = 1;
        return new_option;
    }
    extendTitle(title: string) {
        return this.extend({
            title,
        });
    }
    add(body: string) {
        if (this.length++ !== 0) this.body += ', ';
        this.body += body;
        return this;
    }
}

interface NotificationServiceConstructorOption {
    welcomeOption?: NotificationServiceOption;
    defaultOption?: NotificationServiceOption;
}

export class NotificationService {
    static readonly isSupported = !!('Notification' in window);
    static readonly PERMISSION = {
        GRANTED: 'granted',
        DENIED: 'denied',
        NEEDGRANTED: 'default',
    };
    permission: boolean = NotificationService.isSupported && Notification.permission === NotificationService.PERMISSION.GRANTED;
    defaultOption: NotificationServiceOption = new NotificationServiceOption();
    isOnBeforeunload = false;
    notificationServiceQuitQueue = new NotificationServiceQuitQueue();
    private notificationSet = new NotificationServiceSet();
    private notificationQueue: Set<NotificationServiceOption> = new Set();
    constructor({ welcomeOption, defaultOption }: NotificationServiceConstructorOption) {
        if (!NotificationService.isSupported) {
            return;
        }
        if (defaultOption) this.defaultOption = defaultOption;
        if (this.permission === true) {
            if (welcomeOption) this.sendNotification(welcomeOption);
        } else if (Notification.permission === NotificationService.PERMISSION.NEEDGRANTED) {
            Notification.requestPermission((permission: NotificationPermission) => {
                if (permission === NotificationService.PERMISSION.GRANTED) {
                    this.permission = true;
                    if (welcomeOption) this.sendNotification(welcomeOption);
                }
            });
        } else {
            return;
        }
        window.addEventListener('beforeunload', _ => {
            this.isOnBeforeunload = true;
            this.notificationSet.forEach((notification: Notification) => {
                notification.close();
            });
        });
        this.notificationSet.addEventListener('delete', (isSucceed) => {
            if (isSucceed && this.notificationQueue.size > 0) {
                this.notificationQueue.forEach((opt: NotificationServiceOption) => {
                    if (this.notificationSet.size < 3) {
                        this.sendNotification(opt);
                        this.notificationQueue.delete(opt);
                    }
                });
            }
        });
    }
    sendNotification(options: NotificationServiceOption | NotificationServiceOption[]) {
        if (this.permission === true && this.isOnBeforeunload === false) {
            if (Array.isArray(options)) {
                options.forEach((option: NotificationServiceOption) => {
                    this.sendNotification(option);
                });
            } else {
                if (options.length > 0) {
                    if (this.notificationSet.size < 3) {
                        let o = this.defaultOption.extend(options);
                        let notification: Notification = new Notification(options.title, o);
                        this.bindNotification(notification);
                    } else {
                        this.notificationQueue.add(options);
                    }
                }
            }
        }
    }
    private bindNotification(notification: Notification) {
        this.notificationSet.add(notification);
        notification.addEventListener('error', _ => {
            notification.close();
        });
        notification.addEventListener('click', _ => {
            window.focus();
            notification.close();
        });
        notification.addEventListener('close', _ => {
            this.notificationSet.delete(notification);
        });
        this.notificationServiceQuitQueue.add(notification);
    }
}
