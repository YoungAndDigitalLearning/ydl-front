<template>
<div class="container-fluid">
  <h5>{{task.question}}</h5>
    <input type="textfield"> <br>
  <hr>
</div>
</template>

<script>

export default {
  name: "VTTask",
  props: ["task"]

}
</script>

<style lang="scss" scoped>

</style>
