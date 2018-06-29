// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import { router } from "./router"
import { store } from "./store/store"
import Notifications from "vue-notification"
import VueLocalStorage from "vue-localstorage"

// TODO: use jwt decode
// var jwtDecode = require("jwt-decode")

Vue.use(VueLocalStorage)
Vue.use(Notifications)

Vue.config.productionTip = false

console.log("site refreshed")
console.log(Vue.prototype)

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
})
