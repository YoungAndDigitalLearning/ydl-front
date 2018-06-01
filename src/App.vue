<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="header-dark">
      <nav class="navbar navbar-dark navbar-expand-md navigation-clean-search">
        <div class="container">
          <a class="navbar-brand" href="#">Y&D Learning</a>
          <button class="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="nav navbar-nav">
              <li class="nav-item" role="presentation">
                <a class="nav-link" href="/#/">Home</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" href="/#/profile">Profile (tmp)</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" href="/#/courseview">Course View (tmp)</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="btn btn-light action-button" @click="showCreateCourse = true">Create Course (tmp)</a>
              </li>
            </ul>
            <form class="form-inline mr-auto" target="_self">
              <div class="form-group">
                <label for="search-field">
                  <i class="fa fa-search"></i>
                </label><input class="form-control search-field" type="search" name="search" id="search-field"></div>
            </form>
            <span class="navbar-text">
              <a href="#" class="login" @click="showLogin = true" data-toggle="modal" data-target="#login_modal">Log In</a>
            </span>
            <a class="btn btn-light action-button" @click="showSignup = true" role="button" href="#">Sign Up</a>
          </div>
        </div>
      </nav>
    </div>
    <div class="ydl-content">
      <router-view/>
    </div>
    <div id="login_screen">
      <ydl-login v-if="showLogin" @close="showLogin = false"></ydl-login>
    </div>
    <ydl-signup v-if="showSignup" @close="showSignup = false"></ydl-signup>
    <ydl-createcourse v-if="showCreateCourse" @close="showCreateCourse = false"></ydl-createcourse>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Login from "@/components/Login"
import Signup from "@/components/Signup"
import CreateCourse from "@/components/CreateCourse"

export default {
  name: "App",
  data () {
    return {
      showLogin: false,
      showSignup: false,
      showCreateCourse: false
    }
  },
  components: {
    "ydl-login": Login,
    "ydl-signup": Signup,
    "ydl-createcourse": CreateCourse
  }
}
</script>

<style lang="scss">
@import "./assets/css/Article-Clean.css";
@import "./assets/css/Header-Dark.css";
@import "./assets/css/Login-Form-Dark.css";
@import "./assets/css/styles.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e6e6e6;
  height: 100%;
}

.header-dark {
  position: fixed;
  width: 100%;
  padding: 0px;
  z-index: 1;
  background-color: #000000;
}

.ydl-content {
  padding-top: 90px;
  padding-bottom: 90px;
  z-index: 0;
  overflow:auto;
}

html {
    height: 100%;
    background:url(./assets/img/mountain_bg.jpg);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
}
</style>
