<template>
  <div>
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
                <a class="nav-link" href="#">Home</a>
              </li>
              <li class="dropdown">
                <a class="dropdown-toggle nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="#">Erkunden </a>
                <div class="dropdown-menu" role="menu">
                  <a class="dropdown-item" role="presentation" href="#">First Item</a>
                  <a class="dropdown-item" role="presentation" href="#">Second Item</a>
                  <a class="dropdown-item" role="presentation" href="#">Third Item</a>
                </div>
              </li>
            </ul>
            <form class="form-inline mr-auto" target="_self">
              <div class="form-group">
                <label for="search-field">
                  <i class="fa fa-search"></i>
                </label><input class="form-control search-field" type="search" name="search" id="search-field"></div>
            </form>
            <span class="navbar-text">
              <a href="#" class="login" @click="showModal = true" data-toggle="modal" data-target="#login_modal">Log In</a>
            </span>
            <a class="btn btn-light action-button" role="button" href="#">Sign Up</a>
          </div>
        </div>
      </nav>
      <div class="container hero">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <h1 class="text-center">Young&Digital Learning</h1>
            <ydl-article v-for="article in article_entry" v-bind:article_entry='article' v-bind:key="article.id"></ydl-article>
          </div>
        </div>
      </div>
    </div>
    <div id="login_screen">
      <ydl-login v-if="showModal" @close="showModal = false"></ydl-login>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Login from "@/components/Login"
import Article from "@/components/Article"
// require("./../assets/css/Article-Clean.css")

export default {
  name: "MainPage",
  data () {
    return {
      showModal: false
    }
  },
  components: {
    "ydl-login": Login,
    "ydl-article": Article
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/Article-Clean.css";
@import "./../assets/css/Header-Dark.css";
@import "./../assets/css/Login-Form-Dark.css";
@import "./../assets/css/styles.css";
</style>
