import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"
import jwtDecode from "jwt-decode"

import Vapi from "vuex-rest-api"

Vue.use(Vuex)

export const axiosInstance = axios.create({
  baseURL: "https://api.ydlearning.com/"
})

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
  .get({
    action: "getUser",
    property: "user",
    path: ({ id }) => `users/${id}`
  })
  .get({
    action: "getCourses",
    property: "courses",
    path: "courses/",
    onSuccess: (state, payload, axios) => {
      console.log("payload")
      console.log(payload)
      console.log(state)
      // seperate own and joined courses
      var ownCourses = []
      var joinedCourses = []
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
    action: "getCourse",
    property: "course",
    path: ({ id }) => `courses/${id}`
  })
  .post({
    action: "createCourse",
    property: "course",
    path: "courses/"
  })
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
    axiosInstance.defaults.headers.common["Authorization"] = token
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
