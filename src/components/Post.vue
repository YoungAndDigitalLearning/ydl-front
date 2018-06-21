<template>
<div class="col-10 container" v-bind:class="{bdr: !hasAnswers, mainbdr: mainThread}">
  <div class="main-post">
    <div class="header">
      <span class="title">{{post.header.title}}</span> <br>
      <span class="meta">{{post.header.author}}, {{post.header.date}}</span>
    </div>
    <div class="content">
      {{post.content.text}}
    </div>
    <div class="footer">
      <a href="#">Antworten</a>
      <span> | </span>
      <a href="#">Melden</a>
    </div>
  </div>
  <div class="answer">
    <ydl-post v-for="answer in post.answers" v-bind:key="answer.header.id" v-bind:post="answer"></ydl-post>
  </div>
</div>
</template>

<script>
import Post from "@/components/Post"
import axios from "axios"

export default {
  name: "ydl-post",
  props: ["post"],
  components: {
    "ydl-post": Post
  },
  data () {
    return {
      hasAnswers: this.post.answers.length === 0,
      mainThread: false
    }
  },
  mounted () {
    if (this.post === undefined) {
      console.log("post is undefined")
      axios.get("http://jsontest/forum/post.json")
        .then(respone => {
          console.log(respone.data)
          this.post = respone.data
          this.mainThread = true
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

  .container {
    display: block;
    border-collapse: collapse;
    margin: 0 0 10px 0;
    padding: 0;
    float: right;
  }

  .main-post {
    text-align: left;
    margin-bottom: 10px;
  }

  .answer {
    margin-top: 10px;
    margin-bottom: 10px;
    // margin-right: 5px;
  }

  .header {
    background-color: $ydl-primary;
    color: white;
    border-top-left-radius: 10px;
    // border-top-right-radius: 10px;

    .title {
      padding-left: 10px;
      padding-right: 10px;
      font-size: 22px;
    }

    .meta {
      padding-left: 10px;
      padding-right: 10px;
      font-size: 16px;
    }
  }

  .content {
    background-color: $ydl-primary-background;
    padding: 10px;
  }

  .footer {
    background-color: $ydl-primary;
    color: white;
    text-align: right;

    a {
      padding-left: 10px;
      padding-right: 10px;
      color:white;
    }
    a:hover {
      text-decoration: underline;
    }
  }

  .bdr {
    border-top: 2px solid $ydl-primary;
    border-left: 2px solid $ydl-primary;
    border-bottom: 2px solid $ydl-primary;
    // border-right: 2px solid $ydl-primary;
    border-top-left-radius: 12px;
  }

  .mainbdr {
    border-right: 2px solid $ydl-primary;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-top-right-radius: 10px;

  }
</style>
