<template>
<div v-if="!loading">
  <ul class="list-group" v-for="course in courses" v-bind:key="course.id">
    <a v-if="!course.paid" class="list-group-item list-group-item-action" href="/#/profile" v-on:click="$emit('load-details', course.id)">
      <h4> {{course.title}} </h4>
      <div v-html="course.news"></div>
    </a>
    <a v-else class="list-group-item list-group-item-action blocked" href="/#/profile">
      <h4> {{course.title}} </h4>
      <div v-html="course.news"></div>
    </a>
  </ul>
</div>
</template>

<script>
export default {
  name: "AllCourses",
  data () {
    return {
      loading: true,
      courseId: {},
      courses: []
    }
  },
  mounted () {
    this.$http.get("courses/")
      .then(response => {
        console.log(response)
        console.log("response.data: " + response.data.ids)
        this.courseId = response.data.ids
        console.log("courseId: " + this.courseId)
        for (var id in this.courseId) {
          console.log(id)
          this.$http.get("courses/" + id)
            .then(response => {
              console.log(response.data)
              this.courses.push(response.data)
            })
        }
      })
    this.loading = false
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

.blocked {
  pointer-events: none;
  color: gray;
  background-color: lightgray;
}
</style>
