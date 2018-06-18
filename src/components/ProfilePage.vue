<template>
<div v-if="loading === false">
  <div class="header">
    <h2 class="greeting"> Hallo {{getUsername}}</h2>
  </div>
  <div class="profile-container">
    <div class="profile-navigation">
        <ydl-sidebar v-bind:courseId="user.courses"
          v-on:load-details="showCourseDetail"
          v-on:load-overview="showOverView"
          v-on:load-timetable="showTimeTable"
          v-on:load-all-courses="showAllCourses">
        </ydl-sidebar>
    </div>
    <div class="profile-content">
        <ydl-course  v-if="content === 'overview'" v-on:load-details="showCourseDetail" v-bind:courseId="user.courses"></ydl-course>
        <ydl-course-detail v-if="content === 'detail'" v-model="detailCourseId"></ydl-course-detail>
        <ydl-timetable v-if="content === 'timetable'"></ydl-timetable>
        <ydl-all-courses v-if="content === 'allcourses'" v-on:load-details="showCourseDetail"></ydl-all-courses>
        <ydl-settings v-if="content === 'settings'" v-bind:user="user"></ydl-settings>
    </div>
    <div class="profile-calendar">
        <h5>Aktuelle Termine</h5>
        <a href="/calendar"> Alle Termine </a>
    </div>
  </div>
</div>
<div v-else class="loading-screen">
  <fa-icon icon="spinner" spin/>
</div>
  <!--<div v-if="loading === false" class="container-fluid profile">
    <div class="row title">
      <div class="col-6">
        <h2 class="greeting"> Hallo {{getUsername}}</h2>
      </div>
      <div class="col-6 controls">
        <a class="btn btn-light action-button control-btn embed" @click="content='settings'" href="/#/profile">Settings</a>
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
        <ydl-settings v-if="content === 'settings'" v-bind:user="user"></ydl-settings>
      </div>
      <div class="col-2 cal">
        <h5>Aktuelle Termine</h5>
        <a href="/calendar"> Alle Termine </a>
      </div>
    </div>
  </div> -->
</template>

<script ref="ydl-course ydl-course-detail">
import Course from "@/components/Course"
import Calendar from "@/components/Calendar"
import CoursePage from "@/components/CoursePage"
import SideBar from "@/components/SideBar"
import TimeTable from "@/components/TimeTable"
import AllCourses from "@/components/AllCourses"
import Settings from "@/components/Settings"

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
    "ydl-all-courses": AllCourses,
    "ydl-settings": Settings
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
    this.$http.get("users/" + this.$localStorage.get("user_id"))
      .then(response => {
        console.log(this.user)
        this.user = response.data
        this.loading = false
      })
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.loading-screen {
  height: 100%;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  text-align: left;
  padding-left: 10px;
  padding-top: 30px;
  padding-bottom: 15px;
  border-bottom: 5px $ydl-primary solid;

  @include media-breakpoint-down(sm) {
    padding-left: 0px;
    text-align:center;
  }
}

.profile-container {
  display: flex;

  @include media-breakpoint-down(sm) {
    flex-direction: column;
  }
}

.profile-navigation {
  padding: 10px;
  border-right: 2px solid $ydl-primary;

  @include media-breakpoint-down(sm) {
    border-right: none;
    border-bottom: 2px solid $ydl-primary;
  }
}

.profile-content {
  flex: 1;
  padding: 10px;
}

.profile-calendar {
  padding: 10px;
  border-left: 2px solid $ydl-primary;

  @include media-breakpoint-down(sm) {
    border-left: none;
    border-top: 2px solid $ydl-primary;
  }
}

// Altes Zeugs

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
</style>
