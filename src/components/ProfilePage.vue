<template>
  <div v-if="loading === false" class="container-fluid profile">
    <div class="row title">
      <div class="col-6">
        <h2 class="greeting"> Hallo {{getUsername}}</h2>
      </div>
      <div class="col-6 controls">
        <a class="btn btn-light control-btn embed" href="">Einstellungen</a>
        <a class="btn btn-light control-btn embed" href="#" @click="logout">Log Out</a>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr class="seperator">
      </div>
    </div>
    <div class="row">
      <div class="col-2 navigation">
        <ydl-sidebar v-bind:courseId="user.courses"
          v-on:load-details="showCourseDetail"
          v-on:load-overview="showOverView"
          v-on:load-timetable="showTimeTable"
          v-on:load-all-courses="showAllCourses">
        </ydl-sidebar>
      </div>
      <div class="col-8 content bdr">
        <ydl-course  v-if="content === 'overview'" v-on:load-details="showCourseDetail" v-bind:courseId="user.courses"></ydl-course>
        <ydl-course-detail v-if="content === 'detail'" v-model="detailCourseId"></ydl-course-detail>
        <ydl-timetable v-if="content === 'timetable'"></ydl-timetable>
        <ydl-all-courses v-if="content === 'allcourses'" v-on:load-details="showCourseDetail"></ydl-all-courses>
      </div>
      <div class="col-2 cal">
        <h5>Aktuelle Termine</h5>
        <!-- <ydl-calendar v-bind:tasks="user.tasks"></ydl-calendar> -->
        <a href="/calendar"> Alle Termine </a>
      </div>
    </div>
  </div>
</template>

<script ref="ydl-course ydl-course-detail">
import Course from "@/components/Course"
import Calendar from "@/components/Calendar"
import CoursePage from "@/components/CoursePage"
import SideBar from "@/components/SideBar"
import TimeTable from "@/components/TimeTable"
import AllCourses from "@/components/AllCourses"

import axios from "axios"

export default {
  name: "ProfilePage",
  data () {
    return {
      user: {},
      loading: true,
      content: "overview",
      detailCourseId: 0
    }
  },
  components: {
    "ydl-course": Course,
    "ydl-calendar": Calendar,
    "ydl-course-detail": CoursePage,
    "ydl-sidebar": SideBar,
    "ydl-timetable": TimeTable,
    "ydl-all-courses": AllCourses
  },
  computed: {
    getUsername () {
      if (this.user.first_name === "" && this.user.last_name === "") {
        return this.user.username
      } else {
        return this.user.first_name + " " + this.user.last_name
      }
    }
  },
  mounted () {
    // readd authoritation again if needed (TODO: improve)
    if (!("Authorization" in this.$http.defaults.headers.common)) {
      var token = this.$session.get("jwt")
      this.$http.defaults.headers.common["Authorization"] = "JWT " + token
    }
    console.log(this.$http.defaults.headers)
    this.$http.get("users/")
      .then(response => {
        console.log(response.data[0].username)
        this.user = response.data[0]
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
      this.content = "detail"
      this.detailCourseId = id
      console.log("Id of course to show: " + id)
    },
    showOverView () {
      this.content = "overview"
    },
    showTimeTable () {
      this.content = "timetable"
    },
    showAllCourses () {
      this.content = "allcourses"
    },
    logout () {
      console.log("make request")
      console.log(this.$http.defaults.baseURL)
      axios.get("http://35.185.239.7:2222/api/users")
      this.$http.get("users/")
      // this.$session.destroy()
      // this.$router.push("/")
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
  padding-left: 7%;
  padding-right: 7%;
}

.greeting {
  text-align: left;
}

.bdr {
  border-left: 1px solid #0689b3;
  border-right: 1px solid #0689b3;
}
</style>
