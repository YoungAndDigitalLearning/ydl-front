<template>
<div>
  <ydl-profileheadertext color="darkgreen">Profile Settings</ydl-profileheadertext>
  <div class="settings-container">
    <div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input class="form-control" v-validate="'required|alpha_dash'" id="username" type="text" name="username" v-model="user.username" required>
          <ydl-label inputID="username">Username</ydl-label>
          <span v-show="errors.has('username')" class="required">{{ errors.first("username") }}</span>
        </div>
        <div class="form-group">
          <input class="form-control" v-validate="'alpha_num'" id="first-name" type="text" name="first-name" v-model="user.first_name" required>
          <ydl-label inputID="first-name">First Name</ydl-label>
          <span v-show="errors.has('first-name')" class="required">{{ errors.first("first-name") }}</span>
          <span v-if="!user.first_name" class="required-optional">first name not provided</span>
        </div>
        <div class="form-group">
          <input class="form-control" v-validate="'alpha_num'" id="last-name" type="text" name="last-name" v-model="user.last_name" required>
          <ydl-label inputID="last-name">Last Name</ydl-label>
          <span v-show="errors.has('last-name')" class="required">{{ errors.first("last-name") }}</span>
          <span v-if="!user.first_name" class="required-optional">last name not provided</span>
        </div>
        <div class="form-group">
          <input class="form-control" v-validate="'required|email'" id="email" type="text" name="email" v-model="user.email" required>
          <ydl-label inputID="email">Email</ydl-label>
          <span v-show="errors.has('email')" class="required">{{ errors.first("email") }}</span>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" type="submit">Update</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import FormLabel from "@/components/FormLabel"
import { mapState } from "vuex"
import { axiosInstance } from "../store/actions"
import ProfileHeaderText from "@/components/ProfileHeaderText"

export default {
  name: "Settings",
  computed: mapState(["user"]),
  components: {
    "ydl-label": FormLabel,
    "ydl-profileheadertext": ProfileHeaderText
  },
  methods: {
    handleSubmit () {
      axiosInstance.put("users/" + this.user.id, this.user) // + this.user.id, this.user)
      // this.$router.push("/profile/" + this.user.id)
      this.$notify({
        title: "Profile Update",
        text: "successfully updated your user data",
        type: "success"
      })
    }
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
