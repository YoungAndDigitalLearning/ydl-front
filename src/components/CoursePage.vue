<template>
  <div v-if="teacher">
    <ydl-profileheadertext color="darkgreen">{{ course.name }}</ydl-profileheadertext>
    <div class="card-body">
      <div class="leader-board flex-container">
        <div>
          <h6> Verantwortliche/r</h6>
          <ul>
            <li>
              {{teacher.first_name + " " + teacher.last_name}} <br>
              <span> E-Mail: [email] </span>
            </li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="description">
        {{ course.description }}
      </div>
      <hr>
      <div class="courseweek-container">
      <ydl-courseweek></ydl-courseweek>
      <ydl-courseweek></ydl-courseweek>
      <ydl-courseweek></ydl-courseweek>
      <ydl-courseweek></ydl-courseweek>
      </div>
    </div>
  </div>
</template>

<script>
import CourseWeek from "@/components/CourseWeek"
import { mapState } from "vuex"
import ProfileHeaderText from "./ProfileHeaderText.vue"
import { axiosInstance } from "../store/actions.js"

export default {
  name: "courseview",
  data () {
    return {
      course: {},
      teacher: {}
    }
  },
  computed: mapState(["courses"]),
  mounted () {
    const cid = this.$route.params.cid
    this.courses.forEach(course => {
      if (parseInt(course.id) === parseInt(cid)) {
        console.log("found course")
        this.course = course
      }
    })
    this.$store.dispatch("viewCourse", this.course.id)

    /* get teacher of this course */
    axiosInstance.get("users/" + this.course.teacher)
      .then((response) => {
        this.teacher = response.data
      })
      .catch((error) => {
        console.log("error in CoursePage get teacher")
        console.log(error.response)
      })
  },
  components: {
    "ydl-courseweek": CourseWeek,
    "ydl-profileheadertext": ProfileHeaderText
  }
}
</script>

<style lang="scss" scoped>
.card {
  color:#56585b;
  margin-top: 25px;
  border-radius: 0;
  font-family:'Lora', serif;
  background-color: rgba(200, 200, 200, 0.95);
  font-size:14px;
}

.card-text > p{
  color:#000000;
}

.courseweek-container {
  display: flex;
  flex-direction: column;
}

.card-body {
  text-align: left;
}

.leader-board {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 12px;
}

.description {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
</style>
