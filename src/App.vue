<template>
    <div class="container-fluid">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">ET {{eorzeaclock}}</a>
                </div>

                <div class="collapse navbar-collapse" id="navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><router-link to="/">{{$t("info.home")}}</router-link></li>
                        <li><router-link to="/weatheroverview">{{$t("info.weatheroverview")}}</router-link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{$t("lang." + currentLang)}} <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:;" @click="chlang('zh-CN')">{{$t("lang.zh-CN")}}</a></li>
                                <li><a href="javascript:;" @click="chlang('en-US')">{{$t("lang.en-US")}}</a></li>
                                <li><a href="javascript:;" @click="chlang('ja-JP')">{{$t("lang.ja-JP")}}</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
body{
    padding-top: 80px;
}
</style>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import EorzeaClock from "./EorzeaTime"

@Component
export default class App extends Vue {
    eorzeaclock: string = "00:00";
    _lastWeatherChangeKey: number = 0;
    get currentLang(){
        return this.$i18n.locale;
    }
    created(){
        let self = this;
        this.$i18n.locale = localStorage.getItem("lang") || "zh-CN";
        setInterval(function(){
            let nowet = new EorzeaClock(undefined);

            let weatherChangeKey = (nowet.getHours() / 8) >>> 0;
            if(self._lastWeatherChangeKey != weatherChangeKey){
                self.$gBus.$emit("weatherChange", weatherChangeKey);
                self._lastWeatherChangeKey = weatherChangeKey;
            }

            let hour = nowet.getHours();
            let hs = "";
            if(hour < 10){
                hs = "0" + hour;
            }else{
                hs += hour;
            }
            let min = nowet.getMinutes();
            let ms = "";
            if(min < 10){
                ms = "0" + min;
            }
            else{
                ms += min;
            }
            self.eorzeaclock = hs + ":" + ms;
        }, 1000);
    }
    chlang(v: string){
        this.$i18n.locale = v;
        localStorage.setItem("lang", v);
    }
}
</script>