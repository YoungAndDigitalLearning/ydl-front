<template>
<div>
  <ul class="nav navbar-nav">
    <li class="nav-item">
    <a class="nav-link active" href="#">Übersicht</a>
    <a class="nav-link" href="/#/profile" v-on:click="$emit('load-overview')">Meine Kurse</a>
    <ul class="nav navbar-nav my-courses" v-for="course in courses" v-bind:key="course.id">
      <li class="nav-item">
      <a class="nav-link embed" v-on:click="$emit('load-details', course.id)">{{course.title}}</a>
      </li>
    </ul>
    </li>
    <li>
    <a class="nav-link" href="/#/profile" v-on:click="$emit('load-all-courses')">Alle Kurse</a>
    </li>
    <li>
    <a class="nav-link" href="/#/profile" v-on:click="$emit('load-timetable')">Mein Kalender</a>
    </li>
</ul>
</div>
</template>

<script>
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
    for (const id of this.courseId) {
      console.log(id)
      this.$http.get("courses/" + id)
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

.my-courses > li > button{
  padding-right: 5px;
}
</style>
