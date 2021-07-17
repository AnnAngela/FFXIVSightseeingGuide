import EorzeaClock from "./EorzeaTime";
import EorzeaWeather from "./EorzeaWeather";
import { ISightseeingGroup, ISightseeingItem, SightseeingData, IPos } from "./SightseeingData";
export { ISightseeingGroup, ISightseeingItem, SightseeingData, IPos };

export class Sightseeing {
    id: string;
    area: string;
    subarea?: string;
    pos: IPos;
    weathers: string[];
    time: number[];
    timestr: string;
    action: string;
    nextAvaliableTime: EorzeaClock = new EorzeaClock(undefined);
    nextAvaliableTimeEnd?: EorzeaClock;
    nextAvaliableTimeLeft?: number;
    validStatus = "";
    isStillWaiting = false;
    startHour: number;
    endHour: number;
    forecast = "";
    isOversize = false;
    constructor(item: ISightseeingItem) {
        this.id = item.id;
        this.area = item.area;
        this.subarea = item.subarea;
        this.pos = item.pos;
        this.weathers = item.weathers;
        this.time = item.time;
        this.timestr = item.timestr;
        this.action = item.action;
        this.startHour = item.startHour;
        this.endHour = item.endHour;
    }
    compareWeather(a: string[], b: string): boolean {
        return a.includes(b);
    }
    calcNextAvailableTime(): void {
        const nowet: EorzeaClock = new EorzeaClock(undefined);
        const baseTime: EorzeaClock = EorzeaWeather.calcBaseDate(nowet);
        for (let i = 0; i < 10000; i++) {
            const currentTime: EorzeaClock = baseTime.addHours(i * 8);
            const forecastSeed: number[] = EorzeaWeather.forecastSeed(baseTime, [i]);
            const forecast: string = EorzeaWeather.getForecast(this.area, forecastSeed)[0];
            if (this.compareWeather(this.weathers, forecast)) {
                // 天气匹配成功
                const weatherAvaliableTime: number[] = Array.from(
                    { length: 8 },
                    (_, index: number) => index + currentTime.getHours()
                );
                if (i === 0) {
                    const invalidEnd: number = nowet.getHours() - 1 - baseTime.getHours();
                    if (invalidEnd > 0) {
                        weatherAvaliableTime.splice(0, invalidEnd);
                    }
                }
                const validTimes: number[] = this.time.filter(t => weatherAvaliableTime.includes(t)); // calc intersection
                if (validTimes.length !== 0) {
                    // 时间匹配成功
                    validTimes.sort((a, b) => a - b);

                    const nextAvaliableTime = validTimes[0];
                    this.nextAvaliableTime = currentTime.clone();
                    this.nextAvaliableTime.date.setUTCHours(nextAvaliableTime);

                    const nextAvaliableTimeEnd = validTimes[validTimes.length - 1];
                    this.nextAvaliableTimeEnd = currentTime.clone();
                    this.nextAvaliableTimeEnd.date.setUTCHours(nextAvaliableTimeEnd + 1);

                    this.nextAvaliableTimeLeft = Math.floor((this.nextAvaliableTimeEnd.getLocalTime().getTime() - nowet.getLocalTime().getTime()) / 1000 / 60);

                    if (this.startHour < this.endHour || this.startHour > nextAvaliableTime) {
                        this.isOversize = nextAvaliableTimeEnd < this.endHour - 1;
                    } else {
                        this.isOversize = true;
                    }

                    if (i === 0) {
                        let nowHour: number = nowet.getHours();
                        if (baseTime.getHours() === 0 && this.startHour > 8) { nowHour += 24; }
                        if (this.startHour > nowHour) { this.isStillWaiting = true; }
                        this.validStatus = "card-primary";
                    } else if (i <= 3) {
                        this.validStatus = "card-info";
                    } else if (i <= 6) {
                        this.validStatus = "card-secondary";
                    } else {
                        this.validStatus = "card-default";
                    }
                    this.forecast = forecast;
                    return;
                }
            }
        }
        this.nextAvaliableTime = baseTime.addHours(10000 * 8);
        this.validStatus = "card-danger";
    }
}
