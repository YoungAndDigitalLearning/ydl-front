<template>
  <nav class="navbar navbar-expand-lg bg-primary fixed-top">
    <a class="navbar-brand" href="#">Y&D Learning</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <fa-icon icon="bars"/>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <ul v-if="sucLogin" class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <fa-icon icon="portrait" /> {{ getUserName }}
          </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Settings</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" @click="logout">Logout</a>
        </div>
      </li>
      </ul>
      <ul v-else class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/#/signup" @click="hideNavbar"><fa-icon icon="edit" /> Sign In</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#/login" @click="hideNavbar"><fa-icon icon="unlock" /> Login</a>
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
      "isLoggedIn": this.$localStorage.get("jwt", false)
    }
  },
  props: {
    sucLogin: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    getUserName () {
      return this.$localStorage.get("user")
    }
  },
  methods: {
    logout () {
      /* destroy the session and remove the token from the header */
      this.$localStorage.remove("jwt")
      this.$localStorage.remove("user")
      this.$session.destroy()
      delete this.$http.defaults.headers.common["Authorization"]
      this.$emit("successful-logout")
      this.$router.push("/")
    },
    hideNavbar () {
      var elements = document.querySelector(".navbar-collapse")
      elements.collapse("hide")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.dropdown-menu {
  a {
    color: #333 !important;
  }
}

.navbar-collapse {

  @include media-breakpoint-down(sm)
  {
    height: 100vh;
    font-size: 120%;
  }
  transition: all 300ms;
}

.navbar {
  min-height: $ydl-header-height;

  a {
    color: #ffffff;
  }
}
</style>
