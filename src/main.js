// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import axios from "axios"
import Notifications from "vue-notification"

// TODO: use jwt decode
// var jwtDecode = require("jwt-decode")

Vue.use(Notifications)

Vue.config.productionTip = false

console.log("site refreshed")
/* create default axios instance to use it from all components with same settings */
const api = axios.create({
  baseURL: "https://api.ydlearning.com/"
})
/* if a jwt token is within the local storage load it */
if (Vue.prototype.$localStorage.get("jwt", false)) {
  api.defaults.headers.common["Authorization"] = "JWT " + Vue.prototype.$localStorage.get("jwt")
}
Vue.prototype.$http = api

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
})
