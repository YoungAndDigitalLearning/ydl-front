<template>
  <div>
    <ydl-titleheader color="darkgreen">Create Course</ydl-titleheader>
    <div class="settings-container">
      <div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <input class="form-control" v-validate="'required|alpha_dash'" id="courseName" type="text" name="courseName" v-model="form.course.name" required>
            <ydl-label inputID="name">Name</ydl-label>
            <span v-show="errors.has('courseName')" class="required">{{ errors.first("courseName") }}</span>
          </div>
          <div class="form-group">
            <input class="form-control" v-validate="'required|alpha_dash'" id="name" type="text" name="name" v-model="form.course.description" required>
            <ydl-label inputID="name">Description</ydl-label>
            <span v-show="errors.has('name')" class="required">{{ errors.first("name") }}</span>
          </div>
          <div class="form-group">
            <input class="form-control" v-validate="'required'" id="name" type="text" name="name" v-model="form.course.deadline" required>
            <ydl-label inputID="name">Deadline</ydl-label>
            <span v-show="errors.has('name')" class="required">{{ errors.first("name") }}</span>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" type="submit">Create Course</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/Util/TitleHeader"
import FormLabel from "@/components/Util/FormLabel"

export default {
  name: "createcourse",
  data () {
    return {
      form: {
        course: {
          name: "",
          description: "",
          deadline: ""
        }
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch("createCourse", { data: this.form.course })
        .then(() => {
          console.log("1337")
          this.$router.push("/profile/6")
        })
    }
  },
  components: {
    "ydl-label": FormLabel,
    "ydl-titleheader": TitleHeader
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

/* Form Group */
// make form group position relative so an absolute child will be within this element
.form-group {
  position: relative;
}

// for the animation if input is selected
.form-control {
  &:focus + label, &:valid + label {
    transform: translateY(-100%);
    font-size: 75%;
  }
}

.container {
  padding-top: 50px;
  display: flex;
  justify-content: space-around;

  .figure {
    max-width: 250px;
    max-height: 250px;
  }
}

.ydl-btn {
  background-color: $ydl-primary;
  color: white;
}

.ydl-btn:hover {
  text-decoration: underline;
  font-size: 18px;
  transition: 200ms;
}

/* Login */
.settings-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 20px;

  /* contains the icons and the form */
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
    width: 350px;
    height: 500px;

    @include media-breakpoint-down(sm)
    {
      // make form container full screen
      width: 100%;
      height: 100%;
    }
  }

  .form-control {
    background: none;
    border: none;
    border-bottom: 1px solid $ydl-primary;
    border-radius: 0;
    outline: none;
    box-shadow: none;
    color: inherit;

    &:focus {
      border-color: $ydl-secondary;
    }
  }
}
</style>
