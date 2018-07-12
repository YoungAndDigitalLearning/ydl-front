<template>
  <div>
    <ydl-titleheader color="darkgreen">CREATE RESOURCE</ydl-titleheader>
    <div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="resourceName">Name</label>
            <input class="form-control" v-validate="'required'" id="resourceName" type="text" name="resourceName" v-model="form.resource.name" required>
            <span v-show="errors.has('resourceName')" class="required">{{ errors.first("resourceName") }}</span>
          </div>
          <div class="form-group">
            <label for="resourceEffectiveFrom">Effective From</label>
            <input class="form-control" v-validate="'required|date_format'" id="resourceEffectiveFrom" type="datetime-local" name="resourceEffectiveFrom" v-model="form.resource.effective_from" required>
            <span v-show="errors.has('resourceEffectiveFrom')" class="required">{{ errors.first("resourceEffectiveFrom") }}</span>
          </div>
          <div class="form-group">
            <label for="expires">Expires</label>
            <input class="form-control" v-validate="'required|date_format'" id="expires" type="datetime-local" name="expires" v-model="form.resource.expires" required>
            <span v-show="errors.has('expires')" class="required">{{ errors.first("expires") }}</span>
          </div>
          <div class="form-group">
            <label for="file">File</label>
            <input class="form-control" v-validate="'required'" id="file" ref="file" type="file" name="file" v-on:change="fileChanged()" required>
            <span v-show="errors.has('file')" class="required">{{ errors.first("file") }}</span>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" type="submit">Create Resource</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/Util/TitleHeader"
import FormLabel from "@/components/Util/FormLabel"

export default {
  name: "createresource",
  data () {
    return {
      form: {
        resource: {
          name: "",
          effective_from: "",
          expires: "",
          content: ""
        }
      }
    }
  },
  components: {
    "ydl-titleheader": TitleHeader,
    "ydl-label": FormLabel
  },
  methods: {
    fileChanged () {
      console.log(this.$refs.file.files[0])
      this.form.resource.content = this.$refs.file.files[0]
    },
    handleSubmit () {
      let formData = new FormData()
      formData.append("name", this.form.resource.name)
      formData.append("effective_from", this.form.resource.effective_from)
      formData.append("expires", this.form.resource.expires)
      formData.append("content", this.form.resource.content)

      this.$store.dispatch("createResource", {data: formData})
    }
  }
}
</script>

<style lang="scss" scoped>
/* Form Group */
// make form group position relative so an absolute child will be within this element
.form-group {
  position: relative;
}

form {
  padding: 20px;
}

.top-padding {
  margin-top: 20px;
}

// for the animation if input is selected
.form-control {
  &:focus + label, &:valid + label {
    transform: translateY(-100%);
    font-size: 75%;
  }
}
</style>
