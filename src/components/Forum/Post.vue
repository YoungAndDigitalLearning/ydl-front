<template>
  <article class="discussion">
    <h1 v-if="mainThread" class="discussion-title">{{ post.title }}</h1>
    <div class="post-card">
      <div class="post-header">
        <strong>{{ post.author_name || "Course participant" }}</strong>
        <span>{{ formatDate(post.date) }}</span>
      </div>
      <div class="post-content">{{ post.text }}</div>
    </div>
    <section v-if="mainThread" class="replies">
      <h2>Replies ({{ replies.length }})</h2>
      <div v-if="!replies.length" class="empty-replies">No replies yet.</div>
      <ydl-post v-for="reply in replies" :key="reply.id" :post="reply" />
    </section>
  </article>
</template>

<script>
export default {
  name: "ydl-post",
  props: {
    post: { type: Object, required: true },
    replies: { type: Array, default: () => [] },
    mainThread: { type: Boolean, default: false }
  },
  methods: {
    formatDate (value) {
      if (!value) return ""
      return new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";
.discussion {
  width: 100%;
}
.discussion-title {
  font-size: 27px;
  color: #223344;
  margin: 0 0 16px;
}
.post-card {
  background: white;
  border-radius: 6px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.post-header {
  background: $ydl-primary;
  color: white;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.post-header span {
  font-size: 12px;
  opacity: 0.9;
}
.post-content {
  padding: 20px 16px;
  white-space: pre-line;
  line-height: 1.6;
  color: #263849;
}
.replies {
  padding: 8px 0 0 22px;
}
.replies h2 {
  font-size: 20px;
  color: #263849;
  margin-bottom: 12px;
}
.empty-replies {
  color: #667;
  padding: 15px;
  background: white;
}
</style>
