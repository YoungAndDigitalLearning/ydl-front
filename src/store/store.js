import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"

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
    joinedCourses: []
  },
  onSuccess: (state, payload, axios) => {
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
    state.own_courses = ownCourses
    state.joined_courses = joinedCourses
    state.course = payload.data[0]
  }
})
  .get({
    action: "getCourses",
    property: "courses",
    path: "courses/"
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
  action: "_login",
  property: "token",
  path: "token/auth/",
  onSuccess: (state, payload, axios) => {
    console.log("saved token")
    Vue.localStorage.set("token", "JWT " + payload.data[0])
  }
})

const users = new Vapi({
  axios: axiosInstance
}).get({
  action: "getUser",
  property: "user",
  path: ({ id }) => `users/${id}`
})

const users_stored = users.getStore()
users_stored.actions.login = ({context, cred}) => {
  await Vue.store.dispatch("_login")
    .then( async response => {
      
    })

}

export const store = new Vuex.Store({
  modules: {
    announcements: announcements.getStore(),
    courses: courses.getStore(),
    authentication: authentication.getStore(),
    users: users.getStore()
  }
})
