<template>
  <div class="djb-container">
    <section class="djb-content">
      <div class="djb-profile-button" v-on:click="toggleProfile"></div>
      <content-section></content-section>
    </section>
    <section v-if="sprofile" transition="slide-toggle" class="djb-profile-content">
      <profile-sidebar></profile-sidebar>
    </section>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import ProfileSidebar from "@/components/ProfileSidebar"
import ContentSection from "@/components/ContentSection"

export default {
  name: "MainPage",
  data () {
    return {
      "sprofile": true
    }
  },
  methods: {
    toggleProfile () {
      this.sprofile = !this.sprofile
    }
  },
  components: {
    "profile-sidebar": ProfileSidebar,
    "content-section": ContentSection
  }
}
</script>

<style lang="scss" scoped>
.djb-container {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  height: 100%;
}

.djb-content {
  background-color: aqua;
  flex: 1;
  height: 100%;
  padding: 5px;
}

.djb-profile-content {
  background-color: deeppink;
  width: 350px;
  padding: 5px;
}

.djb-profile-button {
  background-color: chartreuse;
  float: right;
  margin: 5px;
  height: 32px;
  width: 32px;
}

.slide-toggle {
  &-enter {
    transform: translateX(350px);
  }
}
</style>
