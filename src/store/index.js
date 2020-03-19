/** VUEX store definition **/

import Vue from "vue";
import Vuex from "vuex";
import api from "@/api";
import VuexPersist from "vuex-persist";
import todo from "./modules/todo";
import auth from "./modules/auth";

Vue.use(Vuex);
const vuexPersist = new VuexPersist({
  key: "todo",
  storage: window.localStorage,
  modules: ["auth"]
});
const store = new Vuex.Store({
  modules: {
    todo,
    auth
  },
  plugins: [vuexPersist.plugin]
});
// Connect API with Store
api.interceptors.request.use(config => {
  const token = store.state.auth.token;
  if (token) config.headers["Authorization"] = `${token}`;
  return config;
});
export default store;
