<template>
<div class="container-fluid">
  <div class="row">
    <div class="head col-4">
      Kontakt
    </div>
    <div class="head bdr col-4">
      Social
    </div>
    <div class="head col-4">
      Links
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <hr>
    </div>
  </div>
  <div class="row">
    <div class="contact col-4">
      <span>
        Musterstraße 42
      </span>
      <span>
        1337 Musterstadt
      </span>
      <span>
        Tel-Nr.: 1234567890
      </span>
      <span>
        E-Mail: muster@muster.de
      </span>
    </div>
    <div class="social-icons bdr col-4">
      <a href="#">
        <i class="icon ion-social-twitter"></i>
      </a>
      <a href="#">
        <i class="icon ion-social-facebook"></i>
      </a>
      <a href="#">
        <i class="icon ion-social-snapchat"></i>
      </a>
      <a href="#">
        <i class="icon ion-social-youtube"></i>
      </a>
    </div>
    <div class="links col-4">
      <div>
        <a href="#">
          Impressung/Datenschutz
        </a>
      </div>
      <div>
        <a href="#">
          Login
        </a>
      </div>
      <div>
        <a href="#">
          Sign Up
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
@import "styles/global";
@import "../assets/fonts/ionicons.min.css";
@import "../assets/css/Social-Icons.css";

.container-fluid {
  background-color: $ydl-primary;
  padding: 15px;
  color: white;

  hr {
    color:lightgray;
  }
}
.bdr {
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
}
.head {
  font-size: 25px;
}
.contact {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.social-icons {
  background-color: $ydl-primary;

  .icon {
    color: $ydl-primary;
    background-color: white;
  }
}
.links {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  a {
    color: white;
    text-decoration: none;
    margin-top: 25px;
    margin-bottom: 25px;
  }

  a:hover {
    font-size: 20px;
    transition: 300ms;
  }
}
</style>
