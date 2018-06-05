<template>
  <div class="container profile">
    <div class="row title">
      <div class="col-md-6">
        <h2 class="greeting"> Hallo {{user.firstName}} {{user.lastName}} </h2>
      </div>
      <div class="col-md-6 controls">
        <a class="btn btn-light action-button control-btn embed" href="">Einstellungen</a>
        <a class="btn btn-light action-button control-btn embed" href="">Log Out</a>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <hr class="seperator">
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-lg-2">
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="#">Übersicht</a>
            <a class="nav-link" href="#">Meine Kurse</a>
            <ul class="nav navbar-nav my-courses" v-for="course in user.courses" v-bind:key="course.id">
              <li class="nav-item"> <a class="nav-link embed" href="#">{{course.title}}</a></li>
            </ul>
          </li>
          <li>
            <a class="nav-link" href="#">Alle Kurse</a>
          </li>
        </ul>
      </div>
      <div class="col-md-4 col-lg-8 bdr">
        <ul class="list-group">
          <ydl-course v-for="course in user.courses" v-bind:key="course.id" v-bind:course="course"></ydl-course>
        </ul>
      </div>
      <div class="col-md-4 col-lg-2">
        <h5>Aktuelle Termine</h5>
        <ydl-calendar v-bind:tasks="user.tasks"></ydl-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import Course from "@/components/Course"
import Calendar from "@/components/Calendar"

export default {
  name: "ProfilePage",
  data () {
    return {
      user: {
        id: 1234567,
        firstName: "Paul",
        lastName: "Müller",
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
            id: 3,
            title: "Spanisch",
            details: "<p> Es gibt neue Details </p>"
          },
          {
            id: 4,
            title: "Schwedisch",
            details: "<p> Es gibt neue Details </p>"
          }
        ],
        tasks: [
          {
            id: 1,
            title: "Japanisch - Hausaufgabe 2",
            deadline: "xx.xx.xxxx"
          },
          {
            id: 2,
            title: "Japanisch - Klausur",
            deadline: "xx.xx.xxxx"
          },
          {
            id: 3,
            title: "Spanisch - Vortrag",
            deadline: "xx.xx.xxxx"
          },
          {
            id: 4,
            title: "Französisch - Präsentation",
            deadline: "xx.xx.xxxx"
          },
          {
            id: 5,
            title: "Schwedisch - Test",
            deadline: "xx.xx.xxxx"
          },
          {
            id: 6,
            title: "Schwedisch - Hausaufgabe 3",
            deadline: "xx.xx.xxxx"
          }
        ]
      }
    }
  },
  components: {
    "ydl-course": Course,
    "ydl-calendar": Calendar
  }
}
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}

hr {
  border: 2px solid black;
}

.controls {
  text-align: right;
}

.control-btn {
  background-color: black;
  color: white;
  border-radius: 30px;
}

.profile {
  background-color: white;
  color: black;
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

.greeting {
  text-align: left;
}

.bdr {
  border-left: 1px solid black;
  border-right: 1px solid black;
}
</style>
