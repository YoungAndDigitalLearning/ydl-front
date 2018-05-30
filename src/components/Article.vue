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
              <img v-if="articleEntry.image != ''" class="img-fluid" src="assets/img/desk.jpg">
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
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/Article-Clean.css";
</style>
