import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import GlobalBus from './globalBus'

import App from './App.vue'
import HomePage from './components/home.vue'
import WeatherOverviewPage from './components/weatheroverview.vue'

import en_US from './locales/en-US'
import zh_CN from './locales/zh-CN'
import ja_JP from './locales/ja-JP'

import 'jquery'
import 'bootstrap'

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(GlobalBus);

const routerOption = {
    "routes": [
        { path: '/', component: HomePage },
        { path: '/weatheroverview', component: WeatherOverviewPage }
    ]
}

const router = new VueRouter(routerOption);

const messages = {
    'en-US': en_US,
    'zh-CN': zh_CN,
    'ja-JP': ja_JP
}

const dateTimeFormats = {
    'en-US': {
        short: {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        },
        long: {
            year: 'numeric', month: 'short', day: 'numeric', weekday: 'short',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }
    },
    'ja-JP': {
        short: {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        },
        long: {
            year: 'numeric', month: 'short', day: 'numeric', weekday: 'short',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        }
    },
    'zh-CN': {
        short: {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        },
        long: {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }
    }
}

const i18n = new VueI18n({
    locale: 'zh-CN',
    messages,
    dateTimeFormats
})

const app = new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')