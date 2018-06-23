import Vue from "vue"
import Vuex from "vuex"
import VueLocalstorage from "vue-localstorage"

import { actions } from "./actions"
import { mutations } from "./mutations"

Vue.use(Vuex)
Vue.use(VueLocalstorage)

console.log("refreshed store")

export const store = new Vuex.Store({
  state: {
    courses: [],
    user: {},
    currentViewingCourse: 0,
    loginPending: false,
    signupPending: false,
    isLoggedIn: !!Vue.prototype.$localStorage.get("token"),
    announcements: []
  },
  mutations,
  actions
})
