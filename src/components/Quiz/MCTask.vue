<template>
<div class="container-fluid">
  <h5>{{task.question}}</h5>
    <div v-for="answer in task.answers" v-bind:key="answer.id">
      <input type="checkbox" v-model="answer.checked" v-bind:name="answer.id" v-bind:value="answer.id"> {{answer.answer}} <br>
    </div>
  <hr>
</div>
</template>

<script>

export default {
  name: "MCTask",
  props: ["task"]

}
</script>

<style lang="scss" scoped>

</style>
