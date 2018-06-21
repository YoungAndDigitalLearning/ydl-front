<template>
  <div class="container-fluid" v-if="!loading">
    <div>
      <ydl-profileheadertext color="darkgreen">Hello Chat</ydl-profileheadertext>
    </div>
    <div class="chat-content">
      <div class="available-chats">
        <ul class="list-group" v-for="chat in messenger.availablechats" v-bind:key="chat.id">
          <!-- TODO: prevent redirection if link is clicked -->
          <a class="list-group-item" href="/#/profile/6/chat" @click="loadChat(chat.id)">{{chat.name}}</a>
        </ul>
      </div>
      <div class="chat-window">
        actual chat window
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeaderText from "@/components/ProfileHeaderText"
import axios from "axios"

export default {
  name: "Chat",
  components: {
    "ydl-profileheadertext": ProfileHeaderText
  },
  data () {
    return {
      messenger: {},
      chat: {},
      userId: 0,
      loading: true
    }
  },
  mounted () {
    axios.get("http://jsontest/messenger/chat.json")
      .then(response => {
        console.log(response.data)
        this.messenger = response.data
        this.loading = false
      })
  },
  methods: {
    loadChat (id) {
      console.log(id)
      this.loading = true
      axios.get("http://jsontest/messenger/" + id + ".json")
        .then(response => {
          console.log(response.data)
          this.chat = response.data
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.container-fluid {
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
  padding: 0;
}

.available-chats {
  flex-grow: 1;
  border-right: 3px solid #3cb878;
}

.chat-window {
  flex-grow: 4;
}

.chat-content {
  display: flex;
}

.test {
  height: 1000px;
}
</style>
