export default class EorzeaClock {
    static ratio: number = 1440 / 70;
    date: Date;
    constructor(ts?: number) {
        if (ts !== undefined) {
            this.date = new Date(ts);
        } else {
            this.date = new Date(Date.now() * EorzeaClock.ratio);
        }
    }
    getHours(): number {
        return this.date.getUTCHours();
    }
    addHours(hourspan: number): EorzeaClock {
        return new EorzeaClock(this.date.getTime() + hourspan * 3600000);
    }
    getMinutes(): number {
        return this.date.getUTCMinutes();
    }
    getDays(): number {
        return Math.floor(this.date.getTime() / 86400000);
    }
    getLocalTime(): Date {
        return new Date(this.date.getTime() / EorzeaClock.ratio);
    }
    toHourMinuteString(): string {
        const hour: number = this.getHours();
        const hs = `${hour < 10 ? "0" : ""}${hour}`;
        const min: number = this.getMinutes();
        const ms = `${min < 10 ? "0" : ""}${min}`;
        return `${hs}:${ms}`;
    }
}