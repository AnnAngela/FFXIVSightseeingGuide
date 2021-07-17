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
    protected compareWeather(weather: string): boolean {
        return this.weathers.includes(weather);
    }
    private convertTo48Hours(time: number): number {
        return time < this.startHour ? time + 24 : time;
    }
    private static lastArrayItem<T>(array: T[]): T {
        return array[array.length - 1];
    }
    public calcNextAvailableTime(): void {
        const nowet: EorzeaClock = new EorzeaClock(undefined);
        const baseTime: EorzeaClock = EorzeaWeather.calcBaseDate(nowet);
        let isActive = false;
        let startTime = -1;
        let endTime = -1;
        let firstActivePhrase = -1;
        let firstForecast = "";
        for (let i = 0; i < 10000; i++) {
            const currentTime: EorzeaClock = baseTime.addHours(i * 8);
            const forecastSeed: number[] = EorzeaWeather.forecastSeed(baseTime, [i]);
            const forecast: string = EorzeaWeather.getForecast(this.area, forecastSeed)[0];
            if (this.compareWeather(forecast)) {
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
                const validTimes: number[] = this.time.filter(t => weatherAvaliableTime.includes(t));
                if (validTimes.length > 0) {
                    validTimes.sort((a, b) => this.convertTo48Hours(a) - this.convertTo48Hours(b));
                    if (!isActive) {
                        isActive = true;
                        startTime = Math.min(weatherAvaliableTime[0], this.startHour);
                        firstActivePhrase = i;
                        firstForecast = forecast;
                    }
                    endTime = Sightseeing.lastArrayItem(validTimes);
                }
                if (isActive && endTime !== Sightseeing.lastArrayItem(weatherAvaliableTime)) {
                    this.nextAvaliableTime = currentTime.clone();
                    this.nextAvaliableTime.date.setUTCHours(startTime);
                    this.nextAvaliableTimeEnd = currentTime.clone();
                    this.nextAvaliableTimeEnd.date.setUTCHours(endTime + 1);

                    this.nextAvaliableTimeLeft = Math.floor((this.nextAvaliableTimeEnd.getLocalTime().getTime() - nowet.getLocalTime().getTime()) / 1000 / 60);

                    if (firstActivePhrase === 0) {
                        if (this.startHour > this.convertTo48Hours(nowet.getHours())) {
                            this.isStillWaiting = true;
                        }
                        this.validStatus = "card-primary";
                    } else if (firstActivePhrase <= 3) {
                        this.validStatus = "card-info";
                    } else if (firstActivePhrase <= 6) {
                        this.validStatus = "card-secondary";
                    } else {
                        this.validStatus = "card-default";
                    }
                    this.forecast = firstForecast;
                    return;
                }
            }
        }
        this.nextAvaliableTime = baseTime.addHours(10000 * 8);
        this.validStatus = "card-danger";
    }
}
