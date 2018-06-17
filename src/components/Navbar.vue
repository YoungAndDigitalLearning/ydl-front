<template>
  <b-navbar toggleable="md" type="dark" variant="primary" fixed="top">
    <b-navbar-brand href="/#/">Y&D Learning</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"><fa-icon icon="bars"/></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/#/">Home</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="sucLogin" class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            {{ getUserName }}
          </template>
          <b-dropdown-item href="#/profile"><fa-icon icon="user-astronaut"/> Profile</b-dropdown-item>
          <b-dropdown-item href="#"><fa-icon icon="cog" /> Settings</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout"><fa-icon icon="ambulance" /> Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item href="#/signup"><fa-icon icon="edit" /> Sign up</b-nav-item>
        <b-nav-item href="#/login"><fa-icon icon="unlock" /> Login</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "navbar",
  props: {
    sucLogin: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    getUserName () {
      console.log("called get user name")
      return this.$localStorage.get("user")
    }
  },
  methods: {
    logout () {
      /* destroy the local storage and remove the token from the header */
      this.$localStorage.remove("jwt")
      this.$localStorage.remove("user")
      this.$localStorage.remove("user_id")
      /* remove the key from the header */
      delete this.$http.defaults.headers.common["Authorization"]
      this.$emit("successful-logout")
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.navbar .navbar-nav > li > a {
  color:#ffffff !important;

  &:hover {
    color: #dddddd!important;
  }
}
</style>
