import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/components/layouts/Mainlayout"),
      children: [
        {
          path: "",
          redirect: "/login"
        },
        {
          path: "todo",
          name: "todo",
          component: () => import("@/components/views/Todo"),
          beforeEnter(to, from, next) {
            if (!store.state.auth.token) next({ name: "login" });
            else {
              next();
            }
          }
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/components/views/Profile"),
          beforeEnter(to, from, next) {
            if (!store.state.auth.token) next({ name: "login" });
            else {
              next();
            }
          }
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/components/views/Login"),
          beforeEnter(to, from, next) {
            if (store.state.auth.token) next({ name: "todo" });
            else {
              next();
            }
          }
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/components/views/Register"),
          beforeEnter(to, from, next) {
            if (store.state.auth.token) next({ name: "todo" });
            else {
              next();
            }
          }
        }
      ]
    }
  ]
});
