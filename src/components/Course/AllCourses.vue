<template>
  <div>
    <ydl-titleheader color="darkgreen">All Courses</ydl-titleheader>
    <ul class="list-group" v-for="course in courses" v-bind:key="course.id">
      <a class="list-group-item list-group-item-action">
        <h4> {{course.name}} </h4>
      </a>
      <a v-if="!isRegistered(course.id)" @click="registerToCourse(course.id)">
        register
      </a>
      <a v-else @click="unregisterFromCourse(course.id)">
        unregister
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
