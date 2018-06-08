<template>
  <div v-if="loading === false" class="container profile">
    <div class="row title">
      <div class="col-md-6">
        <h2 class="greeting"> Hallo {{user.firstName}} {{user.lastName}}</h2>
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
        <ydl-sidebar v-bind:courseId="user.courses"></ydl-sidebar>
      </div>
      <div class="col-md-4 col-lg-8 bdr">
        <ydl-course  ref="overview" v-if="true" v-bind:courseId="user.courses"></ydl-course>
        <ydl-course-detail ref="details" v-if="user.detailview" v-bind:course="{}"></ydl-course-detail>
        <button @click="showCourseDetail()"> Test detail </button>
        <button @click="showOverView()"> Test overview </button>
      </div>
      <div class="col-md-4 col-lg-2">
        <h5>Aktuelle Termine</h5>
        <!-- <ydl-calendar v-bind:tasks="user.tasks"></ydl-calendar> -->
      </div>
    </div>
  </div>
</template>

<script ref="ydl-course ydl-course-detail">
import Course from "@/components/Course"
import Calendar from "@/components/Calendar"
import CoursePage from "@/components/CoursePage"
import SideBar from "@/components/SideBar"

import axios from "axios"

import axios from "axios"

export default {
  name: "ProfilePage",
  data () {
    return {
      user: {},
      loading: true
    }
  },
  // data () {
  //   return {
  //     user: {
  //       id: 1234567,
  //       firstName: "Paul",
  //       lastName: "Müller",
  //       overview: true,
  //       detailview: false,
  //       courses: [
  //         {
  //           id: 31,
  //           title: "Japanisch",
  //           details: "<p> Es gibt neue Details </p>",
  //           administration: {
  //             leader: [
  //               {name: "Heinz Heinz", email: "heinz.heinz@heinz.de"}
  //             ],
  //             trainer: [
  //               {name: "Trainer1", email: "trainer@trainer.de"},
  //               {name: "Trainer2", email: "trainer@trainer.de"},
  //               {name: "Trainer3", email: "trainer@trainer.de"},
  //               {name: "Trainer4", email: "trainer@trainer.de"},
  //               {name: "Trainer5", email: "trainer@trainer.de"}
  //             ],
  //             organisation: [
  //               {name: "orga2", email: "orga@office.de"},
  //               {name: "orga2", email: "orga@office.de"},
  //             ]
  //           },
  //           content: {
  //             article: [
  //               {text: "<h3> Was sie in diesem Kurs erwartet </h3> <p> Lernen Sie Japanisch mit einem sehr kompetenden Lehrer in Schrift und Wort </p>"}, 
  //               {text: "<h3> Foo </h3> <p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>"}, 
  //               {text: "<h1> Hello World 1 </h1>"}, 
  //               {text: "<h1> Hello World 1 </h1>"}, 
  //               {text: "<h1> Hello World 1 </h1>"}, 
  //             ]
  //           }
  //         },
  //         {
  //           id: 32,
  //           title: "Französisch",
  //           details: "<p> Es gibt neue Details </p>",
  //           description: "our cool course"
  //         },
  //         {
  //           id: 33,
  //           title: "Spanisch",
  //           details: "<p> Es gibt neue Details </p>",
  //           description: "our cool course"
  //         },
  //         {
  //           id: 34,
  //           title: "Spanisch",
  //           details: "<p> Es gibt neue Details </p>",
  //           description: "our cool course"
  //         },
  //         {
  //           id: 35,
  //           title: "Schwedisch",
  //           details: "<p> Es gibt neue Details </p>",
  //           description: "our cool course"
  //         }
  //       ],
  //       tasks: [
  //         {
  //           id: 11,
  //           title: "Japanisch - Hausaufgabe 2",
  //           deadline: "xx.xx.xxxx"
  //         },
  //         {
  //           id: 12,
  //           title: "Japanisch - Klausur",
  //           deadline: "xx.xx.xxxx"
  //         },
  //         {
  //           id: 13,
  //           title: "Spanisch - Vortrag",
  //           deadline: "xx.xx.xxxx"
  //         },
  //         {
  //           id: 14,
  //           title: "Französisch - Präsentation",
  //           deadline: "xx.xx.xxxx"
  //         },
  //         {
  //           id: 15,
  //           title: "Schwedisch - Test",
  //           deadline: "xx.xx.xxxx"
  //         },
  //         {
  //           id: 16,
  //           title: "Schwedisch - Hausaufgabe 3",
  //           deadline: "xx.xx.xxxx"
  //         }
  //       ]
  //     }
  //   }
  // },
  components: {
    "ydl-course": Course,
    "ydl-calendar": Calendar,
    "ydl-course-detail": CoursePage,
    "ydl-sidebar": SideBar
  },
  mounted (){  
    axios.get("http://jsontest/user.json")
    .then(response => (this.user = response.data))
    console.log(this.user)
  },
  methods: {
    showCourseDetail (course, event) {
      this.user.overview = false
      this.user.detailview = true
      // this.$emit('course', event.target.course)
      this.$refs.overview.open = false
      this.$refs.details.open = true
      console.log(course)
      console.log(event.target)
    },
    showOverView () {
      this.$refs.details.open = false
      this.$refs.overview.open = true
    }
  },
  mounted () {
    axios.get("http://jsontest/user/user.json")
      .then(response => {
        this.user = response.data
        this.loading = false
      })
    console.log("user: " + this.user)
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

.greeting {
  text-align: left;
}

.bdr {
  border-left: 1px solid black;
  border-right: 1px solid black;
}
</style>
