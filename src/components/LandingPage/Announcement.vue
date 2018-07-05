<template>
  <div class="card article-clean">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="card-body intro">
        <ydl-titleheader color="darkgreen">{{ article_entry.title }}</ydl-titleheader>
        <p class="text-center">
          <span class="by">by</span>
          <a href="#">{{ article_entry.author.username }}</a>
          <span class="date">{{moment(article_entry.date).format('DD.MM.YYYY, HH:mm')}}</span>
        </p>
        <img v-if="article_entry.image" class="card-img-top" :src="article_entry.image" alt="Card image cap">
      <div class="card-text" v-html="article_entry.content"></div>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/Util/TitleHeader"
var moment = require("moment")

export default {
  name: "Article",
  data () {
    return {
      moment: moment
    }
  },
  props: {
    article_entry: {
      type: Object,
      required: true
    }
  },
  components: {"ydl-titleheader": TitleHeader}
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/Article-Clean.css";
@import "styles/global";
@import "compass/css3";

.card {
  margin-bottom: 25px;
  margin: 0px 25px 20px 20px;
  width: 1000px;
  border: none;
  border-radius: 0px;
  @include box-shadow(0 0 15px 1px rgba(0,0,0,.23));

  @include media-breakpoint-down(lg) {
    width: 95%;
  }

  // add margin between author and header
  .card-body > p {
    margin-top: 10px;
  }
}
</style>
