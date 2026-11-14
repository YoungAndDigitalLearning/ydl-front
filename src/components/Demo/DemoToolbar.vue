<template>
  <div class="demo-toolbar" role="region" aria-label="Interactive demonstration controls">
    <div class="demo-description">
      <strong>Interactive Demo</strong>
      <span>Fictional sample data · changes stay in this browser</span>
    </div>
    <div class="demo-controls">
      <button class="btn btn-sm" :class="isStudent ? 'btn-light' : 'btn-outline-light'" type="button" @click="switchRole(2)">
        Explore as Student
      </button>
      <button class="btn btn-sm" :class="isTeacher ? 'btn-light' : 'btn-outline-light'" type="button" @click="switchRole(1)">
        Explore as Teacher
      </button>
      <button class="btn btn-sm btn-outline-light" type="button" @click="reset">Reset Demo</button>
    </div>
  </div>
</template>

<script>
import { getDemoUserId, setDemoUserId, clearDemoUserId, resetDemoData } from "@/demo/session"

export default {
  name: "DemoToolbar",
  data () {
    return { currentId: getDemoUserId(), switching: false }
  },
  computed: {
    isStudent () { return this.currentId === 2 },
    isTeacher () { return this.currentId === 1 }
  },
  methods: {
    async switchRole (id) {
      if (this.switching) return
      this.switching = true
      setDemoUserId(id)
      this.currentId = id
      try {
        await this.$store.dispatch("getUser", { params: { id: id } })
        await this.$store.dispatch("getCourses")
        await this.$router.push("/profile/" + id + "/courses/")
      } catch (error) {
        this.$notify({ title: "Demo", text: "Could not open this demo profile", type: "error" })
      } finally {
        this.switching = false
      }
    },
    async reset () {
      resetDemoData()
      clearDemoUserId()
      this.currentId = null
      await this.$store.dispatch("logout")
      if (this.$route.path !== "/") await this.$router.push("/")
      this.$notify({ title: "Demo reset", text: "Sample data restored in this browser", type: "success" })
    }
  }
}
</script>

<style scoped>
.demo-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 10px 20px;
  background: #21566d;
  color: #ffffff;
  text-align: left;
}
.demo-description { display: flex; align-items: baseline; flex-wrap: wrap; gap: 12px; }
.demo-description span { font-size: 12px; opacity: .9; }
.demo-controls { display: flex; flex-wrap: wrap; gap: 8px; }
.demo-controls button { cursor: pointer; }
@media (max-width: 600px) { .demo-toolbar { padding: 9px; } .demo-controls { width: 100%; } .demo-controls .btn { flex: 1; } }
</style>
