<template>
  <div class="sign-up-container">
    <div class="form-container">
      <div class="illustration">
        <i class="icon ion-android-create"></i>
      </div>
      <form @submit.prevent="handleSubmit">
        <h2 class="sr-only">Login Form</h2>
        <div class="form-group">
          <input class="form-control" type="text" name="username" placeholder="Username" required v-model="user.username">
        </div>
        <div class="form-group">
          <input class="form-control" type="email" name="email" placeholder="Email">
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "SignupPage",
  data () {
    return {
      user: {
        username: "",
        password: ""
      },
      response: {}
    }
  },
  methods: {
    handleSubmit () {
      axios.post("http://35.185.239.7:2222/api/users/", this.user).then(Response => {
        console.log(Response.status)
        if (Response.status === 201) {
          this.$router.push("/profile")
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/fonts/ionicons.min.css";

@import "styles/global";

/* Signup */
.sign-up-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

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

  .illustration {
    text-align: center;
    padding: 15px 0 20px;
    font-size: 100px;
    color: $ydl-primary;

    @include media-breakpoint-down(xs) {
      // reduce bottom padding
      padding-bottom: 10px;
      // make the logo smaller
      font-size: 80px;
    }

    @include media-breakpoint-only(sm) {
      // hide the logo in portrait mode
      font-size: 0px;
    }
  }
}
</style>
