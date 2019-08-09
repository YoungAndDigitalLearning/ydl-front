<template>
  <div class="landing-page">
    <img style="padding-top: 30px;" src="@/assets/img/YDL-Logo.svg" height="250" alt="YDL-Logo">
    <h1 class="text-center">Young&Digital Learning</h1>
    <div class="ydl-article-container">
      <ydl-article v-for="announcement in this.announcements" v-bind:article_entry='announcement' v-bind:key="announcement.id"></ydl-article>
    </div>
    <h2 class="announcements">Announcements</h2>
    <div class="announcements-container">
      <div class="announcement-container">
        <div class="announcement-header">
          Website address
        </div>
        <div>
          <p class="announcements-by">by Admin | 09.08.2019 16:43</p>
        </div>
        <div class="announcement-text">
          Updated Website address: <a href="https://younganddigitallearning.github.io/ydl-front/">younganddigitallearning.github.io/ydl-front</a>
        </div>
      </div>
      <div class="announcement-container">
        <div class="announcement-header">
          Important news
        </div>
        <div>
          <p class="announcements-by">by Admin | 09.08.2019 14:32</p>
        </div>
        <div class="announcement-text">
          Only Frontend (website) is online. Backend is currently not set up and offline.
        </div>
      </div>
      <div class="announcement-container">
        <div class="announcement-header">
          Website info
        </div>
        <div>
          <p class="announcements-by">by Admin | 08.08.2019 23:10</p>
        </div>
        <div class="announcement-text">
          Website is now hosted by github pages.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Announcement from "@/components/LandingPage/Announcement"
// import { mapState } from "vuex"

export default {
  name: "LandingPage",
  // computed: mapState({
  //   announcements: state => state.api.announcements
  // }),
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

.announcements-container {
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 5%;
}

.announcement-container {
  background-color: white;
  padding-top: 2%;
  padding-bottom: 2%;
  margin-bottom: 20px;
}

.announcement-header {
  background-color: $dark-green;
  color: white;
  font-weight: bold;
  font-size: 15pt;
  margin-left: 2%;
  margin-right: 2%;
  padding-top: 5px;
  padding-bottom: 5px;
  // margin-top: 3%;
  // margin-top: 20px;
}

.announcement-text {
  color: black;
  // font-size: 15pt;
  margin-left: 2%;
  margin-right: 2%;
}

.announcements {
  color: white;
  margin-top: 15px;
}

.announcements-author {
  color: rgb(30,30,30);
  white-space: nowrap;
}

.announcements-by {
  color: rgb(120,120,120);
  font-style: italic;
  white-space: nowrap;
}

.announcement-date {
  color: rgb(80,80,80);
  white-space: nowrap;
}

</style>
