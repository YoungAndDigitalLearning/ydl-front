<template>
  <div class="log-in-container">
    <div class="form-container">
      <div class="ydl-alert-box">
      <b-alert :show="dismissCountDown"
              dismissible
              variant="danger"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged">
        <p v-for="(error, index) in nonFieldErrors" :key="index">{{ error }}</p>
      </b-alert>
      </div>
      <div class="illustration">
        <i class="icon ion-ios-locked-outline"></i>
      </div>
      <form @submit.prevent="validateBeforeSubmit">
        <h2 class="sr-only">Login Form</h2>
        <div class="form-group">
          <input  v-model="form.username"
                  id="username"
                  v-validate="'required|alpha_dash'"
                  class="form-control"
                  type="text"
                  name="username"
                  required>
          <ydl-label inputID="username">Username</ydl-label>
          <span v-show="errors.has('username')"
                class="required">{{ errors.first("username") }}
          </span>
        </div>
        <div class="form-group">
          <input  v-model="form.password"
                  v-validate="'required'"
                  id="password"
                  class="form-control"
                  type="password"
                  name="password"
                  required>
          <ydl-label inputID="password">Password</ydl-label>
          <span v-show="errors.has('password')" class="required">{{ errors.first("password") }}</span>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" type="submit">Log In</button>
          <a class="btn btn-primary btn-block" href="/#/signup">Sign Up</a>
        </div>
        <a href="#" class="forgot">Forgot Password?</a>
      </form>
    </div>
  </div>
</template>

<script>
import FormLabel from "@/components/FormLabel"

export default {
  name: "LoginPage",
  data () {
    return {
      dismissSecs: 4,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      nonFieldErrors: [],
      form: {
        username: "",
        password: ""
      }
    }
  },
  components: {
    "ydl-label": FormLabel
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.authenticate()
          }
        })
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    authenticate () {
      this.$http.post("token-auth/", this.form)
        .then(response => {
          console.log(response.status === 200)
          if (response.status === 200) {
            if (!this.$session.exists()) {
              this.$sesssion.start()
              this.$localStorage.set("jwt", response.data.token)
              this.$localStorage.set("user", response.data.user)
              console.log("saved in localStorage (token): " + this.$localStorage.get("jwt"))
              console.log("saved in localStorage (user) : " + this.$localStorage.get("user"))
              console.log(response.data.token)
              this.$emit("successful-login")
              this.$router.push("/profile")
            }
          } else {
            alert(response.status)
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.nonFieldErrors = error.response.data.non_field_errors
            this.showAlert()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/fonts/ionicons.min.css";

@import "styles/global";

/* Alert Box */
.ydl-alert-box {
  position: fixed;
  top: 200px;
}

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

/* Login */
.log-in-container {
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
