<template>
<div class="container-fluid">
  <h5><input type="textfield" v-model="task.question" placeholder="Frage"></h5>
  <input type="textfield" v-model="task.correct_answer" placeholder="Antwort"> <br>
  <hr>
</div>
</template>

<script>

export default {
  name: "VTTask",
  props: ["task"],
  methods: {
    addAnswer () {
      var answer = {
        id: this.answerCount,
        answer: "",
        checked: false,
        correct_answer: "",
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
