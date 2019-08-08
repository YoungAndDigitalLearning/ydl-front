<template>
  <div class="landing-page">
    <img style="padding-top: 30px;" src="@/assets/img/YDL-Logo.svg" height="250" alt="YDL-Logo">
    <h1 class="text-center">Young&Digital Learning</h1>
    <div class="ydl-article-container">
      <ydl-article v-for="announcement in this.announcements" v-bind:article_entry='announcement' v-bind:key="announcement.id"></ydl-article>
    </div>
  </div>
</template>

<script>
import Announcement from "@/components/LandingPage/Announcement"
import { mapState } from "vuex"

export default {
  name: "LandingPage",
  computed: mapState({
    announcements: state => state.api.announcements
  }),
  mounted () {
    console.log("dispatch announcements")
    this.$store.dispatch("getAnnouncements")
  },
  components: {
    "ydl-article": Announcement
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

@include media-breakpoint-down(sm)
{
  .no-padding {
    padding: 0px;
  }
}

.ydl-article-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.text-center {
  padding: 30px;
  color: white;
}
</style>
