<template>
<div class="ydl-container">
  <div class="left-sidebar">
    <div class="navigation">
      <ydl-profileheadertext color="green" >NAVIGATION</ydl-profileheadertext>
    </div>
    <div class="recent-uploads">
      <ydl-profileheadertext>RECENT UPLOADS</ydl-profileheadertext>
    </div>
  </div>
  <div class="profile-content-container">
    <ydl-profileheadertext>SETTINGS</ydl-profileheadertext>
    <div class="profile-content">
    </div>
  </div>
  <div class="right-sidebar">
    <div class="navigation">
      <ydl-profileheadertext>EVENTS</ydl-profileheadertext>
    </div>
    <div class="recent-uploads">
      <ydl-profileheadertext>CALENDAR</ydl-profileheadertext>
    </div>
  </div>
</div>
</template>

<script>
import ProfileHeaderText from "@/components/ProfileHeaderText"

export default {
  name: "ProfilePage",
  components: {
    "ydl-profileheadertext": ProfileHeaderText
  }
}
</script>

<style lang="scss" scoped>
@import "compass/css3";

.ydl-container {
  margin: 20px;
  height: 100%;
  display: flex;
}

.navigation {
  width: 270px;
  height: 240px;
  background-color: #fff;
  @include box-shadow(0 0 15px 1px rgba(0,0,0,.23));
}

.recent-uploads {
  margin-top: 20px;
  width: 270px;
  height: 240px;
  background-color: #fff;
  @include box-shadow(0 0 15px 1px rgba(0,0,0,.23));
}

.profile-content-container {
  flex: 1;
  margin: 0 20px;
  background-color: #fff;
  @include box-shadow(0 0 15px 1px rgba(0,0,0,.23));
}

.left-sidebar {
  width: 270px;
  height: 100%;
  background-color: #fff;
}
</style>
