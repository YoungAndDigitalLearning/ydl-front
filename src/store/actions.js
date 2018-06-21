// import api from "./utils/api"
import axios from "axios"
import Vue from "vue"
import jwtDecode from "jwt-decode"

const axiosInstance = axios.create({
  baseURL: "https://api.ydlearning.com/"
})

export const actions = {
  async getUser ({ commit }, id) {
    const response = await axiosInstance.get("users/" + id)
    commit("GET_USER", response.data)
  },
  async getAnnouncements ({ commit }) {
    const response = await axiosInstance.get("announcements/")
    commit("GET_ANNOUNCEMENTS", response.data)// await api.get("announcements/"))
  },
  async signup ({ dispatch, commit }, creds) {
    commit("SIGNUP_BEGIN")
    await axiosInstance.post("users/", creds)
      .then(async (response) => {
        console.log(response)
        const token = response.data.token
        Vue.localStorage.set("token", "JWT " + token)
        const decodedToken = jwtDecode(token)
        await dispatch("getUser", decodedToken.user_id)
        console.log("Loooool")
        commit("LOGIN_SUCCESS")
      })
      .catch((error) => {
        console.log(error)
      })
    commit("SIGNUP_END")
  },
  async login ({ dispatch, commit }, creds) {
    commit("LOGIN_BEGIN")
    await axiosInstance.post("token/auth/", creds)
      .then(async (response) => {
        const token = response.data.token
        Vue.localStorage.set("token", "JWT " + token)
        /* decode the token and retrieve the user id */
        const decodedToken = jwtDecode(token)
        await dispatch("getUser", decodedToken.user_id)
        commit("LOGIN_SUCCESS")
      }).catch((error) => {
        console.log(error)
      })
    commit("LOGIN_END")
  },
  async logout ({ commit }) {
    /* destroy the local storage and remove the token from the header */
    Vue.localStorage.remove("token")
    /* remove the key from the header */
    // delete this.$http.defaults.headers.common["Authorization"]
    commit("LOGOUT")
  }
}
