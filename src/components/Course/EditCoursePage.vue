<template>
  <div class="card" v-if="!loading">
    <div class="card-header"><h1>{{ course.name }}</h1>A1.1</div>
    <div class="card-body">
      <div class="leader-board flex-container">
        <div>
          <h6> Verantwortliche/r</h6>
          <ul>
            <li>
              <span> Name: {{teacher.first_name + " " + teacher.last_name}}</span>
              <span> E-Mail: [email] </span>
            </li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="description">
        <div>
          <ydl-editor v-model="editorContent"></ydl-editor>
        </div>
        <button @click="saveContent" class="btn">Speichern</button>
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
import CourseWeek from "@/components/Course/CourseWeek"
import { axiosInstance } from "../../store/utils/api"
import { VueEditor } from "vue2-editor"
import { mapState } from "vuex"

export default {
  name: "course-edit",
  props: ["value"],
  data () {
    return {
      toRender: this.course,
      course: {},
      teacher: {},
      userID: -1,
      editorContent: "<h1>!!! initial Content !!!</h1>",
      loading: true
    }
  },
  components: {
    "ydl-courseweek": CourseWeek,
    "ydl-editor": VueEditor
  },
  created () {
    const cid = this.$route.params.cid
    this.userID = this.$route.params.id
    axiosInstance.get("courses/" + cid)
      .then(response => {
        this.course = response.data
        console.log(this.course)
        axiosInstance.get("users/" + this.course.teacher)
          .then(response => {
            this.teacher = response.data
          })
        this.editorContent = this.course.description
        this.loading = false
      })
  },
  methods: {
    handleSubmit () {
      console.log("courses/" + this.course.id)
      axiosInstance.put("courses/" + this.course.id, this.course)
        .then(response => {
          console.log("response: ")
          console.log(response.data)
        })
      this.$router.push("/profile/" + this.userId + "/courses/" + this.course.id)
      this.$notify({
        title: "Course Update",
        text: "successfully updated your course data",
        type: "success"
      })
    },
    saveContent () {
      console.log(this.editorContent)
      this.course.description = this.editorContent
      console.log(this.course.description)
      this.handleSubmit()
    }
  },
  computed: {
    ...mapState({
      joined_courses: state => state.api.joinedCourses,
      own_courses: state => state.api.ownCourses,
      user: state => state.api.user
    }),
    courses () {
      return [...this.own_courses, ...this.joined_courses]
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  color:#56585b;
  margin-top: 25px;
  border-radius: 0;
  font-family:'Lora', serif;
  background-color: white;
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

.btn {
  margin-top: 5px;
}
</style>
