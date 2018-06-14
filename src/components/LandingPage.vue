<template>
<div class="background">
  <div class="landing-page">
    <h1 class="text-center text-primary">Young&Digital Learning</h1>
    <div class="ydl-article-container">
      <ydl-article v-for="article in articleEntries" v-bind:article_entry='article' v-bind:key="article.id"></ydl-article>
    </div>
  </div>
</div>
</template>

<script>
import Article from "@/components/Article"

export default {
  name: "MainPage",
  data () {
    return {
      articleEntries: []
    }
  },
  mounted () {
    this.$http.get("anouncements/")
      .then(response => {
        this.articleEntries = response.data
      })
  },
  components: {
    "ydl-article": Article
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.background {
    background-image: url("../assets/img/paper-1990111_1920.jpg");
    background-attachment: fixed;
}

.landing-page {
  background-color: rgba(7, 167, 218, 0.125);
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
}
</style>
