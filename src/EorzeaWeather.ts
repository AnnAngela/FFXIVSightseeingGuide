import EorzeaClock from "./EorzeaTime";
import { EorzeaAreaWeather, IEorzeaArea } from "./EorzeaWeatherData";
import { IWeatherRate } from "./EorzeaWeatherData";

export default class EorzeaWeather {
    static calcBaseDate(time: EorzeaClock): EorzeaClock {
        const tempDate: EorzeaClock = new EorzeaClock(time.date.getTime());
        const bh: number = tempDate.getHours() - tempDate.getHours() % 8;
        tempDate.date.setUTCHours(bh);
        tempDate.date.setMinutes(0);
        tempDate.date.setSeconds(0);
        return tempDate;
    }
    private static calcSeed(base: number): number {
        // tslint:disable:no-bitwise
        const step1: number = (base << 11 ^ base) >>> 0;
        const step2: number = (step1 >>> 8 ^ step1) >>> 0;
        // tslint:enable:no-bitwise
        return step2 % 100;
    }
    static forecastSeed(time: EorzeaClock, initSeeds: number[] = [0]): number[] {
        return initSeeds
            .map(x => time.addHours(8 * x))
            .map(t => t.getDays() * 100 + (t.getHours() + 8 - t.getHours() % 8) % 24)
            .map(i => EorzeaWeather.calcSeed(i));
    }
    private static getWeather(rates: IWeatherRate[], _seed: number): string {
        let seed = _seed;
        for (const r of rates) {
            if (r.rate === -1 || seed < r.rate) {
                return r.weather;
            }
            seed -= r.rate;

        }
        return "N/A";
    }
    static getForecast(areaName: string, seeds: number[]): string[] {
        try {
            const areaRateData: IEorzeaArea = EorzeaAreaWeather[areaName];
            return seeds.map(s => EorzeaWeather.getWeather(areaRateData.weatherRate, s));
        } catch (err) {
            throw new ReferenceError("requested area name is not exist.");
        }
    }
}