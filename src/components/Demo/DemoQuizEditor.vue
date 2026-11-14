<template>
  <section class="demo-quiz-editor">
    <h2>Edit Course Quiz</h2>
    <p>Demonstration editor. Changes are saved only in this browser.</p>
    <div v-if="error" class="alert alert-warning" role="alert">{{ error }}</div>
    <p v-if="loading">Loading quiz…</p>
    <form v-else @submit.prevent="save">
      <div v-for="(task, index) in quiz.tasks" :key="index" class="question-editor">
        <label :for="'question-' + index">Question {{ index + 1 }}</label>
        <input :id="'question-' + index" class="form-control" v-model="task.question" required>
        <div v-for="(answer, optionIndex) in task.answers" :key="optionIndex" class="answer-editor">
          <input type="radio" :name="'correct-' + index" :checked="answer.max_score > 0" @change="markCorrect(task, optionIndex)" :aria-label="'Mark answer ' + (optionIndex + 1) + ' as correct'">
          <input class="form-control" v-model="answer.answer" :aria-label="'Answer ' + (optionIndex + 1)" required>
          <button class="btn btn-sm btn-outline-danger" type="button" @click="task.answers.splice(optionIndex, 1)">Remove</button>
        </div>
        <button class="btn btn-sm btn-outline-primary" type="button" @click="addAnswer(task)">Add answer</button>
        <button class="btn btn-sm btn-outline-danger" type="button" @click="quiz.tasks.splice(index, 1)">Remove question</button>
      </div>
      <div class="actions">
        <button class="btn btn-outline-primary" type="button" @click="addQuestion">Add multiple-choice question</button>
        <button class="btn btn-primary" type="submit">Save Quiz</button>
      </div>
    </form>
  </section>
</template>

<script>
import api from "@/store/api"

export default {
  name: "DemoQuizEditor",
  data () {
    return { quiz: { id: null, course: Number(this.$route.params.cid), tasks: [] }, loading: true, error: "" }
  },
  mounted () {
    api.get("quiz/tests/")
      .then(response => {
        const match = response.data.find(test => Number(test.course) === Number(this.$route.params.cid))
        return match ? api.get("quiz/tests/" + match.id) : Promise.resolve({ data: this.quiz })
      })
      .then(response => { this.quiz = response.data })
      .catch(() => { this.error = "Could not load the quiz" })
      .then(() => { this.loading = false })
  },
  methods: {
    addQuestion () {
      this.quiz.tasks.push({ render_type: "MC",
        question: "",
        answers: [
          { answer: "", max_score: 1 }, { answer: "", max_score: 0 }
        ] })
    },
    addAnswer (task) {
      task.answers.push({ answer: "", max_score: 0 })
    },
    markCorrect (task, index) {
      task.answers.forEach((answer, i) => { answer.max_score = i === index ? 1 : 0 })
    },
    save () {
      this.error = ""
      if (!this.quiz.tasks.length || this.quiz.tasks.some(task => !task.question || task.answers.length < 2 || !task.answers.some(a => a.max_score > 0))) {
        this.error = "Add a complete question with at least two answers and one correct option."
        return
      }
      const prepared = JSON.parse(JSON.stringify(this.quiz))
      prepared.tasks.forEach(task => {
        const correct = task.answers.find(a => Number(a.max_score) > 0)
        task.answers.forEach(answer => {
          answer.correct_answer = correct.answer
          answer.checked = false
        })
      })
      api.put("quiz/tests/" + (this.quiz.id || "new"), prepared)
        .then(response => {
          this.quiz = response.data
          this.$notify({ title: "Quiz saved", text: "Saved in local demo storage", type: "success" })
        })
        .catch(error => { this.error = error.response && error.response.data.detail ? error.response.data.detail : "Could not save quiz" })
    }
  }
}
</script>

<style scoped>
.demo-quiz-editor { padding: 24px; text-align: left; color: #253447; }
.demo-quiz-editor h2 { font-size: 28px; }
.question-editor { background: #f8fafc; padding: 18px; margin-bottom: 18px; border: 1px solid #dce5ec; }
.answer-editor { display: flex; align-items: center; gap: 10px; margin: 9px 0; }
.answer-editor .form-control { flex: 1; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; padding-bottom: 24px; }
</style>
