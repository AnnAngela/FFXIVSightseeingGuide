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

class Option {
    lang: string = 'zh-CN';
    body: string = '';
    length: number = 0;
    constructor(option?: any) {
        if (option) {
            if (option.lang) this.lang = option.lang;
            if (option.body) this.body = option.body;
            if (option.length) this.length = option.length;
        }
    }
    clone() {
        return new Option(this);
    }
    extend(option?: any) {
        var new_option = this.clone();
        if (option) {
            if (option.lang) new_option.lang = option.lang;
            if (option.body) new_option.body = option.body;
            if (option.length) new_option.length = option.length;
        }
        return new_option;
    }
}
declare const Notification: any;

class NotificationService {
    permission: boolean | symbol = false;
    static readonly UNSUPPORTED: symbol = Symbol('NotificationService.UNSUPPORTED');
    defaultOption: Option;
    constructor(welcomeTitle: string, welcomeOption: Option, defaultOption: Option) {
        if (!('Notification' in window)) {
            this.permission = NotificationService.UNSUPPORTED;
            return;
        }
        this.defaultOption = defaultOption;
        if (Notification.permission !== 'granted')
            Notification.requestPermission((permission: NotificationPermission) => {
                if (permission === 'granted') {
                    this.permission = true;
                    this.sendNotification(welcomeTitle, welcomeOption);
                }
            });
        else {
            this.permission = true;
            this.sendNotification(welcomeTitle, welcomeOption);
        }
    }
    sendNotification(title: string, option?: any) {
        if (this.permission === true) {
            let o = this.defaultOption.extend(option);
            let notification: Notification = new Notification(title, o);
            setTimeout(notification.close.bind(notification), 15000);
        }
    }
}

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
        let optionTemplate: Option = new Option({ lang: this.$i18n.locale });
        let notificationService: NotificationService = new NotificationService(
            this.$i18n.t('notification.alert.title') + '',
            optionTemplate.extend({
                body: this.$i18n.t('notification.alert.body') + '',
            }),
            optionTemplate.clone(),
        );
        try {
            if (notificationService.permission !== NotificationService.UNSUPPORTED) {
                this.$gBus.$on('nearSoonToCompleteGet', (nearSoonToCompleteData: Sightseeing[]) => {
                    if (nearSoonToCompleteData.length > 3) {
                        let soon_option = optionTemplate.clone();
                        let now_option = optionTemplate.clone();
                        nearSoonToCompleteData.forEach((d: Sightseeing) => {
                            let option: Option = d.isStillWaiting ? soon_option : now_option;
                            if (option.length++ !== 0) option.body += this.$i18n.t('notification.dot');
                            option.body += d.id + ' ' + this.$i18n.t(d.area);
                        });
                        if (soon_option.length > 0) {
                            notificationService.sendNotification(
                                this.$i18n.tc('notification.availableSoonTitle', 2, {
                                    n: soon_option.length,
                                }),
                                soon_option,
                            );
                        }
                        if (now_option.length > 0) {
                            notificationService.sendNotification(
                                this.$i18n.tc('notification.availableNowTitle', 2, {
                                    n: now_option.length,
                                }),
                                now_option,
                            );
                        }
                    } else {
                        nearSoonToCompleteData.forEach((d: Sightseeing) => {
                            let option = optionTemplate.clone();
                            option.body = d.id + ' ' + this.$i18n.t(d.area);
                            option.body += this.$i18n.tc('info.lessThan', d.nextAvaliableTimeLeft, {
                                m: d.nextAvaliableTimeLeft,
                            });
                            notificationService.sendNotification(this.$i18n.tc(d.isStillWaiting ? 'notification.availableSoonTitle' : 'notification.availableNowTitle', 1), option);
                        });
                    }
                });
            }
        } catch (e) {
            console.debug(e);
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