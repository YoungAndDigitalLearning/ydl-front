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
            <ydl-article v-for="article in articleEntries" v-bind:article_entry='article' v-bind:key="article.id"></ydl-article>
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

import axios from "axios"

export default {
  name: "MainPage",
  data () {
    return {
      showModal: false,
      articleEntries: [
        {
          id: 123456,
          headline: "Gemeinssam mehr als Sprachen lernen!",
          author: "me",
          text: "<p>Sed lobortis mi. Suspendisse vel placerat ligula. <span style=\"text-decoration: underline;\">Vivamus</span> ac sem lac. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p><p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac lacus. <strong>Ut vehicula rhoncus</strong> elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit <em>pulvinar dict</em> vel in justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p><h2>Aliquam In Arcu </h2><p>Suspendisse vel placerat ligula. Vivamus ac sem lac. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p><p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. Suspendisse vel placerat ligula. Vivamus ac sem lac. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>",
          image: "https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png"
        },
        {
          id: 123456,
          headline: "Noch ein Article!",
          author: "you",
          text: "Moin",
          image: "https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png"
        }
      ]
    }
  },
  created () {
    axios.get("http://localhost/article.json")
      .then(function (response) {
        console.log(response.data)
        this.articleEntries = response.data
      })
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
