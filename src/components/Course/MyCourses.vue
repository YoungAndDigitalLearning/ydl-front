<template>
<div>
  <ydl-titleheader v-if="user.is_teacher" color="darkgreen">My Courses</ydl-titleheader>
  <ul class="list-group" v-if="user.is_teacher" v-for="course in own_courses" v-bind:key="course.id">
    <a v-if="!course.paid" class="list-group-item list-group-item-action" :href="'/#/profile/' + user.id + '/courses/' + course.id" v-on:click="$emit('load-details', course.id)">
      <h4> {{course.name}} </h4>
    </a>
    <a v-else class="list-group-item list-group-item-action blocked" :href="'/#/profile/courses/' + course.id">
      <h4> {{course.name}} </h4>
      <div v-html="course.news"></div>
    </a>
  </ul>
  <ydl-titleheader color="darkgreen">Joined Courses</ydl-titleheader>
  <ul class="list-group" v-for="course in joined_courses" v-bind:key="course.id">
    <a v-if="!course.paid" class="list-group-item list-group-item-action" :href="'/#/profile/' + user.id + '/courses/' + course.id" v-on:click="$emit('load-details', course.id)">
      <h4> {{course.name}} </h4>
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
import TitleHeader from "@/components/Util/TitleHeader"

export default {
  name: "MyCourses",
  computed: mapState({
    joined_courses: state => state.api.joinedCourses,
    own_courses: state => state.api.ownCourses,
    user: state => state.api.user
  }),
  components: {
    "ydl-titleheader": TitleHeader
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
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

.list-group-item:hover {
  background-color: #07a7da;
  color: white;
  transition: 300ms;
}

.list-group-item {
  border-radius: 0;
}

.blocked {
  pointer-events: none;
  color: gray;
  background-color: lightgray;
}
</style>
