import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"
import jwtDecode from "jwt-decode"

import Vapi from "vuex-rest-api"

Vue.use(Vuex)

export const axiosInstance = axios.create({
  baseURL: "https://api.ydlearning.com/"
})

const announcements = new Vapi({
  axios: axiosInstance,
  state: {
    announcements: []
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

const courses = new Vapi({
  axios: axiosInstance,
  state: {
    ownCourses: [],
    joinedCourses: [],
    courses: []
  }
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
        if (course.teacher === state.users.user.id) {
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

const authentication = new Vapi({
  axios: axiosInstance
}).post({
  action: "login",
  property: "token",
  path: "token/auth/"
})

const users = new Vapi({
  axios: axiosInstance
}).get({
  action: "getUser",
  property: "user",
  path: ({ id }) => `users/${id}`
})

var storeAuthentication = authentication.getStore()

storeAuthentication.actions.login = async (context, object) => {
  console.log("begin login")
  context.commit("LOGIN")
  console.log("further login")
  console.log(object)
  await axiosInstance.post("token/auth/", { ...object.data})
    .then(async response => {
      const token = response.data.token
      Vue.localStorage.set("token", "JWT " + token)
      const decodedToken = jwtDecode(token)
      await store.dispatch("getUser", { params: { id: decodedToken.user_id } })

      context.commit("LOGIN_SUCCEEDED")
      Promise.resolve(response.body.data)
    })
    .catch(error => {
      context.commit("LOGIN_FAILED")
      Promise.reject(error)
    })
}

storeAuthentication.mutations.LOGOUT = state => {
  console.log(state)
  state.users.user = null
}

storeAuthentication.actions.logout = async (context) => {
  Vue.localStorage.remove("token")
  context.commit("LOGOUT")
}

export const store = new Vuex.Store({
  modules: {
    announcements: announcements.getStore(),
    courses: courses.getStore(),
    authentication: storeAuthentication,
    users: users.getStore()
  }
})
