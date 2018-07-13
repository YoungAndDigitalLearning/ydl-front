import Vue from "vue"
import Router from "vue-router"
import BootstrapVue from "bootstrap-vue"
import VeeValidate from "vee-validate"

import LandingPage from "@/components/LandingPage/LandingPage"
import ProfilePage from "@/components/Profile/ProfilePage"
import CoursePage from "@/components/Course/CoursePage"
import Course from "@/components/Course/Course"
import Sandbox from "@/components/Util/Sandbox"
import LoginPage from "@/components/Authorization/LoginPage"
import SignupPage from "@/components/Authorization/SignupPage"
import NotFound from "@/components/Util/NotFound"
import Settings from "@/components/Profile/Settings"
import AllCourses from "@/components/Course/AllCourses"
import TimeTable from "@/components/Calendar/TimeTable"
import CreateCourse from "@/components/Course/CreateCourse"
import Forum from "@/components/Forum/Forum"
import PostWrapper from "@/components/Forum/PostWrapper"
import EditCoursePage from "@/components/Course/EditCoursePage"
import Chat from "@/components/Chat/Chat"
import TeacherCalendar from "@/components/TeacherCalendar"
import MyCourses from "@/components/Course/MyCourses"
import Resources from "@/components/Resources/Resources"
import CreateResource from "@/components/Resources/CreateResource"
import Quiz from "@/components/Quiz/Quiz"
import EditQuiz from "@/components/Quiz/EditQuiz"

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
          name: "mycourses",
          component: MyCourses
        },
        {
          path: "courses/forum",
          name: "skbforum",
          meta: { requiresAuth: false },
          component: Forum
        },
        {
          path: "courses/forum/post/:pid",
          name: "skbpost",
          meta: { requiresAuth: false },
          component: PostWrapper
        },
        {
          path: "courses/:cid/edit",
          name: "skbcourse-edit",
          component: EditCoursePage
        },
        {
          path: "courses/:cid/quiz/edit",
          name: "skbquiz-edit",
          component: EditQuiz
        },
        {
          path: "courses/:cid/quiz",
          name: "skbquiz",
          component: Quiz
        },
        {
          path: "courses/:cid",
          name: "skbcourse",
          component: CoursePage
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
        },
        {
          path: "calendar",
          name: "teacherCalendar",
          component: TeacherCalendar
        },
        {
          path: "allcourses",
          name: "allcourses",
          component: AllCourses
        },
        {
          path: "resources",
          name: "resource",
          component: Resources
        },
        {
          path: "createresource",
          name: "createresource",
          component: CreateResource
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
      path: "/post",
      name: "skbpost",
      component: PostWrapper
    },
    {
      path: "/chat",
      name: "skbchat",
      component: Chat
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
