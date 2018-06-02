<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div id="login_modal" class="fade show" tabindex="-1" role="dialog" style="margin:auto;">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="login-dark" style="height:550px;">
                <button class="close" type="button" data-dismiss="modal" @click="$emit('close')" aria-label="Close" style="color:rgb(255,255,255);margin:0 5 0 0;">
                  <span class="close_modal" aria-hidden="true">×</span>
                </button>
                <form @submit.prevent="authenticate">
                  <h2 class="sr-only">Login Form</h2>
                  <div class="illustration">
                    <i class="icon ion-ios-locked-outline"></i>
                  </div>
                  <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email"></div>
                  <div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password"></div>
                  <div class="form-group">
                    <button class="btn btn-primary btn-block" type="submit">Log In</button>
                    <button class="btn btn-primary btn-block">Konto erstellen</button>
                  </div>
                  <a href="#" class="forgot">Passwort vergessen</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios"

export default {
  name: "Login",
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

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
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

.close {
  margin-right: 15px;
  font-size: 35px;
}
</style>
