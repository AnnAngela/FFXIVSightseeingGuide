import EorzeaClock from './EorzeaTime'
import EorzeaAreaWeatherInfo from './EorzeaWeatherData'
import { WeatherRate } from './EorzeaWeatherData'

export default class EorzeaWeather {
    static calcBaseDate(time: EorzeaClock) {
        let tempDate = new EorzeaClock(time.date.getTime());
        let bh = tempDate.getHours() - tempDate.getHours() % 8;
        tempDate.date.setUTCHours(bh);
        tempDate.date.setMinutes(0);
        tempDate.date.setSeconds(0);
        return tempDate;
    }
    static forecastSeed(time: EorzeaClock, initSeeds: number[] = [0]) {
        function calcSeed(base: number) {
            let step1 = (base << 11 ^ base) >>> 0;
            let step2 = (step1 >>> 8 ^ step1) >>> 0;
            return step2 % 100;
        }
        return initSeeds
            .map(x => time.addHours(8 * x))
            .map(t => t.getDays() * 100 + ((t.getHours() + 8 - t.getHours() % 8) % 24))
            .map(i => calcSeed(i));
    }
    static getForecast(areaName: string, seeds: number[]) {
        function getWeather(rates: WeatherRate[], seed: number) {
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
            let areaRateData = EorzeaAreaWeatherInfo[areaName];
            return seeds.map(s => getWeather(areaRateData.weatherRate, s))
        } catch (err) {
            throw new ReferenceError("requested area name is not exist.");
        }
    }
}