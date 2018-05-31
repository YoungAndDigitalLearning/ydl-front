import Vue from "vue"
import Router from "vue-router"
import BootstrapVue from "bootstrap-vue"

import LandingPage from "@/components/LandingPage"
import ProfilePage from "@/components/ProfilePage"

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "SKB.CMS",
      component: LandingPage
    },
    {
      path: "/profile",
      name: "skbprofile",
      component: ProfilePage
    }
  ]
})
