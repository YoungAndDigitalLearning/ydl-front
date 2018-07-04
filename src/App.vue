<template>
  <div id="app">
    <notifications position="bottom right" classes="vue-notification notify" />
    <ydl-navbar/>
    <section class="ydl-content">
      <router-view/>
    </section>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Navbar from "@/components/Navigation/Navbar.vue"
import Footer from "@/components/LandingPage/Footer.vue"

import jwtDecode from "jwt-decode"
import axios from "axios"
import axiosInstance from "@/store/api"
import { mapState } from "vuex"

export default {
  name: "App",
  computed: mapState({
    user: state => state.users.user
  }),
  created () {
    /* load token */
    var token = this.$localStorage.get("token", false)

    /* check if token has expired */
    if (token) {
      axios
        .post("https://api.ydlearning.com/token/verify/", {
          token: token.replace("JWT ", "")
        })
        .catch(error => {
          if (error.response.status === 400) {
            /* notify user that the token has been expired */
            this.$notify({
              title: "Authentication",
              text: "token has expired",
              type: "error"
            })

            this.$store.dispatch("logout")
            this.$router.push("/")

            /* remove the token from the storage */
            console.log("remove token")
            this.$localStorage.remove("token")
            console.log(this.$localStorage.get("token", false))
          }
        })
    }

    /* load token */
    token = this.$localStorage.get("token", false)
    console.log("token from storage")
    console.log(token)

    if (token) {
      console.log("mounted")
      /* TODO: improve the logic verify token still valid */
      console.log(token)

      console.log("found token in local storage")
      const decodedToken = jwtDecode(token)
      /* get the user from the user id */
      this.$store
        .dispatch("getUser", { params: { id: decodedToken.user_id } })
        .then(() => {
          console.log("success getUser")
        })
        .catch(error => {
          console.log(error)
        })

      axiosInstance.defaults.headers.common["Authorization"] = token
      console.log("token was added to axios instance")
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

.deutsch {
  background-color: goldenrod;
}

.japanisch {
  background-color: yellowgreen;
}

.klausur {
  background-color: pink;
}

.notify {
  // margin-top: 70px !important;
  // pointer-events:none;
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
  font-family: "Source Code Pro", monospace !important;
}
</style>
