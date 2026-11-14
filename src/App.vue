<template>
  <div id="app">
    <notifications position="bottom right" classes="vue-notification notify" />
    <ydl-navbar />
    <demo-toolbar v-if="isDemo" />
    <section class="ydl-content">
      <router-view />
    </section>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import Navbar from "@/components/Navigation/Navbar.vue"
import DemoToolbar from "@/components/Demo/DemoToolbar.vue"
import jwtDecode from "jwt-decode"
import axiosInstance from "@/store/api"
import { isDemo, getDemoUserId } from "@/demo/session"

export default {
  name: "App",
  data () {
    return { isDemo: isDemo }
  },
  components: {
    "ydl-navbar": Navbar,
    "demo-toolbar": DemoToolbar
  },
  async created () {
    if (isDemo) {
      const demoId = getDemoUserId()
      if (demoId) {
        try {
          await this.$store.dispatch("getUser", { params: { id: demoId } })
          await this.$store.dispatch("getCourses")
        } catch (error) {
          // The toolbar allows the visitor to start a new session.
          console.warn("Could not restore demo session", error)
        }
      }
      return
    }

    const token = this.$localStorage.get("token", false)
    if (!token) {
      delete axiosInstance.defaults.headers.common["Authorization"]
      return
    }

    try {
      const rawToken = token.replace(/^JWT\s+/, "")
      await axiosInstance.post("token/verify/", { token: rawToken })
      const userId = jwtDecode(rawToken).user_id
      axiosInstance.defaults.headers.common["Authorization"] = token
      await this.$store.dispatch("getUser", { params: { id: userId } })
    } catch (error) {
      delete axiosInstance.defaults.headers.common["Authorization"]
      this.$localStorage.remove("token")
      await this.$store.dispatch("logout")
      if (this.$route.matched.some((record) => record.meta.requiresAuth)) {
        this.$router.replace("/login")
      }
    }
  }
}
</script>

<style lang="scss">
@import "styles/global";

.deutsch {
  background-color: goldenrod;
}

.japanisch {
  background-color: yellowgreen;
}

.klausur {
  background-color: pink;
}

.notify {
  // margin-top: 70px !important;
  // pointer-events:none;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.ydl-header {
  // background-color: $primary;
  height: $ydl-header-height;
}

.ydl-content {
  overflow-y: auto;
  // height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #0689b3;

  @include media-breakpoint-down(md) {
    // disable the overflow to move the scroll component to the top
    overflow-y: visible;
  }
}

body {
  padding-top: $ydl-header-height;
}

html {
  height: 100%;
  background-color: $skb-dark-blue;
  font-family: "Source Code Pro", monospace !important;
}
</style>
