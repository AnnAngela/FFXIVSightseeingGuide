import Vue from 'vue'
import { PluginObject } from 'Vue'

declare module 'vue/types/vue' {
    interface Vue {
        $gBus: Vue
    }
}

class GlobalBus implements PluginObject<never>{
    install(vue: typeof Vue) {
        vue.prototype.$gBus = new Vue();
    }
}
export default new GlobalBus();