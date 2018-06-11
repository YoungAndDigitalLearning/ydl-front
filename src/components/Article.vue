<template>
<div class="wrapper">
  <div class="card article-clean">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="card-body intro">
      <h2 class="card-title">{{ article_entry.headline }}</h2>
        <p class="text-center">
          <span class="by">by</span>
          <a href="#">{{article_entry.author}}</a>
          <span class="date">Sept 8th, 2016 </span>
        </p>
        <img v-if="article_entry.image != ''" class="card-img-top" src="../assets/img/DSC00174.jpg" alt="Card image cap">
      <div class="card-text" v-html="article_entry.text"></div>
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
  background-color: rgba(197, 204, 5, 0.5);
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 25px;
}

.card {
  margin-bottom: 25px;
  width: 600px;
}
</style>
