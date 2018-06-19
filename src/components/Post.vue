<template>
<div class="container">
  <div class="post-header">
    <div>
      <span class="post-title">{{post.header.title}}</span>
    </div>
    <div>
      <span>{{post.header.date}}</span> <br>
      <span>By {{post.header.author}}</span>
    </div>
  </div>
  <div class="post-content">
    <p>{{post.content.text}}</p>
    <div class="post-footer">
      <a href="/#/post">Antworten</a>
      <span> | </span>
      <a href="/#/post">Melden</a>
    </div>
  </div>
  <div class="post-response">
    <div v-for="response in post.answers" v-bind:key="response.id">
      <div class="post-header">
        <div>
          <span class="post-title">Answer to {{post.header.title}}</span>
        </div>
        <div>
          <span>{{response.header.date}}</span> <br>
          <span>By {{response.header.author}}</span>
        </div>
      </div>
      <div class="post-content">
        <p>{{response.content.text}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Post",
  data () {
    return {
      post: {
        header: {
          title: "Hello World",
          date: "99.99.99",
          author: "peter"
        },
        content: {
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          data: ""
        },
        answers: [
          {
            header: {
              id: 0,
              date: "99.99.99",
              author: "heinz"
            },
            content: {
              text: "WAS HAST DU GESAGT??",
              data: ""
            },
            answers: []
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.container {
  width: 100%;
  border: 2px solid $ydl-primary;

  .post-header {
    background-color: $ydl-primary;
    display: flex;
    justify-content: space-between;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: 15px;

    div {
      span {
        color:white;
        padding: 15px;
      }

      .post-title {
        vertical-align: middle;
      }
    }
  }

  .post-content {
    border: 1px solid $ydl-primary;
    text-align: left;

    a {
      text-align: right;
    }
  }

  .post-response {
    margin-left: 50px;
  }
}
</style>
