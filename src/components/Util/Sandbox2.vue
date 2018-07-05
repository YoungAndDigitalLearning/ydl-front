<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <button v-on:click="$emit('message')"> Emit </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Sandbox2"
}
</script>

<style lang="scss" scoped>

</style>
