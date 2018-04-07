export default class EorzeaClock {
    static ratio = 1440 / 70;
    date: Date;
    constructor(ts: number | undefined = undefined) {
        if (ts !== undefined) {
            this.date = new Date(ts);
        } else {
            this.date = new Date(Date.now() * EorzeaClock.ratio);
        }
    }
    getHours(): number {
        return this.date.getUTCHours();
    }
    addHours(hourspan: number) {
        return new EorzeaClock(this.date.getTime() + hourspan * 3600000);
    }
    getMinutes(): number {
        return this.date.getUTCMinutes();
    }
    getDays() {
        return Math.floor(this.date.getTime() / 86400000);
    }
    getLocalTime() {
        return new Date(this.date.getTime() / EorzeaClock.ratio);
    }
    toHourMinuteString() {
        let hour = this.getHours();
        let hs = `${hour < 10 ? '0' : ''}${hour}`;
        let min = this.getMinutes();
        let ms = `${min < 10 ? '0' : ''}${min}`;
        return `${hs}:${ms}`;
    }
}