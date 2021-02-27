import Vue from "vue";
import { PluginObject } from "vue";

declare module "vue/types/vue" {
    // tslint:disable-next-line:interface-name
    // eslint-disable-next-line no-shadow
    interface Vue {
        $gBus: Vue;
    }
}

class GlobalBus implements PluginObject<never> {
    install(vue: typeof Vue): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        vue.prototype.$gBus = new Vue();
    }
}
export default new GlobalBus();