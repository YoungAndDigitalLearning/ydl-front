<template>
<div>
  <ydl-titleheader color="darkgreen" >QUIZ</ydl-titleheader>
  <div class="container-fluid">
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
      <input type="submit" value="Abgeben">
    </form>
  </div>
</div>
</template>

<script>
import MCTask from "@/components/Quiz/MCTask"
import VTTask from "@/components/Quiz/VTTask"
import TitleHeader from "@/components/Util/TitleHeader"
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
    "ydl-vtquestion": VTTask,
    "ydl-titleheader": TitleHeader
  },
  mounted () {
    // todo: get request to Post
    const cid = this.$route.params.cid
    axiosInstance.get("quiz/tests/" + cid)
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
