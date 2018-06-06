<template>
  <div class="sign-up-dark">
    <div class="form-container">
      <div class="illustration">
        <i class="icon ion-ios-locked-outline"></i>
      </div>
      <form @submit.prevent="authenticate">
        <h2 class="sr-only">Login Form</h2>
        <div class="form-group"><input class="form-control" type="text" name="username" placeholder="Benutzername"></div>
        <div class="form-group"><input class="form-control" type="text" name="password" placeholder="Passwort"></div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" type="submit">Logs In</button>
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
  methods: {
    authenticate () {
      axios.post("api/token-auth/")
        .then(function (response) {
          console.log(response.data)
          this.articleEntries = response.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/Login-Form-Dark.css";
@import "../assets/fonts/ionicons.min.css";

@import "../assets/fonts/ionicons.min.css";

/* Signup */

.modal-content {
  overflow: auto;
}

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
    width: 350px;
    height: 500px;
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

/* Signup Transition */

.modal-mask {
  // overflow: auto;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
