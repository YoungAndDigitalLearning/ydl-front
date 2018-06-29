<template>
<div class="forum">
  <h1>Hello Forum</h1>
  <div class="container post-list">
    <ul class="list-group" v-for="post in forum.posts" v-bind:key="post.header.id">
      <a class="list-group-item post-entry">
        <span class="title">{{post.header.title}}</span> <br>
        <span class="meta">{{post.header.author}}, {{post.header.date}}</span>
      </a>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "forum",
  data () {
    return {
      forum: {
        posts: [
          {
            header: {
              id: "0",
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
                  id: "0-0",
                  tilte: "Re: Hello World",
                  date: "99.99.99",
                  author: "heinz"
                },
                content: {
                  text: "WAS HAST DU GESAGT??",
                  data: ""
                },
                answers: []
              },
              {
                header: {
                  id: "0-0",
                  tilte: "Re: Hello World",
                  date: "99.99.99",
                  author: "heinz"
                },
                content: {
                  text: "Test Test Test Test Test Test Test",
                  data: ""
                },
                answers: [
                  {
                    header: {
                      id: "0-0",
                      tilte: "Re: Hello World",
                      date: "99.99.99",
                      author: "heinz"
                    },
                    content: {
                      text: "Genug getestet, reicht fü heute !!",
                      data: ""
                    },
                    answers: []
                  }
                ]
              }
            ]
          },
          {
            header: {
              id: "0",
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
                  id: "0-0",
                  tilte: "Re: Hello World",
                  date: "99.99.99",
                  author: "heinz"
                },
                content: {
                  text: "WAS HAST DU GESAGT??",
                  data: ""
                },
                answers: []
              },
              {
                header: {
                  id: "0-0",
                  tilte: "Re: Hello World",
                  date: "99.99.99",
                  author: "heinz"
                },
                content: {
                  text: "Test Test Test Test Test Test Test",
                  data: ""
                },
                answers: [
                  {
                    header: {
                      id: "0-0",
                      tilte: "Re: Hello World",
                      date: "99.99.99",
                      author: "heinz"
                    },
                    content: {
                      text: "Genug getestet, reicht fü heute !!",
                      data: ""
                    },
                    answers: []
                  }
                ]
              }
            ]
          },
          {
            header: {
              id: "1",
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
                  id: "1-0",
                  tilte: "Re: Hello World",
                  date: "99.99.99",
                  author: "heinz"
                },
                content: {
                  text: "WAS HAST DU GESAGT??",
                  data: ""
                },
                answers: []
              },
              {
                header: {
                  id: "1-1",
                  tilte: "Re: Hello World",
                  date: "99.99.99",
                  author: "heinz"
                },
                content: {
                  text: "Test Test Test Test Test Test Test",
                  data: ""
                },
                answers: [
                  {
                    header: {
                      id: "1-1-0",
                      tilte: "Re: Hello World",
                      date: "99.99.99",
                      author: "heinz"
                    },
                    content: {
                      text: "Genug getestet, reicht fü heute !!",
                      data: ""
                    },
                    answers: []
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .forum {
    background-color: lightblue;

    .post-list {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: left;

      .title {
        font-size: 18px;
      }

      .meta {
        font-size: 12px;
      }
    }
    .post-entry {
      margin-bottom: 10px;
    }
  }
</style>
