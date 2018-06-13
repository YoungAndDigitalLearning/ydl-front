// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import axios from "axios"

Vue.config.productionTip = false

/* create default axios instance to use it from all components with same settings */
const api = axios.create({
  baseURL: "http://35.185.239.7:2222/api/"
})

Vue.prototype.$http = api

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
})
