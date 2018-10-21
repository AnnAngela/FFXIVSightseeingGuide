<template>
    <div class="container">
        <nav class="navbar navbar-dark bg-dark fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="#">ET {{eorzeaclock}}</a>
                </div>

                <div class="collapse navbar-collapse flex-row" id="navbar-collapse-1">
                    <ul class="navbar-nav flex-row">
                        <li class="nav-item" :class="{active: $route.path == '/'}"><router-link class="nav-link" to="/">{{$t("info.home")}}</router-link></li>
                        <li class="nav-item" :class="{active: $route.path == '/weatheroverview'}"><router-link class="nav-link" to="/weatheroverview">{{$t("info.weatheroverview")}}</router-link></li>
                        <li class="nav-item ml-auto dropdown">
                            <a href="javascript:;" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{$t("lang." + currentLang)}} <span class="caret"></span></a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="javascript:;" @click="chlang('zh-CN')">{{$t("lang.zh-CN")}}</a>
                                <a class="dropdown-item" href="javascript:;" @click="chlang('en-US')">{{$t("lang.en-US")}}</a>
                                <a class="dropdown-item" href="javascript:;" @click="chlang('ja-JP')">{{$t("lang.ja-JP")}}</a>
                            </div>
                        </li>
                        <li class="dropdown" :class="currentLang === 'ja-JP' ? 'hidden' : ''">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{$t(currentHourSystem + 'hoursystem')}} <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:;" @click="chhoursystem('12')">{{$t("12hoursystem")}}</a></li>
                                <li><a href="javascript:;" @click="chhoursystem('24')">{{$t("24hoursystem")}}</a></li>
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
html {
  min-height: 100%;
}
body {
  padding: 70px 0 42px;
}
.nav-item {
  margin-right: 2em;
}
footer {
  position: fixed;
  bottom: 0;
  width: 100% !important;
  max-width: 100% !important;
  height: 60px;
  line-height: 21px;
  padding-top: 18px;
  background-image: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.7) 20%,
    rgba(255, 255, 255, 0.8) 30%,
    rgb(255, 255, 255)
  );
  background-color: transparent;
  text-align: center;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EorzeaClock from "./EorzeaTime";
import { Sightseeing } from "./Sightseeing";
import { NotificationService } from "./NotificationService";

@Component
export default class App extends Vue {
  eorzeaclock: string = "00:00";
  _lastWeatherChangeKey: number = 0;
  _lastHour: number = 0;
  currentHourSystem: string = "24";
  get currentLang() {
    return this.$i18n.locale;
  }
  created() {
    this.currentHourSystem =
      localStorage.getItem("hourSystem") === "24" ? "24" : "12";
    this.$i18n.locale = localStorage.getItem("lang") || "zh-CN";
    this.tick();
    setInterval(this.tick.bind(this), 1000);
    if (NotificationService.Main.isSupported) {
      let optionTemplate = new NotificationService.Option({
        lang: this.$i18n.locale,
        icon: "./image/logo.png"
      });
      let notificationService = new NotificationService.Main({
        welcomeOption: optionTemplate.extend({
          title: this.$t("notification.welcome.title") + "",
          body: this.$t("notification.welcome.body") + ""
        }),
        defaultOption: optionTemplate.clone()
      });
      this.$gBus.$on(
        "nearSoonToCompleteGet",
        (nearSoonToCompleteData: Sightseeing[]) => {
          if (nearSoonToCompleteData.length > 3) {
            let now_option = optionTemplate.clone();
            let soon_option = optionTemplate.clone();
            nearSoonToCompleteData.forEach((d: Sightseeing) => {
              let option: NotificationService.Option = d.isStillWaiting
                ? soon_option
                : now_option;
              option.add(d.id + " " + this.$t(d.area));
            });
            notificationService.sendNotification([
              now_option.extendTitle(
                this.$tc("notification.availableNowTitle", 2, {
                  n: now_option.length
                })
              ),
              soon_option.extendTitle(
                this.$tc("notification.availableSoonTitle", 2, {
                  n: soon_option.length
                })
              )
            ]);
          } else {
            notificationService.sendNotification(
              nearSoonToCompleteData.map((d: Sightseeing) => {
                let option = optionTemplate.clone();
                let body = d.id + " " + this.$t(d.area);
                if (d.isStillWaiting) body += this.$t("info.isStillWaiting");
                body += this.$tc("info.lessThan", d.nextAvaliableTimeLeft, {
                  m: d.nextAvaliableTimeLeft
                });
                return option.extend({
                  title: this.$tc(
                    d.isStillWaiting
                      ? "notification.availableSoonTitle"
                      : "notification.availableNowTitle",
                    1
                  ),
                  body
                });
              })
            );
          }
        }
      );
    }
  }
  tick() {
    let nowet = new EorzeaClock(undefined);

    let weatherChangeKey = (nowet.getHours() / 8) >>> 0;
    if (this._lastWeatherChangeKey != weatherChangeKey) {
      this.$gBus.$emit("weatherChange", weatherChangeKey);
      this._lastWeatherChangeKey = weatherChangeKey;
    }
    let thisHour = nowet.getHours();
    if (this._lastHour != thisHour) {
      this.$gBus.$emit("hourChange", thisHour);
      this._lastHour = thisHour;
    }

    this.eorzeaclock = nowet.toHourMinuteString();
  }
  chlang(v: string) {
    this.$i18n.locale = v;
    localStorage.setItem("lang", v);
  }
  chhoursystem(v: string) {
    v = v === "24" ? "24" : "12";
    localStorage.setItem("hourSystem", v);
    this.currentHourSystem = v;
    location.reload(false);
  }
}
</script>
