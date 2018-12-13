import Vue from "vue";
import Router from "vue-router";
import Cdp from "./views/Cdp.vue";
import Overview from "./views/Overview.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: '/overview'
    },
    {
      path: "/overview",
      name: "overview",
      component: Overview
    },
    {
      path: "/cdp/:cdp",
      name: "cdp",
      component: Cdp
    }
  ]
});
