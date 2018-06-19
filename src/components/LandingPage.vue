<template>
  <div class="landing-page">
    <h1 class="text-center text-primary">Young&Digital Learning</h1>
    <div class="ydl-article-container">
      <ydl-article v-for="article in articleEntries" v-bind:article_entry='article' v-bind:key="article.id"></ydl-article>
    </div>
  </div>
</template>

<script>
import Announcement from "@/components/Announcement"

export default {
  name: "MainPage",
  data () {
    return {
      articleEntries: []
    }
  },
  mounted () {
    this.$http.get("announcements/")
      .then(response => {
        this.articleEntries = response.data
      })
      .catch(error => {
        this.$notify({
          title: error.response.statusText,
          text: error.message,
          type: "error"
        })
      })
  },
  components: {
    "ydl-article": Announcement
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.landing-page {
  background-color: rgba(7, 167, 218, 0.125);
  height: 100%;
}

@include media-breakpoint-down(sm)
{
  .no-padding {
    padding: 0px;
  }
}

.ydl-article-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.text-center {
  padding: 30px;
  padding-top: 50px;
}
</style>
