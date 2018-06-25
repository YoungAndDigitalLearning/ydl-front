import Vue from "vue"
import Router from "vue-router"
import BootstrapVue from "bootstrap-vue"
import VeeValidate from "vee-validate"

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
import TimeTable from "@/components/TimeTable"
import CreateCourse from "@/components/CreateCourse"
import Forum from "@/components/Forum"
import PostWrapper from "@/components/PostWrapper"
import EditCoursePage from "@/components/EditCoursePage"
import Chat from "@/components/Chat"

import fontawesome from "@fortawesome/fontawesome"
import freeSolid from "@fortawesome/fontawesome-free-solid/"
import FontAwesomeIcon from "@fortawesome/vue-fontawesome"

fontawesome.library.add(freeSolid)

Vue.use(VeeValidate)
Vue.use(Router)
Vue.use(BootstrapVue)
Vue.component("fa-icon", FontAwesomeIcon)

export const router = new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "Y&D Learning",
      component: LandingPage
    },
    {
      path: "/profile/:id",
      name: "skbprofile",
      component: ProfilePage,
      meta: { requiresAuth: true },
      children: [
        {
          path: "courses",
          name: "allcourses",
          component: AllCourses
        },
        {
          path: "courses/:cid",
          name: "skbcourse",
          component: CoursePage
        },
        {
          path: "courses/:cid/edit",
          name: "skbcourse-edit",
          component: EditCoursePage
        },
        {
          path: "home",
          name: "overview",
          component: Course
        },
        {
          path: "settings",
          name: "settings",
          component: Settings
        },
        {
          path: "schedule",
          name: "timetable",
          component: TimeTable
        },
        {
          path: "createcourse",
          name: "createcourse",
          component: CreateCourse
        },
        {
          path: "post",
          name: "skbpost",
          component: PostWrapper
        },
        {
          path: "chat",
          name: "skbchat",
          component: Chat
        }
      ]
    },
    {
      path: "/courseview",
      name: "skbcourse",
      meta: { requiresAuth: true },
      component: CoursePage
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
    },
    {
      path: "/signup",
      name: "skbsignup",
      component: SignupPage
    },
    {
      path: "/forum",
      name: "skbforum",
      meta: { requiresAuth: true },
      component: Forum
    },
    {
      path: "*",
      name: "404notfound",
      component: NotFound
    }
  ]
})

/* guard every site which requires login  */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(to)
    console.log("teeeest")
    if (!Vue.localStorage.get("token", false)) {
      console.log("redirect")
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
