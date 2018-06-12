<template>
    <transition name="move" appear>
        <label :for="inputID"><slot></slot></label>
    </transition>
</template>

<script>
export default {
  name: "FormLabel",
  props: {
    inputID: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
label {
  position: absolute;
  color: #444444;
  // manual fit to the placeholder position
  left: 12px;
  top: 6px;

  // enable transition for top
  transition: all 0.5s;
  // disable hover events etc
  pointer-events: none;
}
</style>
