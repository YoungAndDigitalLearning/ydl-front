<template>
  <div>
    <ydl-titleheader v-if="!embed" color="darkgreen">RESOURCES</ydl-titleheader>
    <div class="ydl-resource-container" id="resource-container">
      <div class="ydl-resource list-group-item" v-for="resource in resources" :key="resource.id">
        <div class="ydl-resource__entry"><div class="centered-text-ydl"><h5>{{resource.name}}</h5></div></div>
        <div class="ydl-resource__entry push-left"><div class="centered-text-ydl"><h5>{{resource.uploader_name}}</h5></div></div>
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
  name: "Resources",
  props: ["embed"],
  data () {
    return {
      moment: moment
    }
  },
  created () {
    this.$store.dispatch("getResources")
    this.embed = false
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

.list-group-item {
  border-radius: 0;
}

h5 {
  margin: 0px;
}

.push-left {
  margin-right: 20px;
}

.centered-text-ydl {
    height: 100%;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
}

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
