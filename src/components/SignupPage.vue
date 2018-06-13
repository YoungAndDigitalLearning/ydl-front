<template>
  <div class="sign-up-container">
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
        <i class="icon ion-android-create"></i>
      </div>
      <form @submit.prevent="handleSubmit">
        <h2 class="sr-only">Login Form</h2>
        <div class="form-group">
          <input class="form-control" v-validate="'required|alpha_dash'" id="username" type="text" name="username" v-model="form.username" required>
          <ydl-label inputID="username">Username</ydl-label>
          <span v-show="errors.has('username')" class="required">{{ errors.first("username") }}</span>
        </div>
        <div class="form-group">
          <input class="form-control" v-validate="'required'" data-vv-as="password" id="password1" type="password" name="password1" v-model="form.password" required>
          <ydl-label inputID="password1">Password</ydl-label>
          <span v-show="errors.has('password1')" class="required">{{ errors.first("password1") }}</span>
        </div>
        <div class="form-group">
          <input class="form-control" v-validate="{required: true, is: form.password}" data-vv-as="confirm password" id="password2" type="password" name="password2" required>
          <ydl-label inputID="password2">Confirm Password</ydl-label>
          <span v-show="errors.has('password2')" class="required">{{ errors.first("password2") }}</span>
        </div>
        <div class="form-group">
          <input class="form-control" v-validate="'required|email'" id="email" type="text" name="email" v-model="form.email" required>
          <ydl-label inputID="email">Email</ydl-label>
          <span v-show="errors.has('email')" class="required">{{ errors.first("email") }}</span>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FormLabel from "@/components/FormLabel"

export default {
  name: "SignupPage",
  data () {
    return {
      dismissSecs: 4,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      nonFieldErrors: [],
      form: {
        username: "",
        password: "",
        email: ""
      }
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.handleSubmit()
          }
        })
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    handleSubmit () {
      this.$http.post("users/", this.form)
        .then(response => {
          console.log(response.status)
          if (response.status === 201) {
            if (!this.$session.exists()) {
              this.$session.start()
              this.$session.set("user", response.data.username)
              this.$session.set("jwt", response.data.token)
              this.$emit("successful-login")
            }
            console.log(response.data)
            this.$router.push("/profile")
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.nonFieldErrors = error.response.data.non_field_errors
            this.showAlert()
          }
        })
    }
  },
  components: {"ydl-label": FormLabel}
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
