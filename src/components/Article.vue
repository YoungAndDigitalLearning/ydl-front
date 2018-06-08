<template>
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

.card {
  margin-top: 25px;
  color: #ffffff;
  border-radius: 15px;
}

.card-img-top {
  height: 25%;
  width: 25%;
}

.card-text > p{
  color:#ffffff;

}

.card-img-top {
  border-radius: 0;
  margin-bottom: 25px;
}

p {
  color:#ffffff;
}

.text-center > p{
  color: #ffffff;
}
</style>
