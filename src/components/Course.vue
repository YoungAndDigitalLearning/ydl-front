<template>
  <li class="list-group-item">
  <h4> {{course.title}} </h4>
  <div v-html="course.details"></div>
  </li>
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

</style>
