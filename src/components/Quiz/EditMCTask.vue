<template>
<div class="container-fluid">
  <h5><input type="text" placeholder="Frage" v-model="task.question"></h5>
    <div v-for="answer in task.answers" v-bind:key="answer.id">
      <input type="checkbox" v-model="answer.correct_answer" v-bind:name="answer.id" v-bind:value="answer.id">
      <input type="text" v-model="answer.answer" placeholder="Antwort">
      <input type="number" v-model="answer.max_score">
      <input type="button" value="löschen" @click="removeAnswer(answer.id)">
      <br>
    </div>
    <input type="button" value="antwort hinzufügen" @click="addAnswer">
  <hr>
</div>
</template>

<script>

export default {
  name: "EditMCTask",
  data () {
    return {
      answerCount: 0
    }
  },
  methods: {
    addAnswer () {
      var answer = {
        id: this.answerCount,
        answer: "",
        checked: false,
        correct_answer: false,
        max_score: 0,
        score: 0,
        order: 0,
        task: this.task.id
      }
      this.task.answers.push(answer)
      this.answerCount += 1
    },
    removeAnswer (id) {
      this.task.answers.pop(id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
