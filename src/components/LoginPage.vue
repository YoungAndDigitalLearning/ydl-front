<template>
  <div class="log-in-container">
    <div class="form-container">
      <ydl-profileheadertext color="darkgreen">Login to SKB</ydl-profileheadertext>
      <form @submit.prevent="validateBeforeSubmit">
        <h2 class="sr-only">Login Form</h2>
        <div class="form-group">
          <input v-model="form.username" id="username" v-validate="'required|alpha_dash'" class="form-control" type="text" name="username" required>
          <ydl-label inputID="username">Username</ydl-label>
          <span v-show="errors.has('username')" class="required">{{ errors.first("username") }}
          </span>
        </div>
        <div class="form-group">
          <input v-model="form.password" v-validate="'required'" id="password" class="form-control" type="password" name="password" required>
          <ydl-label inputID="password">Password</ydl-label>
          <span v-show="errors.has('password')" class="required">{{ errors.first("password") }}</span>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" type="submit">
            <span v-if="loginPending">
              <fa-icon icon="spinner" spin/>
            </span>
            <span v-else>Log In</span>
          </button>
          <a class="btn btn-primary btn-block" href="/#/signup">Sign Up</a>
        </div>
        <a href="#" class="forgot">Forgot Password?</a>
      </form>
    </div>
  </div>
</template>

<script>
import FormLabel from "@/components/FormLabel"
import ProfileHeaderText from "@/components/ProfileHeaderText"
import { mapState } from "vuex"

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
  computed: mapState({
    loginPending: state => state.authentication.pending.token,
    user: state => state.users.user
  }),
  components: {
    "ydl-label": FormLabel,
    "ydl-profileheadertext": ProfileHeaderText
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.authenticate()
        }
      })
    },
    async authenticate () {
      console.log("authenticate user")
      try {
        await this.$store.dispatch("login", { data: this.form }).then(() => {
          console.log("awaited login")
          this.$router.push("profile/" + this.user.id + "/courses/")
        })
      } catch (error) {
        console.log(error)
        console.log(error.response)
      }
      // await this.$store.dispatch("login", { data: this.form }).then(() => {
      //   console.log("pushing to profile")
      //   this.$router.push("profile/" + this.user.id + "/courses/")
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/fonts/ionicons.min.css";

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
  &:focus + label,
  &:valid + label {
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
    // flex-direction: column;
    // justify-content: center;
    flex-wrap: wrap;
    padding: 30px;
    width: 350px;
    height: 420px;
    background-color: white;

    @include media-breakpoint-down(sm) {
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
