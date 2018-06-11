<template>
  <div v-if="loading === false" class="container-fluid profile">
    <div class="row title">
      <div class="col-6">
        <h2 class="greeting"> Hallo {{user.firstName}} {{user.lastName}}</h2>
      </div>
      <div class="col-6 controls">
        <a class="btn btn-light action-button control-btn embed" href="">Einstellungen</a>
        <a class="btn btn-light action-button control-btn embed" href="" @click="logout">Log Out</a>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr class="seperator">
      </div>
    </div>
    <div class="row">
      <div class="col-2 navigation">
        <ydl-sidebar v-bind:courseId="user.courses" v-on:load-details="showCourseDetail" v-on:load-overview="showOverView"></ydl-sidebar>
      </div>
      <div class="col-8 content bdr">
        <ydl-course  v-if="overview" v-on:load-details="showCourseDetail" v-bind:courseId="user.courses"></ydl-course>
        <ydl-course-detail v-if="!overview" v-model="detailCourseId"></ydl-course-detail>
      </div>
      <div class="col-2 cal">
        <h5>Aktuelle Termine</h5>
        <!-- <ydl-calendar v-bind:tasks="user.tasks"></ydl-calendar> -->
      </div>
    </div>
  </div>
</template>

<script ref="ydl-course ydl-course-detail">
import Course from "@/components/Course"
import Calendar from "@/components/Calendar"
import CoursePage from "@/components/CoursePage"
import SideBar from "@/components/SideBar"

import axios from "axios"

export default {
  name: "ProfilePage",
  data () {
    return {
      user: {},
      loading: true,
      overview: true,
      detailCourseId: 0
    }
  },
  components: {
    "ydl-course": Course,
    "ydl-calendar": Calendar,
    "ydl-course-detail": CoursePage,
    "ydl-sidebar": SideBar
  },
  mounted () {
    axios.get("http://jsontest/user/user.json")
      .then(response => {
        this.user = response.data
        this.loading = false
      })
    console.log("user: " + this.user)
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      // this.$router.push("/#")
    }
  },
  methods: {
    showCourseDetail (id) {
      console.log("Triggered")
      this.overview = false
      this.detailCourseId = id
      console.log("Id of course to show: " + id)
    },
    showOverView () {
      this.overview = true
    },
    logout () {
      this.$session.destroy()
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}

hr {
  border: 2px solid #0689b3;
}

.controls {
  text-align: right;
}

.control-btn {
  background-color: #0689b3;
  color: white;
  border-radius: 30px;
}

.profile {
  background-color: white;
  color: black;
  padding: 15px;
}

.greeting {
  text-align: left;
}

.bdr {
  border-left: 1px solid #0689b3;
  border-right: 1px solid #0689b3;
}
</style>
