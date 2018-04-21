import EorzeaClock from "./EorzeaTime";
import { EorzeaAreaWeather, IEorzeaArea } from "./EorzeaWeatherData";
import { IWeatherRate } from "./EorzeaWeatherData";

export default class EorzeaWeather {
    static calcBaseDate(time: EorzeaClock): EorzeaClock {
        let tempDate: EorzeaClock = new EorzeaClock(time.date.getTime());
        let bh: number = tempDate.getHours() - tempDate.getHours() % 8;
        tempDate.date.setUTCHours(bh);
        tempDate.date.setMinutes(0);
        tempDate.date.setSeconds(0);
        return tempDate;
    }
    static forecastSeed(time: EorzeaClock, initSeeds: number[] = [0]): number[] {
        function calcSeed(base: number): number {
            // tslint:disable:no-bitwise
            let step1: number = (base << 11 ^ base) >>> 0;
            let step2: number = (step1 >>> 8 ^ step1) >>> 0;
            // tslint:enable:no-bitwise
            return step2 % 100;
        }
        return initSeeds
            .map(x => time.addHours(8 * x))
            .map(t => t.getDays() * 100 + ((t.getHours() + 8 - t.getHours() % 8) % 24))
            .map(i => calcSeed(i));
    }
    static getForecast(areaName: string, seeds: number[]): string[] {
        function getWeather(rates: IWeatherRate[], seed: number): string {
            for (let r of rates) {
                if (r.rate === -1 || seed < r.rate) {
                    return r.weather;
                } else {
                    seed -= r.rate;
                }
            }
            return "N/A";
        }
        try {
            let areaRateData: IEorzeaArea = EorzeaAreaWeather[areaName];
            return seeds.map(s => getWeather(areaRateData.weatherRate, s));
        } catch (err) {
            throw new ReferenceError("requested area name is not exist.");
        }
    }
}