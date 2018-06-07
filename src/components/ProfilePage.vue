<template>
  <div v-if="loading === false" class="container profile">
    <div class="row title">
      <div class="col-md-6">
        <h2 class="greeting"> Hallo {{user.firstName}} {{user.lastName}}</h2>
      </div>
      <div class="col-md-6 controls">
        <a class="btn btn-light action-button control-btn embed" href="">Einstellungen</a>
        <a class="btn btn-light action-button control-btn embed" href="">Log Out</a>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <hr class="seperator">
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-lg-2">
        <ydl-sidebar v-bind:courseId="user.courses"></ydl-sidebar>
      </div>
      <div class="col-md-4 col-lg-8 bdr">
        <ydl-course  ref="overview" v-if="true" v-bind:courseId="user.courses"></ydl-course>
        <ydl-course-detail ref="details" v-if="user.detailview" v-bind:course="{}"></ydl-course-detail>
        <button @click="showCourseDetail()"> Test detail </button>
        <button @click="showOverView()"> Test overview </button>
      </div>
      <div class="col-md-4 col-lg-2">
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
      loading: true
    }
  },
  components: {
    "ydl-course": Course,
    "ydl-calendar": Calendar,
    "ydl-course-detail": CoursePage,
    "ydl-sidebar": SideBar
  },
  methods: {
    showCourseDetail (course, event) {
      this.user.overview = false
      this.user.detailview = true
      // this.$emit('course', event.target.course)
      this.$refs.overview.open = false
      this.$refs.details.open = true
      console.log(course)
      console.log(event.target)
    },
    showOverView () {
      this.$refs.details.open = false
      this.$refs.overview.open = true
    }
  },
  mounted () {
    axios.get("http://jsontest/user/user.json")
      .then(response => {
        this.user = response.data
        this.loading = false
      })
    console.log("user: " + this.user)
  }
}
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}

hr {
  border: 2px solid black;
}

.controls {
  text-align: right;
}

.control-btn {
  background-color: black;
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
  border-left: 1px solid black;
  border-right: 1px solid black;
}
</style>
