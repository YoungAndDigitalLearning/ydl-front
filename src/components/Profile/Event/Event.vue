<template>
  <div>
    <div>{{event.matter}}</div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "event",
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
