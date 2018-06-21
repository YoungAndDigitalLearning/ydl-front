<template>
  <div class="container-fluid">
    <div class="header">
      <h1> Hello Chat </h1>
    </div>
    <div class="available-chats">
      Available Chats
    </div>
    <div class="chat-window">
      actual chat window
      <div class="test">
        Test
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat"
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.container-fluid {
  display: flex;
}

.header {
  background-color: blue;
}

.available-chats {
  background-color: green;
}

.chat-window {
  background-color: yellow;
}

.test {
  height: 1000px;
}
</style>
