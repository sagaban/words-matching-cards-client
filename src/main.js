import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import router from "./router";
import "./quasar";
import VueCookies from "vue-cookies";
import VueJWT from "vuejs-jwt";
import { JET_KEY_NAME } from "./utils/constants";

Vue.use(VueJWT, {
  storage: "cookie",
  keyName: JET_KEY_NAME,
  ignoreExpiration: true
});

Vue.use(VueCookies);
Vue.$cookies.config("14d");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
