import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import Notifications from "vue-notification";
import Vuelidate from "vuelidate";
import router from "@/router";
import VModal from "vue-js-modal";
Vue.use(Notifications);
Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VModal, { dialog: true });

Vue.use(VModal);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
