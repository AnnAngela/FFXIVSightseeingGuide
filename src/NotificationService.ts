declare const Notification: {
    prototype: Notification;
    readonly permission: string;
    new (title: string, options?: NotificationOptions): Notification;
    requestPermission(callback?: NotificationPermissionCallback): Promise<string>;
};

interface NotificationServiceSetListenerMap {
    [key: string]: Set<() => void>;
}

interface NotificationServiceQueueItem {
    title: string;
    option: NotificationServiceOption;
}

class NotificationServiceSet extends Set {
    private _listenerMap: NotificationServiceSetListenerMap = {};
    constructor() {
        super();
    }
    addEventListener(event: string, callback: () => void) {
        if (!this._listenerMap[event]) this._listenerMap[event] = new Set();
        this._listenerMap[event].add(callback);
    }
    add(value: Notification) {
        if (this._listenerMap.add) {
            this._listenerMap.add.forEach((callback: () => void) => {
                callback.bind(this)({
                    addedValue: value,
                });
            });
        }
        return Set.prototype.add.bind(this)(value);
    }
    clear() {
        if (this._listenerMap.clear) {
            this._listenerMap.clear.forEach((callback: () => void) => {
                callback.bind(this)();
            });
        }
        return Set.prototype.clear.bind(this)();
    }
    delete(value: Notification) {
        let isSucceed: boolean = Set.prototype.delete.bind(this)();
        if (this._listenerMap.delete) {
            this._listenerMap.delete.forEach((callback: () => void) => {
                callback.bind(this)({
                    deletedValue: value,
                    isSucceed,
                });
            });
        }
        return isSucceed;
    }
}

export class NotificationServiceOption {
    lang: string = 'zh-CN';
    body: string = '';
    length: number = 0;
    constructor(option?: any) {
        if (option) {
            if (option.lang) this.lang = option.lang;
            if (option.body) this.body = option.body;
            if (option.length) this.length = option.length;
        }
    }
    clone() {
        return new NotificationServiceOption(this);
    }
    extend(option?: any) {
        var new_option = this.clone();
        if (option) {
            if (option.lang) new_option.lang = option.lang;
            if (option.body) new_option.body = option.body;
            if (option.length) new_option.length = option.length;
        }
        return new_option;
    }
}

export class NotificationService {
    permission: boolean | symbol = false;
    static readonly UNSUPPORTED = Symbol('NotificationService.UNSUPPORTED');
    defaultOption: NotificationServiceOption;
    private notificationSet = new NotificationServiceSet();
    private notificationQueue = new Set();
    constructor(welcomeTitle: string, welcomeOption: NotificationServiceOption, defaultOption: NotificationServiceOption) {
        if (!('Notification' in window)) {
            this.permission = NotificationService.UNSUPPORTED;
            return;
        }
        this.defaultOption = defaultOption;
        if (Notification.permission === 'default')
            Notification.requestPermission((permission: NotificationPermission) => {
                if (permission === 'granted') {
                    this.permission = true;
                    this.sendNotification(welcomeTitle, welcomeOption);
                }
            });
        else if (Notification['permission'] === 'granted') {
            this.permission = true;
            this.sendNotification(welcomeTitle, welcomeOption);
        } else {
            this.permission = false;
        }
        window.addEventListener('beforeunload', _ => {
            this.notificationSet.forEach((notification: Notification) => {
                notification.close();
            });
        });
        this.notificationSet.addEventListener('delete', () => {
            if (this.notificationSet.size < 3 && this.notificationQueue.size > 0) {
                this.notificationQueue.forEach((opt: NotificationServiceQueueItem) => {
                    if (this.notificationSet.size < 3) {
                        this.sendNotification(opt.title, opt.option, true);
                        this.notificationQueue.delete(opt);
                    }
                });
            }
        });
    }
    sendNotification(title: string, option?: any, isQueued: boolean = false) {
        if (this.permission === true) {
            if (this.notificationSet.size < 3) {
                let o = this.defaultOption.extend(option);
                let notification: Notification = new Notification(title, o);
                this.bindNotification(notification, isQueued);
            } else {
                this.notificationQueue.add({
                    title,
                    option,
                });
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
