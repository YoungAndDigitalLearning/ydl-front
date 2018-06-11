<template>
  <div class="card" v-if="!loading">
    <div class="card-header"><h1>{{ course.title }}</h1>A1.1</div>
    <div class="card-body">
      <div class="leader-board flex-container">
        <div>
          <h6> Verantwortliche/r</h6>
          <ul v-for="l in course.administration.leader" v-bind:key="l.email">
            <li>
              {{l.name}} <br>
              <span> E-Mail: {{l.email}} </span>
            </li>
          </ul>
          <h6> Sekretariat </h6>
          <ul v-for="s in course.administration.orga" v-bind:key="s.email">
            <li>
              {{s.name}} <br>
              <span> E-Mail: {{s.email}} </span>
            </li>
          </ul>
        </div>
        <div>
          <h6> Tutoren </h6>
          <ul v-for="t in course.administration.trainer" v-bind:key="t.email">
            <li>
              {{t.name}} <br>
              <span> E-Mail: {{t.email}} </span>
            </li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="description">
        <div v-for="a in course.content.article" v-bind:key=a.text v-html=a.text></div>
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
import axios from "axios"

export default {
  name: "courseview",
  props: ["value"],
  data () {
    return {
      toRender: this.course,
      course: {},
      loading: true
    }
  },
  mounted () {
    console.log(this.value)
    axios.get("http://jsontest/course/" + this.value + ".json")
      .then(response => {
        console.log(response.data)
        this.course = response.data
      })
    this.loading = false
  },
  watch: {
    value: function() {
    this.loading = true
    axios.get("http://jsontest/course/" + this.value + ".json")
      .then(response => {
        console.log(response.data)
        this.course = response.data
      })
    this.loading = false
    }
  },
  components: {
    "ydl-courseweek": CourseWeek
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
