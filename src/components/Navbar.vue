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
            <fa-icon icon="portrait" /> Peter Schlüter
          </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Settings</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" @click="logout" >Logout</a>
        </div>
      </li>
      </ul>
      <ul v-else class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/#/signup"><fa-icon icon="edit" /> Sign In</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#/login" ><fa-icon icon="unlock" /> Login</a>
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
      "isLoggedIn": this.$session.has("jwt")
    }
  },
  props: {
    sucLogin: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.navbar {
  height: $ydl-header-height;

  a {
    color: #ffffff;
  }

  @include media-breakpoint-down(md) {
    height: auto;
  }
}
</style>
