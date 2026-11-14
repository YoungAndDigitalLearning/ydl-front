<template>
  <div class="quiz-page">
    <ydl-titleheader color="darkgreen">QUIZ</ydl-titleheader>
    <div class="container-fluid quiz-body">
      <p v-if="loading" class="status">Loading quiz…</p>
      <div v-else-if="error" class="alert alert-warning" role="alert">
        {{ error }}
      </div>
      <form
        v-else-if="test && test.tasks && test.tasks.length"
        @submit.prevent="submitQuiz"
      >
        <div v-for="task in test.tasks" :key="task.id">
          <ydl-mcquestion v-if="task.render_type === 'MC'" :task="task" />
          <ydl-vtquestion v-else :task="task" />
        </div>
        <div class="quiz-actions">
          <button type="submit" class="btn btn-primary btn-lg">
            Submit answers
          </button>
          <p class="demo-note">
            Demo quiz — answers are evaluated locally and are not saved to your
            account.
          </p>
          <div v-if="submitted" class="alert alert-info result" role="status">
            <strong>Your result: {{ score }} / {{ total }} points</strong>
            <p>Review your selections and try again if you like.</p>
          </div>
        </div>
      </form>
      <p v-else class="status">No quiz is available for this course yet.</p>
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
  components: {
    "ydl-mcquestion": MCTask,
    "ydl-vtquestion": VTTask,
    "ydl-titleheader": TitleHeader
  },
  data () {
    return {
      test: null,
      loading: true,
      error: "",
      submitted: false,
      score: 0,
      total: 0
    }
  },
  mounted () {
    this.loadQuiz()
  },
  watch: {
    "$route.params.cid" () {
      this.loadQuiz()
    }
  },
  methods: {
    loadQuiz () {
      this.loading = true
      this.error = ""
      this.test = null
      this.submitted = false
      const courseId = Number(this.$route.params.cid)
      // The route parameter is a COURSE id, not necessarily a quiz Test id.
      axiosInstance
        .get("quiz/tests/")
        .then((response) => {
          const tests = Array.isArray(response.data)
            ? response.data
            : response.data.results || []
          const match = tests.find((item) => Number(item.course) === courseId)
          if (!match) {
            this.error = "No quiz has been created for this course yet."
          } else {
            return axiosInstance
              .get("quiz/tests/" + match.id)
              .then((detail) => {
                this.test = detail.data
                // Never preselect saved answer flags from the shared database.
                this.test.tasks.forEach((task) => {
                  task.answers.forEach((answer) => {
                    answer.checked = false
                  })
                })
              })
          }
        })
        .catch(() => {
          this.error = "The quiz could not be loaded. Please try again."
        })
        .then(() => {
          this.loading = false
        })
    },
    submitQuiz () {
      let score = 0
      let total = 0
      this.test.tasks.forEach((task) => {
        if (task.render_type === "MC") {
          const answers = task.answers || []
          const correct = answers.filter(
            (answer) => answer.answer === answer.correct_answer
          )
          const valid = answers.every(
            (answer) =>
              !!answer.checked === (answer.answer === answer.correct_answer)
          )
          const points = correct.reduce(
            (sum, answer) => sum + Number(answer.max_score || 0),
            0
          )
          total += points
          if (valid) score += points
        }
      })
      this.score = score
      this.total = total
      this.submitted = true
    }
  }
}
</script>

<style lang="scss" scoped>
.quiz-body {
  padding: 20px 24px 36px;
}
.quiz-actions {
  text-align: center;
  padding: 14px 0 34px;
}
.quiz-actions .btn {
  padding: 10px 28px;
  background: #0689b3;
  border-color: #0689b3;
}
.quiz-actions .btn:hover {
  background: #047498;
  border-color: #047498;
}
.demo-note {
  color: #667789;
  margin-top: 15px;
  font-size: 13px;
}
.result {
  text-align: left;
  max-width: 560px;
  margin: 20px auto 0;
}
.result p {
  margin: 6px 0 0;
}
.status {
  padding: 24px 0;
}
</style>
