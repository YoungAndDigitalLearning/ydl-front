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
        <hr>
        <h5>Resourcen
        <a class="resource-link" :href="'/#/profile/' + userID + '/createresource'"> Resource erstellen</a>
        </h5>
        <div class="resource">
          <ydl-resource v-bind:embed="true"></ydl-resource>
        </div>
        <button @click="saveContent" class="btn">Speichern</button>
      </div>
      <hr>
        <button @click="generateQuiz" class="btn">Quiz erstellen</button>
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
import axiosInstance from "@/store/api"
import { VueEditor } from "vue2-editor"
import Resources from "@/components/Resources/Resources"

export default {
  name: "course-edit",
  props: ["value"],
  data () {
    return {
      toRender: this.course,
      course: {},
      teacher: {},
      userID: -1,
      cID: -1,
      editorContent: "<h1>!!! initial Content !!!</h1>",
      loading: true
    }
  },
  components: {
    "ydl-courseweek": CourseWeek,
    "ydl-editor": VueEditor,
    "ydl-resource": Resources
  },
  created () {
    this.cID = this.$route.params.cid
    this.userID = this.$route.params.id
    axiosInstance.get("courses/" + this.cID)
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
      console.log(this.course.description)
      axiosInstance.put("courses/" + this.course.id, this.course)
        .then(response => {
          console.log("Teeeest")
          console.log(response.data)
          if (response.status === 200) {
            this.$notify({
              title: "Course Update",
              text: "successfully updated your course data",
              type: "success"
            })
            this.$router.push("/profile/" + this.userId + "/courses/" + this.course.id)
          } else {
            this.$notify({
              title: "Course Update",
              text: "Error while saving your changes",
              type: "error"
            })
          }
        })
    },
    saveContent () {
      this.course.description = this.editorContent
      this.$store.dispatch("editCourse", {params: {id: this.cID}, data: this.course})
        .then(response => {
          console.log(this.userID)
          this.$router.push("/profile/" + this.userID + "/courses/" + this.course.id)
        })
      // this.handleSubmit()
    },
    generateQuiz () {
      // todo: create empty quiz skeleton that can be filled
      this.$router.push("/profile/" + this.userID + "/courses/" + this.cID + "/quiz/edit")
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

.resource {
  height: 200px;
  overflow: auto;
}

.resource-link {
  float:right;
  font-size: 17px;
}
</style>
