<template>
  <div v-if="teacher">
    <ydl-titleheader color="darkgreen">{{ course.name }}</ydl-titleheader>
    <div class="card-body">
      <div class="felx-container" v-if="user.is_teacher && user.id === teacher.id">
        <button class="btn" @click="editCourse(course.id)">Seite bearbeiten</button>
      </div>
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
      <div class="description" v-html="course.description"></div>
      <hr>
      <div v-if="true">
        <div class="posts">
          <h3>Posts</h3>
        </div>
        <div class="courseweek-container">
          <ydl-courseweek></ydl-courseweek>
          <ydl-courseweek></ydl-courseweek>
          <ydl-courseweek></ydl-courseweek>
          <ydl-courseweek></ydl-courseweek>
        </div>
      </div>
      <div v-else>
        <button @click="register" value="Einschreiben" name="register" />
      </div>
    </div>
  </div>
</template>

<script>
import CourseWeek from "@/components/Course/CourseWeek"
import { mapState } from "vuex"
import TitleHeader from "@/components/Util/TitleHeader"
import axiosInstance from "@/store/api"

export default {
  name: "courseview",
  data () {
    return {
      course: {},
      teacher: {},
      user: {}
    }
  },
  computed: {
    ...mapState({
      joined_courses: state => state.api.joinedCourses,
      own_courses: state => state.api.ownCourses
    }),
    courses () {
      return [...this.own_courses, ...this.joined_courses]
    }
  },
  mounted () {
    const cid = this.$route.params.cid
    const uid = this.$route.params.id
    axiosInstance.get("courses/" + cid)
      .then(response => {
        this.course = response.data
        /* get teacher of this course */
        axiosInstance.get("users/" + this.course.teacher)
          .then((response) => {
            this.teacher = response.data
          })
          .catch((error) => {
            console.log("error in CoursePage get teacher")
            console.log(error.response)
          })
      })
      .catch((error) => {
        console.log("error while getting course")
        console.log(error.response)
      })
    this.$store.dispatch("viewCourse", this.course.id)

    axiosInstance.get("users/" + uid)
      .then(response => {
        this.user = response.data
      })
      .catch((error) => {
        console.log("error while getting user")
        console.log(error.response)
      })
  },
  destroyed () {
    this.$store.dispatch("viewCourse", 0)
  },
  methods: {
    editCourse (id) {
      this.$router.push("/profile/" + this.user.id + "/courses/" + id + "/edit")
    }
  },
  components: {
    "ydl-courseweek": CourseWeek,
    "ydl-titleheader": TitleHeader
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
