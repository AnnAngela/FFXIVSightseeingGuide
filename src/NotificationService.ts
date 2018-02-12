declare const Notification: {
    prototype: Notification;
    readonly permission: string;
    new (title: string, options?: NotificationOptions): Notification;
    requestPermission(callback?: NotificationPermissionCallback): Promise<string>;
};
type NotificationServiceSetListener = (effectedValue: Notification | undefined, isSucceed: boolean) => void;
interface NotificationServiceSetListenerMap {
    [key: string]: Set<NotificationServiceSetListener>;
}

class NotificationServiceSet<T extends Notification> extends Set {
    private _listenerMap: NotificationServiceSetListenerMap = {};
    constructor() {
        super();
    }
    addEventListener(event: string, callback: NotificationServiceSetListener) {
        if (!this._listenerMap[event]) this._listenerMap[event] = new Set();
        this._listenerMap[event].add(callback);
    }
    add(value: Notification) {
        if (this._listenerMap.add) {
            this._listenerMap.add.forEach((callback: NotificationServiceSetListener) => {
                callback.bind(this)(value, true);
            });
        }
        return Set.prototype.add.bind(this)(value);
    }
    clear() {
        if (this._listenerMap.clear) {
            this._listenerMap.clear.forEach((callback: NotificationServiceSetListener) => {
                callback.bind(this)(undefined, true);
            });
        }
    }
    delete(value: Notification) {
        let isSucceed: boolean = Set.prototype.delete.bind(this)(value);
        if (this._listenerMap.delete) {
            this._listenerMap.delete.forEach((callback: NotificationServiceSetListener) => {
                callback.bind(this)(value, isSucceed);
            });
        }
        return isSucceed;
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
            this.notificationSet.forEach((notification: Notification) => {
                notification.close();
            });
        });
        this.notificationSet.addEventListener('delete', (_, isSucceed) => {
            if (isSucceed && this.notificationQueue.size > 0) {
                this.notificationQueue.forEach((opt: NotificationServiceOption) => {
                    if (this.notificationSet.size < 3) {
                        this.sendNotification(opt, true);
                        this.notificationQueue.delete(opt);
                    }
                });
            }
        });
    }
    sendNotification(options: NotificationServiceOption | NotificationServiceOption[], isQueued: boolean = false) {
        if (this.permission === true) {
            if (Array.isArray(options)) {
                options.forEach((option: NotificationServiceOption) => {
                    this.sendNotification(option, isQueued);
                });
            } else {
                if (options.length > 0) {
                    if (this.notificationSet.size < 3) {
                        let o = this.defaultOption.extend(options);
                        let notification: Notification = new Notification(options.title, o);
                        this.bindNotification(notification, isQueued);
                    } else {
                        this.notificationQueue.add(options);
                    }
                }
            }
        }
    }
    private bindNotification(notification: Notification, isQueued: boolean = false) {
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
        setTimeout(_ => {
            notification.close();
        }, isQueued ? 10000 : 15000);
    }
}
