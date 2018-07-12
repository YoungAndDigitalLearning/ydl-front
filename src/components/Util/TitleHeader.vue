<template>
  <div :class="'ydl-' + color">
    <p><slot></slot></p>
  </div>
</template>

<script>
export default {
  name: "TitleHeader",
  props: ["color"]
}
</script>

<style lang="scss" scoped>
@import "compass/css3";

div {
  width: 100%;
  > p {
    font-family: "Source Sans Pro";
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    margin: 0px;
    padding: 5px;
    height: 100%;
    @include text-shadow(0 3px 1px rgba(0,0,0,.23));
  }
}

.ydl-green {
  background-color: #d0d705;
}

.ydl-darkgreen {
  background-color: #3cb878;
}

.ydl-blue {
 background-color: #07a7da;
}

.ydl-pink {
  background-color: #e94584;
}

.ydl-orange {
  background-color: #edb53c;
}
</style>
