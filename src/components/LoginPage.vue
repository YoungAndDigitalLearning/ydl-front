<template>
  <div class="log-in-dark">
    <div class="form-container">
      <div class="illustration">
        <i class="icon ion-ios-locked-outline"></i>
      </div>
      <form @submit.prevent="authenticate">
        <h2 class="sr-only">Login Form</h2>
        <div class="form-group"><input v-model="form.username" class="form-control" type="text" name="username" placeholder="Benutzername"></div>
        <div class="form-group"><input v-model="form.password" class="form-control" type="password" name="password" placeholder="Passwort"></div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" type="submit">Log In</button>
          <a class="btn btn-primary btn-block" href="/#/signup">Konto erstellen</a>
        </div>
        <a href="#" class="forgot">Passwort vergessen</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "LoginPage",
  data () {
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    authenticate () {
      axios.post("http://35.185.239.7:2222/api/token-auth/", this.form)
        .then(response => {
          console.log(response)
          if (response.status === 200 && "token" in response.data) {
            this.$session.start()
            this.$session.set("jwt", response.data.token)
            console.log(response.data.token)
            this.$emit("successful-login")
            this.$router.push("/")
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/Login-Form-Dark.css";
@import "../assets/fonts/ionicons.min.css";

@import "../assets/fonts/ionicons.min.css";

// import all bootstrap sass files
@import "node_modules/bootstrap/scss/bootstrap";

/* Login */
.log-in-dark {
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
    border-bottom: 1px solid #434a52;
    border-radius: 0;
    outline: none;
    box-shadow: none;
    color: inherit;

    &:focus {
      border-color: #2980ef;
    }
  }

  .illustration {
    text-align: center;
    padding: 15px 0 20px;
    font-size: 100px;
    color: #2980ef;

    @include media-breakpoint-down(xs)
    {
      // reduce bottom padding
      padding-bottom: 10px;
      // make the logo smaller
      font-size: 80px;
    }

    @include media-breakpoint-only(sm)
    {
      // hide the logo in portrait mode
      font-size: 0px;
    }
  }
}
</style>
