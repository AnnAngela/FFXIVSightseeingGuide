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
                        <li :class="{active: $route.path == '/'}"><router-link to="/">{{$t("info.home")}}</router-link></li>
                        <li :class="{active: $route.path == '/weatheroverview'}"><router-link to="/weatheroverview">{{$t("info.weatheroverview")}}</router-link></li>
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
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
html {
    min-height: 100%;
}
body {
    padding: 70px 0 42px;
}
footer {
    position: fixed;
    bottom: 0;
    width: 100% !important;
    height: 60px;
    line-height: 42px;
    padding-top: 18px;
    background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7) 20%, rgba(255, 255, 255, 0.8) 30%, rgb(255, 255, 255));
    background-color: transparent;
    text-align: center;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import EorzeaClock from './EorzeaTime';
import { Sightseeing } from './Sightseeing';

@Component
export default class App extends Vue {
    eorzeaclock: string = '00:00';
    _lastWeatherChangeKey: number = 0;
    _lastHour: number = 0;
    get currentLang() {
        return this.$i18n.locale;
    }
    created() {
        let self = this;
        this.$i18n.locale = localStorage.getItem('lang') || 'zh-CN';
        this.tick();
        setInterval(function() {
            self.tick();
        }, 1000);
        if ('Notification' in window) {
            Notification.requestPermission((permission: string) => {
                if (permission !== 'denied') {
                    this.$gBus.$on('nearSoonToCompleteGet', (nearSoonToCompleteData: Sightseeing[]) => {
                        let data: Sightseeing[] = nearSoonToCompleteData.map((d: Sightseeing) => {
                            d.area = this.$i18n.t(d.area) + '';
                            return d;
                        });
                        let option = {
                            lang: this.$i18n.locale,
                            body: '',
                        };
                        if (data.length > 3) {
                            data.forEach((d: Sightseeing) => {
                                option.body += d.id + ' ' + d.area + this.$i18n.t('info.dot');
                            });
                            option.body = option.body.replace(RegExp(this.$i18n.t('info.dot') + '$'), '');
                            let notification = new Notification(
                                this.$i18n.tc('info.notificationTitle', 2, {
                                    n: data.length,
                                }),
                                option,
                            );
                            setTimeout(_ => notification.close(), 30000);
                        } else {
                            data.forEach((d: Sightseeing) => {
                                let o = Object(option);
                                o.body =
                                    d.id +
                                    ' ' +
                                    d.area +
                                    this.$i18n.tc('info.lessThan', d.nextAvaliableTimeLeft, {
                                        m: d.nextAvaliableTimeLeft,
                                    });
                                let notification = new Notification(this.$i18n.tc('info.notificationTitle', 1), o);
                                setTimeout(_ => notification.close(), 30000);
                            });
                        }
                    });
                }
            });
        }
    }
    tick() {
        let nowet = new EorzeaClock(undefined);

        let weatherChangeKey = (nowet.getHours() / 8) >>> 0;
        if (this._lastWeatherChangeKey != weatherChangeKey) {
            this.$gBus.$emit('weatherChange', weatherChangeKey);
            this._lastWeatherChangeKey = weatherChangeKey;
        }
        let thisHour = nowet.getHours();
        if (this._lastHour != thisHour) {
            this.$gBus.$emit('hourChange', thisHour);
            this._lastHour = thisHour;
        }

        this.eorzeaclock = nowet.toHourMinuteString();
    }
    chlang(v: string) {
        this.$i18n.locale = v;
        localStorage.setItem('lang', v);
    }
}
</script>