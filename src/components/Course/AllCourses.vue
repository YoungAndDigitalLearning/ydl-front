<template>
  <div>
    <ydl-titleheader color="darkgreen">All Courses</ydl-titleheader>
    <ul class="list-group" v-for="course in courses" v-bind:key="course.id">
      <a class="list-group-item list-group-item-action horizontal-align">
        <div class="centered-text-ydl"><h4> {{course.name}} </h4></div>
        <div v-if="!isRegistered(course.id)" class="btn btn-danger" @click="registerToCourse(course.id)"><fa-icon icon="sign-in-alt"/></div>
        <div v-else-if="isRegistered(course.id) && user.id !== course.teacher" class="btn btn-success" @click="unregisterFromCourse(course.id)"><fa-icon icon="sign-out-alt"/></div>
        <div v-else class="btn"><fa-icon icon="user"/></div>
      </a>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex"
import axiosInstance from "@/store/api"
import TitleHeader from "@/components/Util/TitleHeader"

export default {
  name: "AllCourses",
  computed: mapState({
    courses: state => state.api.freeCourses,
    user: state => state.api.user
  }),
  mounted () {
    this.$store.dispatch("getFreeCourses")
  },
  components: {
    "ydl-titleheader": TitleHeader
  },
  methods: {
    registerToCourse (id) {
      let courses = this.user.courses
      courses.push(id)

      axiosInstance.put("students/" + this.user.id, {
        courses: courses
      })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.$notify({
              title: "Student Update",
              text: "successfully registered for the course",
              type: "success"
            })
          }
        })
    },
    unregisterFromCourse (id) {
      let courses = this.user.courses
      let index = courses.indexOf(id)
      if (index > -1) {
        courses.splice(index, 1)
      }

      axiosInstance.put("students/" + this.user.id, {
        courses: courses
      })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.$notify({
              title: "Student Update",
              text: "successfully unregistered for the course",
              type: "success"
            })
          }
        })
    },
    isRegistered (id) {
      console.log(this.user.courses)
      console.log(id)
      return this.user.courses.includes(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal-align {
  display: flex;
}

.fill-out {
  flex: 1;
}

h4 {
  margin: 0px;
}

.centered-text-ydl {
    height: 100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
}

.list-group-item {
  border-radius: 0;
}

</style>
