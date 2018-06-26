import axios from "axios"
// import Vue from "vue"

export const axiosInstance = axios.create({
  baseURL: "https://api.ydlearning.com/"
})

/* if a jwt token is within the local storage load it */
// if (Vue.prototype.$localStorage.get("jwt", false)) {
//   axiosInstance.defaults.headers.common["Authorization"] = "JWT " + Vue.prototype.$localStorage.get("jwt")
// }

export default {
  get (url) {
    return axiosInstance.get(url)
  },
  post (url, request) {
    return axiosInstance.post(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  patch (url, request) {
    return axiosInstance.patch(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  delete (url, request) {
    return axiosInstance.delete(url, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}
