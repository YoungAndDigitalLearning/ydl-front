<template>
  <div class="center">
    <ydl-post></ydl-post>
  </div>
</template>

<script>
import Post from "@/components/Post"

export default {
  name: "PostWrapper",
  components: {
    "ydl-post": Post
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.center {
  display: flex;
  justify-content: space-around;
  border-collapse: collapse;
  padding: 25px;
}
</style>
