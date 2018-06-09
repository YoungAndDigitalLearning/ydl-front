<template>
  <nav class="navbar navbar-expand-lg navbar-primary bg-secondary fixed-top">
    <a class="navbar-brand" href="#">Y&D Learning</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/#/signup"><fa-icon icon="edit" /> Sign In</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#/login"><fa-icon icon="unlock" /> Login</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.navbar {
  height: $ydl-header-height;
}
</style>
