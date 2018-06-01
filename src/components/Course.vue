<template>
    <a class="list-group-item list-group-item-action" href="www.google.de">
      <h4> {{course.title}} </h4>
      <div v-html="course.details"></div>
    </a>
</template>

<script>
export default {
  name: "Course",
  props: {
    course: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}
</style>
