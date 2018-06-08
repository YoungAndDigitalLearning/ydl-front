<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fir=yes">
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
            </ul>
            <form class="form-inline mr-auto" target="_self">
              <div class="form-group">
                <label for="search-field">
                  <i class="fa fa-search"></i>
                </label><input class="form-control search-field" type="search" name="search" id="search-field"></div>
            </form>
            <div v-if="!loggedIn">
              <span class="navbar-text">
                <a href="/#/login" class="login" @toggleLoggedIn="toggleLogin">Log In</a>
              </span>
              <a class="btn btn-light action-button" role="button" href="/#/signup">Sign Up</a>
            </div>
            <div v-else>
              <a class="btn btn-light action-button" role="button" @click="logout">Log Out</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="ydl-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

export default {
  name: "App",
  data () {
    return {
      loggedIn: false
    }
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push("/")
    },
    toggleLogin () {
      this.loggedIn = this.$session.exists()
    }
  },
  watch: {
    login () {
      this.loggedIn = this.$session.exists()
      console.log(this.loggedIn)
    }
  }
}
</script>

<style lang="scss">
@import "./assets/css/Header-Dark.css";
@import "./assets/css/styles.css";

// import all bootstrap sass files
@import "node_modules/bootstrap/scss/bootstrap";

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
  z-index: 999;
  background-color: rgba(6, 137, 179, 1);
}

.ydl-content {
  padding-top: 90px;
  padding-bottom: 90px;
  z-index: 0;
  overflow:auto;
  height: 100%;

  @include media-breakpoint-down(sm)
  {
    // deactivate the padding
    padding: 0px;
  }
}

html {
    height: 100%;
    // background:url(./assets/img/mountain_bg.jpg);
    background-color: white;
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
}
</style>
