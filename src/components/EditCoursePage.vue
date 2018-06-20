<template>
  <div class="card" v-if="!loading">
    <div class="card-header"><h1>{{ course.name }}</h1>A1.1</div>
    <div class="card-body">
      <div class="leader-board flex-container">
        <div>
          <h6> Verantwortliche/r</h6>
          <ul>
            <li>
              <input type="text" name="leader" placeholder="Name des Lehrers">
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

export default {
  name: "course-edit",
  props: ["value"],
  data () {
    return {
      toRender: this.course,
      course: {},
      loading: true
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
