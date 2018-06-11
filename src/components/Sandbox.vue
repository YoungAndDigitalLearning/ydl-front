<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1>Hello World</h1>
                <test v-on:message="receivedValue"></test>
            </div>
        </div>
    </div>
</template>

<script>
import Sandbox2 from "@/components/Sandbox2"

export default {
  name: "Sandbox",
  components: {
    test: Sandbox2
  },
  methods: {
    receivedValue () {
      console.log("received message")
    }
  }
}
</script>

<style lang="scss" scoped>
.col-12 {
    background-color: aqua;
}
</style>
