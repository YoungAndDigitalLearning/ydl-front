import Vuex from "vuex"
import Vue from "vue"
import axiosInstance from "@/store/api"
import jwtDecode from "jwt-decode"

import Vapi from "vuex-rest-api"

Vue.use(Vuex)

/* TODO: wrapper for this api calls inside new store object */

const api = new Vapi({
  axios: axiosInstance,
  state: {
    /* announcements */
    announcements: [],
    /* courses */
    ownCourses: [],
    joinedCourses: [],
    courses: [],
    /* viewing course */
    viewingCourse: null
  }
})
// Resources
  .get({
    action: "getResources",
    property: "resources",
    path: "resources/"
  })
  .post({
    action: "createResource",
    property: "resource",
    path: "resources/"
  })
// Announcements
  .get({
    action: "getAnnouncement",
    property: "announcement",
    path: ({ id }) => `announcements/${id}`
  })
  .get({
    action: "getAnnouncements",
    property: "announcements",
    path: "announcements/",
    onError: (state, error, axios) => {
      console.log(error.response)

      // if you set the onError function you have to set the state manually
      state.announcements = null
    }
  })
  .post({
    action: "createAnnouncement",
    property: "announcement",
    path: "announcements/"
  })
// User
  .get({
    action: "getUser",
    property: "user",
    path: ({ id }) => `users/${id}`
  })
// Signup
  .post({
    action: "signup",
    property: "user",
    path: "users/"
  })
// Course
  .get({
    action: "getCourses",
    property: "courses",
    path: "courses/",
    onSuccess: (state, payload, axios) => {
      // seperate own and joined courses
      var ownCourses = []
      var joinedCourses = []
      console.log(payload.data)
      payload.data.forEach(course => {
        if (course.teacher === state.user.id) {
          ownCourses.push(course)
        } else {
          joinedCourses.push(course)
        }
      })
      state.ownCourses = ownCourses
      state.joinedCourses = joinedCourses
      // state.course = payload.data[0]
    }
  })
  .get({
    action: "getFreeCourses",
    property: "freeCourses",
    path: "courses/?type=free"
  })
  .get({
    action: "getCourse",
    property: "course",
    path: ({ id }) => `courses/${id}`
  })
  .post({
    action: "createCourse",
    property: "course",
    path: "courses/"
  })
  .put({
    action: "editCourse",
    property: "course",
    path: ({ id }) => `courses/${id}`
  })
// Login
  .post({
    action: "login",
    property: "token",
    path: "token/auth/"
  })

var storeApi = api.getStore()

storeApi.actions.login = async (context, object) => {
  context.commit("LOGIN")

  try {
    let response = await axiosInstance.post("token/auth/", object.data)
    const token = response.data.token
    Vue.localStorage.set("token", "JWT " + token)
    const decodedToken = jwtDecode(token)
    console.log("request user")
    /* after successfully login get the user */
    await store.dispatch("getUser", {
      params: { id: decodedToken.user_id }
    })
    console.log("get user finished!")
    console.log("adding the new token to the axios header")
    axiosInstance.defaults.headers.common["Authorization"] = "JWT " + token
    context.commit("LOGIN_SUCCEEDED", token)
  } catch (error) {
    console.log(error)
    context.commit("LOGIN_FAILED", error)
  }
  console.log("success auth")
}

storeApi.mutations.VIEW_COURSE = (state, id) => {
  state.viewingCourse = id
}

storeApi.actions.viewCourse = async (context, id) => {
  context.commit("VIEW_COURSE", id)
}

storeApi.mutations.LOGOUT = state => {
  console.log(state)
  state.user = null
}

storeApi.actions.logout = async context => {
  Vue.localStorage.remove("token")
  context.commit("LOGOUT")
}

export const store = new Vuex.Store({
  modules: {
    api: storeApi
  }
})
