<template>
<div class="container-fluid">
  <h3> Edit Quiz </h3>
  <hr>
  <form @submit.prevent="submitToServer">
    <div v-for="t in test.tasks" v-bind:key="t.id">
      <div v-if="t.render_type === 'MC'">
        <ydl-mcquestion v-bind:task="t"></ydl-mcquestion>
      </div>
      <div v-else>
        <ydl-vtquestion v-bind:task="t"></ydl-vtquestion>
      </div>
    </div>
    <input type="button" value="MC Frage erstellen" @click="createMCTask">
    <input type="button" value="Vokabel Frage erstellen" @click="createVTTask"> <br>
    <input type="submit" value="Erstellen">
  </form>
  {{test}}
</div>
</template>

<script>
import EditMCTask from "@/components/Quiz/EditMCTask"
import VTTask from "@/components/Quiz/EditVTTask"
import axiosInstance from "@/store/api"

export default {
  name: "Quiz",
  data () {
    return {
      test: {
        id: 11,
        tasks: [],
        score: 0,
        max_score: -1,
        t_id: -1,
        course: 11,
        scored_by: -1
      },
      taskCount: 0
    }
  },
  components: {
    "ydl-mcquestion": EditMCTask,
    "ydl-vtquestion": VTTask
  },
  mounted () {
    // todo: get request to Post
    const cid = this.$route.params.cid
    console.log(cid)
    axiosInstance.get("quiz/tests/" + cid).then(response => {
      console.log(response.data)
      this.test = response.data
    })
  },
  methods: {
    submitToServer () {
      console.log(this.test)
    },
    createMCTask () {
      console.log("MC")
      var task = {
        id: this.taskCount,
        answers: [],
        question: "",
        render_type: "MC",
        test: 11
      }
      this.test.tasks.push(task)
      this.taskCount += 1
    },
    createVTTask () {
      console.log("Vokabel")
      var task = {
        id: this.taskCount,
        answers: [],
        question: "",
        render_type: "VT",
        test: 11
      }
      this.test.tasks.push(task)
      this.taskCount += 1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
