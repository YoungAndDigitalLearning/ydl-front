<template>
<div>
  <ul class="nav navbar-nav">
    <li class="nav-item">
    <a class="nav-link active" href="#">Übersicht</a>
    <a class="nav-link" href="/#/profile" @click="showOverView">Meine Kurse</a>
    <ul class="nav navbar-nav my-courses" v-for="course in courses" v-bind:key="course.id">
      <li class="nav-item">
      <a class="nav-link embed" href="/#/profile" @click="showCourseDetail(course, $event)">{{course.title}}</a>
      </li>
    </ul>
    </li>
    <li>
    <a class="nav-link" href="#">Alle Kurse</a>
    </li>
</ul>
</div>
</template>

<script>
import axios from "axios"

export default {
  name: "SideBar",
  props: ["courseId"],
  data () {
    return {
      courses: []
    }
  },
  mounted () {
    console.log("SidBar courseID: " + this.courseId)
    for (var id in this.courseId) {
      console.log(id)
      axios.get("http://jsontest/course/" + id + ".json")
        .then(response => {
          console.log(response.data)
          this.courses.push(response.data)
        })
    }
  },
  methods: {
    showOverView () {
    },
    showCourseDetail () {
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}

.nav-link {
  color: black;
}

.nav-link:hover {
  background-color: black;
  color: white;
  transition: 300ms;
}

.embed:hover {
  background-color: #444444;
  color: white;
  transition: 300ms;
}

.active {
  text-decoration: underline;
  color: white;
  background-color: black;
}

.list-group {
  color: black;
}

.my-courses {
  text-align: right;
  margin-left: 10px;
}

.my-courses > li > a{
  padding-right: 5px;
}
</style>
