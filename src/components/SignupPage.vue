<template>
  <div class="sign-up-dark">
    <div class="form-container">
      <div class="illustration">
        <i class="icon ion-android-create"></i>
      </div>
      <form @submit.prevent="handleSubmit">
        <h2 class="sr-only">Login Form</h2>
        <div class="form-group"><input class="form-control" type="text" name="titel" placeholder="Titel"></div>
        <div class="form-row">
          <div class="form-group col-md-6"><input class="form-control" type="text" name="vorname" placeholder="Vorname"></div>
          <div class="form-group col-md-6"><input class="form-control" type="text" name="nachname" placeholder="Nachname"></div>
        </div>
        <div class="form-group"><input class="form-control" type="text" name="username" placeholder="Username" required v-model="user.username"></div>
        <div class="form-group"><input class="form-control" type="password" name="password1" placeholder="Password" required v-model="user.password"></div>
        <div class="form-group"><input class="form-control" type="password" name="password2" placeholder="Confirm Password"></div>
        <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email"></div>
        <div class="form-group"><input class="form-control" type="text" name="address" placeholder="Address"></div>
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

/* Signup */
.sign-up-dark {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  form {
    .btn-primary {
      background-color: #214a80;
      border: none;
      padding: 11px;
    }
  }

  /* contains the icons and the form */
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color:#1e2833;
    padding: 40px;

  }

  .form-control {
    background: none;
    border: none;
    border-bottom: 1px solid #434a52;
    border-radius: 0;
    outline: none;
    box-shadow: none;
    color: inherit;

    &:focus {
      border-color: #2980ef;
    }
  }

  .close-button {
    flex: 1;
    align-self: flex-end;
    font-size: 32px;
    color: white;

    &:hover {
      color: #e03131;
      transition: 250ms;
    }
  }

  .illustration {
    text-align: center;
    padding: 15px 0 20px;
    font-size: 100px;
    color: #2980ef;
  }
}
</style>
