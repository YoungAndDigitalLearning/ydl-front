<template>
  <div class="card" v-if="!loading">
    <div class="card-header"><h1>{{ course.name }}</h1>A1.1</div>
    <div class="card-body">
      <div class="leader-board flex-container">
        <div>
          <h6> Verantwortliche/r</h6>
          <ul>
            <li>
              {{course.teacher}} <br>
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
  name: "courseview",
  data () {
    return {
      course: {},
      value: -1,
      loading: true
    }
  },
  mounted () {
    this.value = this.$route.params.id
    console.log(this.value)
    this.$http.get("courses/" + this.value)
      .then(response => {
        console.log(response.data)
        this.course = response.data
      })
      .catch(error => {
        console.log(error)
        this.$router.push("/profile/404")
      })
    this.loading = false
  },
  watch: {
    value: function () {
      this.loading = true
      this.$http.get("courses/" + this.value)
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
