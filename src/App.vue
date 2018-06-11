<template>
  <div id="app">
    <ydl-navbar :sucLogin="haslogin"/>
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
      console.log("suc login!")
      this.haslogin = true
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
  color: #e6e6e6;
  height: 100%;
}

.ydl-header {
  background-color: $primary;
  height: $ydl-header-height;
}

.ydl-content {
  overflow-y: auto;
  height: 100%;
}

body {
  padding-top: $ydl-header-height;
}

html {
    height: 100%;
}
</style>
