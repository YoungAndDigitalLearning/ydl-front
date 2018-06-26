import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"

import Vapi from "vuex-rest-api"

Vue.use(Vuex)

const axiosInstance = axios.create({
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
    courses: []
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

export const store = new Vuex.Store({
  modules: {
    announcements: announcements.getStore(),
    courses: courses.getStore()
  }
})
