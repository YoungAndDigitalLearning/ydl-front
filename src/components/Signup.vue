<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="sign-up-dark">
              <div class="form-container">
              <div class="close-button" type="button" @click="$emit('close')" aria-label="Close">
                  <i class="icon ion-close-circled"></i>
              </div>
              <div class="illustration">
                <i class="icon ion-android-create"></i>
              </div>
              <form method="post">
                <h2 class="sr-only">Login Form</h2>
                <div class="form-group"><input class="form-control" type="text" name="titel" placeholder="Titel"></div>
                <div class="form-row">
                  <div class="form-group col-md-6"><input class="form-control" type="text" name="vorname" placeholder="Vorname"></div>
                  <div class="form-group col-md-6"><input class="form-control" type="text" name="nachname" placeholder="Nachname"></div>
                </div>
                <div class="form-group"><input class="form-control" type="text" name="username" placeholder="Username"></div>
                <div class="form-group"><input class="form-control" type="password" name="password1" placeholder="Password"></div>
                <div class="form-group"><input class="form-control" type="password" name="password2" placeholder="Confirm Password"></div>
                <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email"></div>
                <div class="form-group"><input class="form-control" type="text" name="address" placeholder="Address"></div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit">Sign Up</button>
                </div>
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
export default {
  name: "Signup"
}
</script>

<style lang="scss" scoped>
@import "../assets/fonts/ionicons.min.css";

/* Signup */

.sign-up-dark {
  background-image: url(../assets/img/star-sky.jpg);
  background-size:cover;
  width: 600px;

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
    margin: 40px 70px;
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

    &:hover {
      color: #e03131
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
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
