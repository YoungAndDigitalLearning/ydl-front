<template>
  <div>
    <ydl-titleheader color="pink">RESOURCES</ydl-titleheader>
    <div class="ydl-resource-container" id="resource-container">
      <div class="ydl-resource" v-for="resource in resources" :key="resource.id">
        <div class="ydl-resource__entry" >{{resource.name}}</div>
        <div class="ydl-resource__entry" >{{resource.uploader_name}}</div>
        <div class="ydl-resource__entry"><div class="btn btn-primary" @click="copyToClipboard(resource.content)"><fa-icon icon="link"/></div></div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/Util/TitleHeader"
import { mapState } from "vuex"
var moment = require("moment")

export default {
  name: "resources",
  data () {
    return {
      moment: moment
    }
  },
  created () {
    this.$store.dispatch("getResources")
  },
  computed: mapState({
    resources: state => state.api.resources
  }),
  components: {
    "ydl-titleheader": TitleHeader
  },
  methods: {
    copyToClipboard (link) {
      let resourceLink = document.createElement("input")
      resourceLink.style = "position: absolute; left: -1000px; top: -1000px"
      resourceLink.value = link
      document.body.appendChild(resourceLink)
      resourceLink.select()
      document.execCommand("copy")
      document.body.removeChild(resourceLink)

      this.$notify({
        title: "Copied Link!",
        text: link,
        type: "success"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ydl-resource {
  display: flex;
  flex-direction: row;

  &__entry {
    padding: 5px;

    &:first-child {
      flex: 1;
    }
  }
}
</style>
