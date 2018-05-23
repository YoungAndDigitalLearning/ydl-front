<template>
  <aside class="profile-sidebar">
    <div class="djb-profile-picture">
      <img src="http://via.placeholder.com/64x64"/>
    </div>
    <div class="djb-profile-name">
      <p>Hans Peter</p>
    </div>
    <div class="djb-role">
      <p>(Student)</p>
    </div>
  </aside>
</template>

<script>
export default {
  name: "ProfileSidebar"
}
</script>

<style lang="scss" scoped>
.profile-sidebar {
  width: 100%;
  height: 100%;
  background-color: brown;
}

.djb-profile-picture {
  background-color: blue;
  padding: 5px;
}

.djb-profile-name {
  background-color: aquamarine;
  padding: 5px;

  > p {
    margin: 0;
  }
}

.djb-role {
  background-color: crimson;
  font-size: 0.8em;

  > p {
    margin: 0;
  }
}
</style>
