<template>
  <div class="card">
    <div class="card-header"><h1>Deutsch</h1>A1.1</div>
    <div class="card-body">
      <h2 class="card-title">Neuigkeiten</h2>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum eu mauris ut lacinia. Sed convallis leo posuere, placerat neque a, blandit urna. Sed id ultricies felis. Ut viverra ut odio id elementum. Sed sodales risus enim, at viverra purus tempor id. Proin at accumsan lectus. Etiam lacinia tellus risus, a ultricies nulla fringilla at. Quisque a ex quis libero scelerisque vulputate. Morbi dui sapien, consequat eget molestie ac, pellentesque ut tortor. Nunc et dictum tellus. Praesent urna ante, molestie tristique felis et, feugiat euismod elit. Phasellus vehicula felis felis, eget laoreet libero tincidunt sit amet. Pellentesque posuere semper erat eu dapibus. Maecenas id ligula turpis.

Nulla facilisi. Pellentesque non posuere neque, sit amet blandit sem. Proin ut dolor convallis, mollis urna nec, varius ipsum. Phasellus rhoncus sit amet libero non maximus. Cras et vehicula odio. Vestibulum sodales erat eu nibh euismod, at porttitor tellus auctor. In id efficitur nisl. Proin rhoncus mi sit amet leo ultrices semper. Pellentesque euismod, quam eu semper facilisis, nisl odio pellentesque massa, sed congue felis nulla eget libero. Quisque malesuada felis vitae felis ornare, quis fermentum quam imperdiet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam a pretium metus. Vestibulum ante odio, sagittis et urna mattis, auctor bibendum dui. Proin facilisis nunc eu purus maximus luctus. Quisque sit amet justo odio. Sed ut sollicitudin enim.
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
  mounted () {
    axios.get("api/courses/")
      .then(function (response) {
        console.log(response.data)
        // this.articleEntries = response.data
      })
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
</style>
