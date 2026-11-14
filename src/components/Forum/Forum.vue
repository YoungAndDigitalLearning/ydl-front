<template>
  <section class="forum">
    <header class="forum-heading">
      <h1>Course Forum</h1>
      <p>Questions, resources and conversations from our language courses.</p>
    </header>

    <div v-if="loading" class="forum-status">Loading discussions…</div>
    <div v-else-if="error" class="forum-status error" role="alert">
      {{ error }}
    </div>
    <div v-else-if="!threads.length" class="forum-status">
      No discussions yet. Course conversations will appear here.
    </div>
    <div v-else class="post-list">
      <router-link
        v-for="thread in threads"
        :key="thread.id"
        :to="$route.path + '/post/' + thread.id"
        class="post-entry"
      >
        <div class="post-title">{{ thread.title }}</div>
        <p class="post-excerpt">{{ thread.text }}</p>
        <div class="post-meta">
          <span>{{ thread.author_name || "Course participant" }}</span>
          <span>{{ formatDate(thread.date) }}</span>
          <span>{{ replyCount(thread) }} replies</span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import api from "@/store/api"

export default {
  name: "forum",
  data () {
    return {
      loading: true,
      error: "",
      threads: []
    }
  },
  mounted () {
    api
      .get("posts/")
      .then((response) => {
        const posts = Array.isArray(response.data)
          ? response.data
          : response.data.results || []
        // Replies also exist as posts in Django. Display only root threads.
        const childIds = new Set()
        posts.forEach((post) => {
          (post.childs || []).forEach((id) => childIds.add(Number(id)))
        })
        this.threads = posts
          .filter((post) => !childIds.has(Number(post.id)))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      })
      .catch(() => {
        this.error = "Discussions could not be loaded. Please try again."
      })
      .then(() => {
        this.loading = false
      })
  },
  methods: {
    replyCount (thread) {
      return (thread.childs || []).length
    },
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
.forum {
  background: #f6f9fb;
  padding: 24px;
  text-align: left;
  min-height: 320px;
}
.forum-heading {
  margin-bottom: 20px;
}
.forum-heading h1 {
  font-size: 30px;
  margin: 0 0 6px;
  color: #223344;
}
.forum-heading p {
  margin: 0;
  color: #5a6876;
}
.post-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.post-entry {
  display: block;
  background: white;
  padding: 18px 22px;
  border-radius: 6px;
  border-left: 4px solid $ydl-primary;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: #223344;
}
.post-entry:hover {
  text-decoration: none;
  background: #fbfdff;
}
.post-title {
  font-weight: 600;
  font-size: 19px;
  color: $ydl-primary;
}
.post-excerpt {
  margin: 8px 0;
  color: #34495e;
}
.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  font-size: 12px;
  color: #6a7785;
}
.forum-status {
  padding: 24px;
  background: white;
  border-radius: 6px;
}
.error {
  color: #b23b3b;
}
</style>
