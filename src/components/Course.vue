<template>
<div v-if="open">
  {{courseId}}
  <ul class="list-group" v-for="course in courses" v-bind:key="course.id">
    <a class="list-group-item list-group-item-action" href="/#/profile" v-on:click="$emit('load-details', course.id)">
      <h4> {{course.title}} </h4>
      <div v-html="course.news"></div>
    </a>
  </ul>
</div>
</template>

<script>
import axios from "axios"

export default {
  name: "Course",
  props: ["courseId"],
  data () {
    return {
      courses: [],
      open: true
    }
  },
  mounted () {
    console.log("Course: courseID: " + this.courseId)
    for (var id in this.courseId) {
      console.log(id)
      axios.get("http://jsontest/course/" + id + ".json")
        .then(response => {
          console.log(response.data)
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

.list-group-item:hover {
  background-color: #07a7da;
  color: white;
  transition: 300ms;
}
</style>
