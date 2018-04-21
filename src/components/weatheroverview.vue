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
                <tr v-for="item in weatherResult" :key="item.name">
                    <td>{{$t(item.name)}}</td>
                    <td><img class="weatherImg" :src="'./image/weather/' + item.weather[0] + '.png'"> {{$t(item.weather[0])}}</td>
                    <td><img class="weatherImg" :src="'./image/weather/' + item.weather[1] + '.png'"> {{$t(item.weather[1])}}</td>
                    <td><img class="weatherImg" :src="'./image/weather/' + item.weather[2] + '.png'"> {{$t(item.weather[2])}}</td>
                    <td><img class="weatherImg" :src="'./image/weather/' + item.weather[3] + '.png'"> {{$t(item.weather[3])}}</td>
                    <td><img class="weatherImg" :src="'./image/weather/' + item.weather[4] + '.png'"> {{$t(item.weather[4])}}</td>
                    <td><img class="weatherImg" :src="'./image/weather/' + item.weather[5] + '.png'"> {{$t(item.weather[5])}}</td>
                    <td><img class="weatherImg" :src="'./image/weather/' + item.weather[6] + '.png'"> {{$t(item.weather[6])}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss">
.weatherImg {
    max-height: 1.25em;
    margin-top: -0.25em;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import EorzeaClock from '../EorzeaTime'
import EorzeaWeather from '../EorzeaWeather'
import {EorzeaAreaWeather} from '../EorzeaWeatherData'

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
        this.$gBus.$on("weatherChange", (_: number) => {
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
        for(let area in EorzeaAreaWeather){
            let forecastedWeather = EorzeaWeather.getForecast(area, weatherSeeds);
            this.weatherResult.push({
                name: area,
                weather: forecastedWeather
            })
        }
    }
}
</script>