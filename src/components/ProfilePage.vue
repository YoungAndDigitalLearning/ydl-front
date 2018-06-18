<template>
<div v-if="loading === false">
  <div class="header">
    <h2 class="greeting"> Hallo {{getUsername}} <small>({{getTeacherStatus}})</small></h2>
  </div>
  <div class="profile-container">
    <div class="profile-navigation">
        <ydl-sidebar v-bind:isTeacher="user.is_teacher" v-bind:courseId="user.courses"
          v-on:load-details="showCourseDetail"
          v-on:load-overview="showOverView"
          v-on:load-timetable="showTimeTable"
          v-on:load-all-courses="showAllCourses"
          v-on:load-course-create="showCreateCourse">
        </ydl-sidebar>
    </div>
    <div class="profile-content">
      <router-view/>
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
</template>

<script ref="ydl-course ydl-course-detail">
import Course from "@/components/Course"
import Calendar from "@/components/Calendar"
import CoursePage from "@/components/CoursePage"
import SideBar from "@/components/SideBar"
import TimeTable from "@/components/TimeTable"
import AllCourses from "@/components/AllCourses"
import Settings from "@/components/Settings"
import CreateCourse from "@/components/CreateCourse"

import jwtDecode from "jwt-decode"

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
    "ydl-settings": Settings,
    "ydl-create-course": CreateCourse
  },
  computed: {
    getUsername () {
      if (this.user.first_name === "" && this.user.last_name === "") {
        return this.user.username
      } else {
        return this.user.first_name + " " + this.user.last_name
      }
    },
    getTeacherStatus () {
      if (this.user.is_teacher) {
        return "teacher"
      } else {
        return "student"
      }
    }
  },
  mounted () {
    var token = this.$localStorage.get("jwt")
    console.log(jwtDecode(token))
    this.$http.get("users/" + jwtDecode(token).user_id)
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
    },
    showCreateCourse () {
      this.content = "createcourse"
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
