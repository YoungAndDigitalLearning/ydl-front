<template>
<div>
  <ul class="nav navbar-nav">
    <li class="nav-item">
    <a class="nav-link active" href="#">Übersicht</a>
    <a class="nav-link" href="/#/profile">Meine Kurse</a>
    <ul class="nav navbar-nav my-courses" v-for="course in courses" v-bind:key="course.id">
      <li class="nav-item">
      <button class="nav-link embed btn" v-on:click="$emit('load-detail', course.id)">{{course.title}}</button>
      </li>
    </ul>
    </li>
    <li>
    <a class="nav-link" href="#">Alle Kurse</a>
    </li>
    <li>
    <a class="nav-link" href="#">Mein Kalender</a>
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
    triggerDetailView (id) {
      console.log("event triggered with value: " + id)
      this.$emit("load-details", id)
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #000000;
}

.nav-link {
  color: #000000;
}

.nav-link:hover {
  background-color: #0689b3;
  color: white;
  transition: 300ms;
}

.embed:hover {
  background-color: #0688b3a2;
  color: white;
  transition: 300ms;
}

.active {
  text-decoration: underline;
  color: white;
  background-color: #0689b3;
}

.my-courses {
  text-align: right;
  margin-left: 10px;
}

.my-courses > li > a{
  padding-right: 5px;
}
</style>
