<template>
  <div id="landing_article" class="article-clean">
    <p> {{ articleEntry }} </p>
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
          <div class="intro">
            <h1 class="text-center"> {{ articleEntry.headline }} </h1>
              <p class="text-center">
                  <span class="by">by</span>
                  <a href="#">{{articleEntry.author}}</a>
                  <span class="date">Sept 8th, 2016 </span>
              </p>
<<<<<<< HEAD
              <img v-if="article_entry.image != ''" class="img-fluid" src="article_entry.image">
=======
              <img v-if="articleEntry.image != ''" class="img-fluid" src="assets/img/desk.jpg">
>>>>>>> 2fc065413e5a5c1f1acaf9dbb23fc27ba3e8196a
            </div>
          <div v-html="articleEntry.text" class="text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
<<<<<<< HEAD
  props: {
    article_entry: {
      type: Object,
      required: true
    }
=======
  data () {
    return {
      articleEntry: {}
    }
  },
  created: function () {
    console.log("Hello World")
    this.$http.get("http://localhost/article.json")
      .then(function (response) {
        console.log(response.data)
      })
>>>>>>> 2fc065413e5a5c1f1acaf9dbb23fc27ba3e8196a
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/Article-Clean.css";
</style>
