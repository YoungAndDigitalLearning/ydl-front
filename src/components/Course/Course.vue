<template>
<div v-if="open">
  <ul class="list-group" v-for="course in courses" v-bind:key="course.id">
    <a class="list-group-item list-group-item-action" href="/#/profile" v-on:click="$emit('load-details', course.id)">
      <h4> {{course.name}} </h4>
      <div v-html="course.news"></div>
    </a>
  </ul>
</div>
<div v-else>
  <h3> Du bist noch keinem Kurs beigetreten" </h3>
</div>
</template>

<script>
export default {
  name: "Course",
  data () {
    return {
      courseId: [],
      courses: [],
      open: false
    }
  },
  mounted () {
    console.log("Course: courseID: " + this.courseId)
    if (this.courseId !== []) {
      for (const id of this.courseId) {
        console.log(id)
        this.$http.get("courses/" + id)
          .then(response => {
            console.log(response.data)
            this.courses.push(response.data)
          })
        this.open = true
      }
    } else {
      this.open = false
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
