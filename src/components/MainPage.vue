<template>
  <div class="grids-container">
    <section class="djb-content">
      <content-section></content-section>
    </section>
    <section class="djb-profile-content">
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
  components: {
    "profile-sidebar": ProfileSidebar,
    "content-section": ContentSection
  }
}
</script>

<style scoped>
.grids-container {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
}

.djb-content {
  background-color: aqua;
  flex: 1;
  height: 500px;
  padding: 5px;
}

.djb-profile-content {
  background-color: deeppink;
  width: 300px;
  padding: 5px;
}

</style>
