<template>
<div class="container-fluid">
  {{test}}
  <ydl-question/>
</div>
</template>

<script>
import Question from "@/components/Quiz/Question"
import axiosInstance from "@/store/api"

export default {
  name: "Quiz",
  data () {
    return {
      test: []
    }
  },
  components: {
    "ydl-question": Question
  },
  mounted () {
    // todo: get request to Post
    axiosInstance.get("quiz/tests")
      .then(response => {
        console.log(response.data)
        this.test = response.data
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
