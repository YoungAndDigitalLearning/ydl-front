<template>
  <div class="container profile">
    <div class="row">
      <div class="col-md-2 col-lg-2">
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="#">Meine Kurse</a>
            <ul class="nav navbar-nav my-courses" v-for="course in courses" v-bind:key="course.id">
              <li class="nav-item"> <a class="nav-link" href="#">{{course.title}}</a></li>
            </ul>
          </li>
          <li>
            <a class="nav-link" href="#">Alle Kurse</a>
          </li>
        </ul>
      </div>
      <div class="col-md-4 col-lg-8">
        <ul class="list-group">
          <ydl-course v-for="course in courses" v-bind:key="course.id" v-bind:course="course"></ydl-course>
        </ul>
      </div>
      <div class="col-md-4 col-lg-2">
        <h6>Aktuelle Termine</h6>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Course from "@/components/Course"

export default {
  name: "ProfilePage",
  data () {
    return {
      courses: [
        {
          id: 1,
          title: "Japanisch",
          details: "<p> Es gibt neue Details </p>"
        },
        {
          id: 2,
          title: "Französisch",
          details: "<p> Es gibt neue Details </p>"
        },
        {
          id: 3,
          title: "Spanisch",
          details: "<p> Es gibt neue Details </p>"
        },
        {
          id: 4,
          title: "Schwedisch",
          details: "<p> Es gibt neue Details </p>"
        }
      ]
    }
  },
  components: {
    "ydl-course": Course
  }
}
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}

.profile {
  background-color: white;
  padding: 15px;
}

.nav-link {
  color: black;
}

.nav-link:hover {
  background-color: black;
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
}
</style>
