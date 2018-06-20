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

export default {
  name: "App",
  mounted () {
    const token = this.$localStorage.get("token", false)
    if (token) {
      const decodedToken = jwtDecode(token)
      this.$store.dispatch("getUser", decodedToken.user_id)
        .then(() => {
          console.log("success")
        })
        .catch((error) => {
          console.log(error)
        })
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
