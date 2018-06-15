import Vue from "vue"
import Router from "vue-router"
import BootstrapVue from "bootstrap-vue"
import VueSession from "vue-session"
import VeeValidate from "vee-validate"
import VueLocalstorage from "vue-localstorage"

import LandingPage from "@/components/LandingPage"
import ProfilePage from "@/components/ProfilePage"
import CoursePage from "@/components/CoursePage"
import Course from "@/components/Course"
import Sandbox from "@/components/Sandbox"
import LoginPage from "@/components/LoginPage"
import SignupPage from "@/components/SignupPage"
import NotFound from "@/components/NotFound"
import Settings from "@/components/Settings"
import AllCourses from "@/components/AllCourses"

import fontawesome from "@fortawesome/fontawesome"
import freeSolid from "@fortawesome/fontawesome-free-solid/"
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"

fontawesome.library.add(freeSolid)

Vue.use(VeeValidate)
Vue.use(VueSession)
Vue.use(Router)
Vue.use(BootstrapVue)
Vue.component("fa-icon", FontAwesomeIcon)
Vue.use(VueLocalstorage)

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
      component: ProfilePage,
      children: [
        {
          path: "course/all",
          name: "allcourses",
          component: AllCourses
        },
        {
          path: "/signup",
          name: "skbsignup",
          component: SignupPage
        },
        {
          path: "course/:id",
          name: "skbcourse",
          component: CoursePage
        },
        {
          path: "home",
          name: "skbcoursedetail",
          component: Course
        },
        {
          path: "404",
          name: "notfound",
          component: NotFound
        },
        {
          path: "settings",
          name: "settings",
          component: Settings
        }
      ]
    },
    {
      path: "/sandbox",
      name: "sandbox",
      component: Sandbox
    },
    {
      path: "/login",
      name: "skblogin",
      component: LoginPage
    }
  ]
})
