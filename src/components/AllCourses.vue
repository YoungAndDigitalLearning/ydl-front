<template>
<div>
  <ydl-profileheadertext color="darkgreen">My Courses</ydl-profileheadertext>
  <ul class="list-group" v-for="course in courses" v-bind:key="course.id">
    <a v-if="!course.paid" class="list-group-item list-group-item-action" :href="'/#/profile/' + user.id + '/courses/' + course.id" v-on:click="$emit('load-details', course.id)">
      <h4> {{course.name}} </h4>
      <div v-html="course.description"></div>
    </a>
    <a v-else class="list-group-item list-group-item-action blocked" :href="'/#/profile/courses/' + course.id">
      <h4> {{course.name}} </h4>
      <div v-html="course.news"></div>
    </a>
  </ul>
</div>
</template>

<script>
import { mapState } from "vuex"
import ProfileHeaderText from "@/components/ProfileHeaderText"

export default {
  name: "AllCourses",
  computed: mapState(["courses", "user"]),
  components: {
    "ydl-profileheadertext": ProfileHeaderText
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
