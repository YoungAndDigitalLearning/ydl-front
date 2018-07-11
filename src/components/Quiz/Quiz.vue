<template>
<div class="container-fluid">
  <form @submit.prevent="submitToServer">
    <div v-for="t in test.tasks" v-bind:key="t.id">
      <div v-if="t.render_type === 'MC'">
        <ydl-mcquestion v-bind:task="t"></ydl-mcquestion>
      </div>
      <div v-else>
        <ydl-vtquestion v-bind:task="t"></ydl-vtquestion>
      </div>
    </div>
    <input type="submit" value="Abgeben">
  </form>
  {{test}}
</div>
</template>

<script>
import MCTask from "@/components/Quiz/MCTask"
import VTTask from "@/components/Quiz/VTTask"
import axiosInstance from "@/store/api"

export default {
  name: "Quiz",
  data () {
    return {
      test: {}
    }
  },
  components: {
    "ydl-mcquestion": MCTask,
    "ydl-vtquestion": VTTask
  },
  mounted () {
    // todo: get request to Post
    axiosInstance.get("quiz/tests/1")
      .then(response => {
        console.log(response.data)
        this.test = response.data
      })
  },
  methods: {
    submitToServer () {
      console.log(this.test)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
