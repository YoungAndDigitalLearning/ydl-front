<template>
<div class="container-fluid">
  {{test}}
</div>
</template>

<script>
import axiosInstance from "@/store/api"

export default {
  name: "Question",
  data () {
    return {
      test: {}
    }
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
