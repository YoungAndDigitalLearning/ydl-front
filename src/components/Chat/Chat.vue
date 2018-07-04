<template>
  <div>
    <div>
      <ydl-profileheadertext color="darkgreen">SKB Messenger</ydl-profileheadertext>
    </div>
    <div class="chat-content">
      <div class="available-chats">
        <ul class="list-group" v-for="contact in messenger.availablechats" v-bind:key="contact.id">
          <!-- TODO: prevent redirection if link is clicked -->
          <a class="list-group-item" href="/#/profile/6/chat" @click="loadChat(contact.id)">{{contact.name}}</a>
        </ul>
      </div>
      <div class="chat-window">
        <ul class="list-group">
          <div class="message-wrapper" v-for="message in chat.messages" v-bind:key="message.time">
            <li v-if="message.from === userId" class="list-group-item message message-me">
              <span class="message-text">{{ message.text }}</span> <br>
              <span class="message-time">{{ message.time }}</span>
            </li>
            <li v-else class="list-group-item message message-their">
              <span class="message-text">{{ message.text }}</span> <br>
              <span class="message-time">{{ message.time }}</span>
            </li>
          </div>
        </ul>
        <div class="input">
          <textarea class="message-type" type="text" name="message" rows="2" placeholder="Schreibe eine Nachricht"></textarea>
          <input class="send" type="button" value="Senden">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeaderText from "@/components/Profile/ProfileHeaderText"

export default {
  name: "Chat",
  components: {
    "ydl-profileheadertext": ProfileHeaderText
  },
  data () {
    return {
      messenger: {
        "availablechats": [
          {
            "id": 0,
            "name": "Petra"
          },
          {
            "id": 1,
            "name": "Waltraud"
          },
          {
            "id": 2,
            "name": "Heinz"
          },
          {
            "id": 3,
            "name": "Hugo"
          },
          {
            "id": 4,
            "name": "Walter"
          },
          {
            "id": 5,
            "name": "Paul"
          },
          {
            "id": 6,
            "name": "Paula"
          }]},
      chat: {
        "chatname": "petra",
        "groupchat": "false",
        "participants": [
          {
            "id": 6,
            "name": "peter"
          },
          {
            "id": 0,
            "name": "petra"
          }
        ],
        "messages": [
          {
            "from": 5,
            "time": "xx.xx.xx aa:aa",
            "text": "Hallo Peter"
          },
          {
            "from": 6,
            "time": "xx.xx.xx aa:aa",
            "text": "Hallo Petra"
          },
          {
            "from": 5,
            "time": "xx.xx.xx aa:aa",
            "text": "Wie geht es dir denn?"
          },
          {
            "from": 6,
            "time": "xx.xx.xx aa:aa",
            "text": "Ganz gut. Und dir?"
          },
          {
            "from": 5,
            "time": "xx.xx.xx aa:aa",
            "text": "Auch gut. Sag mal, hast du die Hausaufgabe nummer 8 in Theologie verstanden und könntest mir dabei helfen?"
          },
          {
            "from": 6,
            "time": "xx.xx.xx aa:aa",
            "text": "Ja die hab ich verstanden. Ich kann sie dir morgen gerne erklären."
          },
          {
            "from": 5,
            "time": "xx.xx.xx aa:aa",
            "text": "Das wäre echt sehr nett von Dir, danke."
          },
          {
            "from": 6,
            "time": "xx.xx.xx aa:aa",
            "text": "Kein Thema. Komme einfach um 22:00 Uhr in den dunklen Keller, dann kann ich dir alles genau erklären."
          }
        ]
      },
      userId: 6,
      loading: false
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
  margin-top: 5px;
  padding-right: 5px;
}

.chat-window {
  flex-grow: 4;
}

.chat-content {
  display: flex;
}

.message {
  max-width: 49%;
  margin: 5px;
  border-radius: 25px;
  padding: 0 5px 0 5px;
}
.message-me {
  float: right;
  text-align: right;
  background-color: lightgreen;
}
.message-their {
  float: left;
  text-align: left;
  background-color: lightgray;
}
.message-wrapper {
  border-radius: 25px;
}
.message-time {
  float: right;
  vertical-align: bottom;
  font-size: 14px;
  color: grey;
}
.message-text {
  float: left;
  vertical-align: top;
}
.message-type {
  width: 100%;
  border-radius: 5px;
  vertical-align: bottom;
  margin: 5px;
  padding: 2px;
  resize: none;
}
.send {
  height: 50px;
}
.input {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
