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
    notificationPermission: boolean = false;
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
            let option = {
                lang: this.$i18n.locale,
                body: '',
            };
            Notification.requestPermission((permission: string) => {
                if (permission !== 'denied') {
                    this.notificationPermission = true;
                    if (sessionStorage.getItem('isAlreadyAlerted') === 'true') return;
                    sessionStorage.setItem('isAlreadyAlerted', 'true');
                    option.body = this.$i18n.t('notification.alert.body') + '';
                    this.sendNotification(this.$i18n.t('notification.alert.title') + '', option);
                }
            });
            this.$gBus.$on('nearSoonToCompleteGet', (nearSoonToCompleteData: Sightseeing[]) => {
                if (nearSoonToCompleteData.length > 3) {
                    let soon_option = Object(option);
                    soon_option.body = '';
                    let now_option = Object(option);
                    now_option.body = '';
                    nearSoonToCompleteData.forEach((d: Sightseeing) => {
                        (d.isStillWaiting ? soon_option : now_option).body += d.id + ' ' + this.$i18n.t(d.area) + this.$i18n.t('notification.dot');
                    });
                    soon_option.body = option.body.replace(RegExp(this.$i18n.t('notification.dot') + '$'), '');
                    now_option.body = option.body.replace(RegExp(this.$i18n.t('notification.dot') + '$'), '');
                    if (soon_option.body !== '') {
                        this.sendNotification(
                            this.$i18n.tc('notification.availableSoonTitle', 2, {
                                n: soon_option.body.match(this.$i18n.t('notification.dot')).length,
                            }),
                            soon_option,
                        );
                    }
                    if (now_option.body !== '') {
                        this.sendNotification(
                            this.$i18n.tc('notification.availableNowTitle', 2, {
                                n: now_option.body.match(this.$i18n.t('notification.dot')).length,
                            }),
                            now_option,
                        );
                    }
                } else {
                    nearSoonToCompleteData.forEach((d: Sightseeing) => {
                        option.body = d.id + ' ' + this.$i18n.t(d.area);
                        option.body += this.$i18n.tc('info.lessThan', d.nextAvaliableTimeLeft, {
                            m: d.nextAvaliableTimeLeft,
                        });
                        this.sendNotification(this.$i18n.tc(d.isStillWaiting ? 'notification.availableSoonTitle' : 'notification.availableNowTitle', 1), option);
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
    sendNotification(title: string, option: {}) {
        if (this.notificationPermission) {
            let notification: Notification = new Notification(title, option);
            setTimeout(notification.close.bind(notification), 15000);
        }
    }
    chlang(v: string) {
        this.$i18n.locale = v;
        localStorage.setItem('lang', v);
    }
}
</script>