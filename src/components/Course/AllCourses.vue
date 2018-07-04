<template>
  <div>
    <ydl-profileheadertext color="darkgreen">All Courses</ydl-profileheadertext>
    <ul class="list-group" v-for="course in courses" v-bind:key="course.id">
      <a class="list-group-item list-group-item-action">
        <h4> {{course.name}} </h4>
        <div v-html="course.description"></div>
      </a>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex"
import ProfileHeaderText from "@/components/Profile/ProfileHeaderText"

export default {
  name: "AllCourses",
  computed: mapState({
    courses: state => state.api.freeCourses
  }),
  mounted () {
    this.$store.dispatch("getFreeCourses")
  },
  components: {
    "ydl-profileheadertext": ProfileHeaderText
  }
}
</script>
