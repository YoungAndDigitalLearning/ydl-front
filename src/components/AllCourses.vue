<template>
<div>
  <ul class="list-group" v-for="course in courses" v-bind:key="course.id">
    <a class="list-group-item list-group-item-action" v-bind:href="'/profile/' + course.id">
      <h4> {{course.title}} </h4>
      <div v-html="course.details"></div>
    </a>
  </ul>
</div>
</template>

<script>
import axios from "axios"

export default {
  name: "Course",
  data () {
    return {
      allCourses: {},
      courses: []
    }
  },
  mounted () {
    axios.get("http://jsontest/courses/allcourses.json")
      .then(function (response) {
        console.log(response.data)
        this.allCourses = response.data
      })
    for (var id in this.allCourses.free) {
      axios.get("http://jsontest/courses/" + id + ".json")
        .then(response => {
          this.courses.push(response.data)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}
</style>