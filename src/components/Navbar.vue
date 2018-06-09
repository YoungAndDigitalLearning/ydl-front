<template>
  <nav class="navbar navbar-expand-lg navbar-primary bg-secondary fixed-top">
    <a class="navbar-brand" href="#">Y&D Learning</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <ul v-if="loggedIn" class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <fa-icon icon="portrait" /> Peter Schlüter
          </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Settings</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Logout</a>
        </div>
      </li>
      </ul>
      <ul v-else class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/#/signup"><fa-icon icon="edit" /> Sign In</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#/login" v-on:toggleLoggedIn="toggleLogin"><fa-icon icon="unlock" /> Login</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
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
      console.log("emitted")
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

<style lang="scss" scoped>
@import "styles/global";

.navbar {
  height: $ydl-header-height;
}
</style>
