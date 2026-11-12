<template>
  <section class="post-wrapper">
    <div v-if="loading" class="status">Loading discussion…</div>
    <div v-else-if="error" class="status error" role="alert">{{ error }}</div>
    <div v-else>
      <router-link
        :to="'/profile/' + $route.params.id + '/courses/forum'"
        class="back-link"
      >
        ← Back to course forum
      </router-link>
      <ydl-post
        v-if="thread"
        :post="thread"
        :replies="replies"
        :main-thread="true"
      />
    </div>
  </section>
</template>

<script>
import api from "@/store/api";
import Post from "@/components/Forum/Post";

export default {
  name: "PostWrapper",
  components: { "ydl-post": Post },
  data() {
    return { thread: null, replies: [], loading: true, error: "" };
  },
  mounted() {
    this.loadThread();
  },
  watch: {
    "$route.params.pid": "loadThread",
  },
  methods: {
    loadThread() {
      this.loading = true;
      this.error = "";
      api
        .get("posts/")
        .then((response) => {
          const posts = Array.isArray(response.data)
            ? response.data
            : response.data.results || [];
          const children = new Set();
          posts.forEach((post) =>
            (post.childs || []).forEach((id) => children.add(Number(id))),
          );
          const roots = posts
            .filter((post) => !children.has(Number(post.id)))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          // Legacy /post/0 links resolve to the first available demo thread.
          const requested = Number(this.$route.params.pid);
          const selected =
            requested === 0
              ? roots[0]
              : roots.find((post) => Number(post.id) === requested);
          if (!selected) {
            this.error = "This discussion does not exist.";
            return;
          }
          this.thread = selected;
          this.replies = (selected.childs || [])
            .map((id) => posts.find((post) => Number(post.id) === Number(id)))
            .filter(Boolean);
        })
        .catch(() => {
          this.error = "The discussion could not be loaded.";
        })
        .then(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles/global";
.post-wrapper {
  padding: 24px;
  background: #f6f9fb;
  text-align: left;
  min-height: 260px;
}
.back-link {
  display: inline-block;
  margin-bottom: 18px;
  color: $ydl-primary;
}
.status {
  padding: 20px;
  background: white;
  border-radius: 6px;
}
.error {
  color: #b23b3b;
}
</style>
