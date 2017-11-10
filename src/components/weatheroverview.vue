<template>
    <div>
        <h3>{{$t("info.weatheroverview")}}</h3>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>{{$t("info.area")}}</th>
                    <th>{{$t("info.before")}}<br>{{hourString[0]}}~</th>
                    <th>{{$t("info.now")}}<br>{{hourString[1]}}~</th>
                    <th>{{hourString[2]}}~</th>
                    <th>{{hourString[3]}}~</th>
                    <th>{{hourString[4]}}~</th>
                    <th>{{hourString[5]}}~</th>
                    <th>{{hourString[6]}}~</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in weatherResult">
                    <td>{{$t(item.name)}}</td>
                    <td>{{$t(item.weather[0])}}</td>
                    <td>{{$t(item.weather[1])}}</td>
                    <td>{{$t(item.weather[2])}}</td>
                    <td>{{$t(item.weather[3])}}</td>
                    <td>{{$t(item.weather[4])}}</td>
                    <td>{{$t(item.weather[5])}}</td>
                    <td>{{$t(item.weather[6])}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import EorzeaClock from '../EorzeaTime'
import EorzeaWeather from '../EorzeaWeather'
import EorzeaWeatherData from '../EorzeaWeatherData'

const timeTag = ["00:00", "08:00", "16:00"];

interface AreaWeatherForecast{
    name: string;
    weather: string[];
}

@Component
export default class WeatherOverviewPage extends Vue {
    hourString:string[] = []; //基准时间
    weatherResult: AreaWeatherForecast[] = [];
    created(){
        this.weatherchange();
        this.$gBus.$on("weatherChange", (s: number) => {
            this.weatherchange();
        });
    }
    weatherchange(){
        let eorzeaNow = new EorzeaClock(undefined);
        let baseTime: EorzeaClock = EorzeaWeather.calcBaseDate(eorzeaNow);
        let baseHour = baseTime.getHours() / 8;
        this.hourString = [-1, 0, 1, 2, 3, 4, 5].map(i => baseHour + i).map(bh => timeTag[(bh + 3) % 3]);
        let weatherSeeds = EorzeaWeather.forecastSeed(eorzeaNow, [-1, 0, 1, 2, 3, 4, 5]);

        this.weatherResult = [];
        for(let area in EorzeaWeatherData){
            let forecastedWeather = EorzeaWeather.getForecast(area, eorzeaNow, weatherSeeds);
            this.weatherResult.push({
                name: area,
                weather: forecastedWeather
            })
        }
    }
}
</script>