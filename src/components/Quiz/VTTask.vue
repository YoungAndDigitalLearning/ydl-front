<template>
<div class="container-fluid">
  <h5>{{task.question}}</h5>
    <input type="textfield" v-model="task.answer"> <br>
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
