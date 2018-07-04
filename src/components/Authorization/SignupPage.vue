<template>
  <div class="sign-up-container">
    <div class="form-container">
      <ydl-profileheadertext color="darkgreen">New Account</ydl-profileheadertext>
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
          <button class="btn btn-primary btn-block" type="submit">
            <span v-if="signupPending"><fa-icon icon="spinner" spin/></span>
            <span v-else>Sign Up</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FormLabel from "@/components/Util/FormLabel"
import TitleHeader from "@/components/Util/TitleHeader"
import { mapState } from "vuex"

export default {
  name: "SignupPage",
  data () {
    return {
      form: {
        username: "",
        password: "",
        email: ""
      }
    }
  },
  computed: mapState(["signupPending", "user"]),
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.handleSubmit()
          }
        })
    },
    handleSubmit () {
      console.log("signup user")
      this.$store.dispatch("signup", this.form)
        .then(() => {
          this.$router.push("profile/" + this.user.id + "/courses/")
        })
    }
  },
  components: {
    "ydl-label": FormLabel,
    "ydl-profileheadertext": TitleHeader
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/fonts/ionicons.min.css";

@import "styles/global";

.btn {
  border-radius: 0px;
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
    // flex-direction: column;
    // justify-content: center;
    flex-wrap: wrap;
    padding: 40px;
    width: 350px;
    height: 500px;
    background-color: white;

    @include media-breakpoint-down(sm)
    {
      // make form container full screen
      width: 100%;
      height: 100%;
    }

    > form {
      align-self: flex-end;
      width: 100%;
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
