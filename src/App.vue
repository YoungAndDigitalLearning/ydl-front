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
import axios from "axios"
import { axiosInstance } from "./store/actions.js"

export default {
  name: "App",
  created () {
    /* load token */
    var token = this.$localStorage.get("token", false)

    /* check if token has expired */
    if (token) {
      axios.post("https://api.ydlearning.com/token/verify/", {"token": token.replace("JWT ", "")})
        .then((response) => {
          console.log("response")
          console.log(response)
        })
        .catch((error) => {
          if (error.response.status === 400) {
            /* notify user that the token has been expired */
            this.$notify({
              title: "Authentication",
              text: "token has expired",
              type: "error"
            })

            this.$store.dispatch("logout")

            /* remove the token from the storage */
            // this.$localStorage.remove("token")
          }
        })
    }

    /* load token */
    token = this.$localStorage.get("token", false)

    if (token) {
      console.log("mounted")
      /* TODO: improve the logic verify token still valid */
      console.log(token)

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
  padding-left: 15px;
  padding-right: 15px;

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
