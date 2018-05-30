<template>
  <div id="landing_article" class="article-clean">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
          <div class="intro">
            <h1 class="text-center"> {{ article_entry.headline }} </h1>
              <p class="text-center">
                  <span class="by">by</span>
                  <a href="#">{{article_entry.author}}</a>
                  <span class="date">Sept 8th, 2016 </span>
              </p>
              <img v-if="article_entry.image != ''" class="img-fluid" v-bind:src="article_entry.image">
            </div>
          <div v-html="article_entry.text" class="text"></div>
        </div>
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
</style>
