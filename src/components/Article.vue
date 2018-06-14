<template>
<div class="wrapper">
  <div class="card article-clean">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="card-body intro">
      <h2 class="card-title">{{ article_entry.title }}</h2>
        <p class="text-center">
          <span class="by">by</span>
          <a href="#">{{ article_entry.author.username }}</a>
          <span class="date">{{article_entry.date}}</span>
        </p>
        <img v-if="article_entry.image != ''" class="card-img-top" :src="article_entry.image" alt="Card image cap">
      <div class="card-text" v-html="article_entry.content"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Article",
  props: {
    article_entry: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/Article-Clean.css";

.wrapper {
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 25px;
}

.card {
  margin-bottom: 25px;
  width: 600px;
}
</style>
