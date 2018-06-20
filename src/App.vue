<template>
  <div id="app">
    <notifications classes="vue-notification notify" />
    <ydl-navbar :sucLogin="haslogin" v-on:successful-logout="onSuccessfulLogout"/>
    <section class="ydl-content">
      <router-view v-on:successful-login="onSuccessfulLogin" />
      <!-- <ydl-footer></ydl-footer> -->
    </section>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "App",
  data () {
    return {
      haslogin: this.$localStorage.get("jwt", false) !== false
    }
  },
  components: {
    "ydl-navbar": Navbar,
    "ydl-footer": Footer
  },
  methods: {
    onSuccessfulLogin () {
      console.log("success login!")
      /* retrtieve the token from the session */
      var token = this.$localStorage.get("jwt")
      /* now the header can be set to the obtained token */
      this.$http.defaults.headers.common["Authorization"] = "JWT " + token
      /* tell via variable the user has login */
      this.haslogin = true
    },
    onSuccessfulLogout () {
      console.log("success logout!")
      console.log(this.$localStorage.get("jwt", false) !== false)
      /* tell via variable the user has logout */
      this.haslogin = false
    }
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
}
</style>
