import Vue from "vue";
import { PluginObject } from "vue";

declare module "vue/types/vue" {
    // tslint:disable-next-line:interface-name
    interface Vue {
        $gBus: Vue;
    }
}

class GlobalBus implements PluginObject<never> {
    install(vue: typeof Vue): void {
        vue.prototype.$gBus = new Vue();
    }
}
export default new GlobalBus();