<template>
  <b-navbar toggleable="md" type="dark" variant="secondary" fixed="top">
    <b-navbar-brand href="/#/">Y&D Learning</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"><fa-icon icon="bars"/></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/#/">Home</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="isLoggedIn" class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            {{ user.username }}
          </template>
          <b-dropdown-item href=/#/profile/><fa-icon icon="user-astronaut"/> Profile</b-dropdown-item>
          <b-dropdown-item href="#/profile/settings"><fa-icon icon="cog" /> Settings</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#" @click="logout" ><fa-icon icon="ambulance" /> Signout</b-dropdown-item>
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
import { mapState } from "vuex"

export default {
  name: "navbar",
  computed: {
    ...mapState(["isLoggedIn", "user"])
  },
  methods: {
    logout () {
      this.$store.dispatch("logout")
        .then(() => {
          this.$router.push("/")
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";
@import "compass/css3";

.navbar {
  @include box-shadow(0 0 15px 1px rgba(0,0,0,.23));
}

.navbar .navbar-nav > li > a {
  color:#ffffff !important;

  &:hover {
    color: #dddddd!important;
  }
}
</style>
