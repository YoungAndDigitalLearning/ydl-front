// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import { store } from "./store/store"
import Notifications from "vue-notification"

// TODO: use jwt decode
// var jwtDecode = require("jwt-decode")

Vue.use(Notifications)

Vue.config.productionTip = false

console.log("site refreshed")
/* create default axios instance to use it from all components with same settings */

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
})
