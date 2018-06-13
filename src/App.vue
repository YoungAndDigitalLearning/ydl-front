<template>
  <div id="app">
    <ydl-navbar :sucLogin="haslogin" v-on:successful-logout="onSuccessfulLogout"/>
    <section class="ydl-content">
      <router-view v-on:successful-login="onSuccessfulLogin" />
    </section>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Navbar from "@/components/Navbar.vue"

export default {
  name: "App",
  data () {
    return {
      haslogin: this.$session.has("jwt")
    }
  },
  components: {"ydl-navbar": Navbar},
  methods: {
    onSuccessfulLogin () {
      console.log("success login!")
      /* retrtieve the token from the session */
      var token = this.$session.get("jwt")
      /* now the header can be set to the obtained token */
      this.$http.defaults.headers.common["Authorization"] = "JWT " + token
      /* tell via variable the user has login */
      this.haslogin = true
    },
    onSuccessfulLogout () {
      console.log("success logout!")
      /* tell via variable the user has logout */
      this.haslogin = false
    }
  }
}
</script>

<style lang="scss">
@import "styles/global";

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
}
</style>
