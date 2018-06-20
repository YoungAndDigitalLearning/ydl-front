import api from "./utils/api"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://api.ydlearning.com/"
})

export const actions = {
  async fetchUser ({ commit }) {
    commit("FETCH_USER", await axiosInstance.get("users/"))
  },
  async getAnnouncements ({ commit }) {
    const response = await axiosInstance.get("announcements/")
    commit("GET_ANNOUNCEMENTS", response.data)// await api.get("announcements/"))
  },
  async login ({ commit }, creds) {
    commit("LOGIN")
    setTimeout(() => {
      console.log("get token from website")
      // this.$localStorage.set("token", "JWT")
      commit("LOGIN_SUCCESS")
    }, 1000)
    api.post("token/auth", creds)
      .then(() => {
        console.log("success")
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
