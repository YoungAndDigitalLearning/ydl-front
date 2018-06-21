<template>
  <div id="app">
    <notifications classes="vue-notification notify" />
    <ydl-navbar/>
    <section class="ydl-content">
      <router-view/>
    </section>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

import jwtDecode from "jwt-decode"
import { axiosInstance } from "./store/actions.js"

export default {
  name: "App",
  created () {
    console.log("mounted")
    /* load token and and get user id */
    const token = this.$localStorage.get("token", false)
    if (token) {
      console.log("found token in local storage")
      const decodedToken = jwtDecode(token)
      /* get the user from the user id */
      this.$store.dispatch("getUser", decodedToken.user_id)
        .then(() => {
          console.log("success getUser")
        })
        .catch((error) => {
          console.log(error)
        })

      axiosInstance.defaults.headers.common["Authorization"] = token
      console.log(axiosInstance)
    } else {
      console.log("removed token from header")
      delete axiosInstance.defaults.headers.common["Authorization"]
    }
  },
  components: {
    "ydl-navbar": Navbar,
    "ydl-footer": Footer
  }
}
</script>

<style lang="scss">
@import "styles/global";

.notify {
  margin-top: 70px !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.ydl-header {
  // background-color: $primary;
  height: $ydl-header-height;
}

.ydl-content {
  overflow-y: auto;
  height: 100%;

  @include media-breakpoint-down(md) {
    // disable the overflow to move the scroll component to the top
    overflow-y: visible;
  }
}

body {
  padding-top: $ydl-header-height;
}

html {
    height: 100%;
    background-color: $skb-dark-blue;
}
</style>
