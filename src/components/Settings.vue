<template>
<div>
  <h1> Einstellungen </h1>
  <div v-if="!editmode" class="container">
    <div>
      <figure class="figure">
        <img src="../assets/img/blank-profile-picture.jpg" class="figure-img img-fluid rounded" alt="no image found">
      </figure>
    </div>
    <div>
      <table class="setting-table">
        <tr>
          <th>Vorname:</th>
          <td>{{user.firstName}}</td>
        </tr>
        <tr>
          <th>Nachname:</th>
          <td>{{user.lastName}}</td>
        </tr>
        <tr>
          <th>Benutzername:</th>
          <td>{{user.username}}</td>
        </tr>
        <tr>
          <th>E-Mail:</th>
          <td>{{user.email}}</td>
        </tr>
        <tr>
          <th>Straße, Hausnummer:</th>
          <td>{{user.adress.street}}, {{user.adress.houseNumber}}</td>
        </tr>
        <tr>
          <th>PLZ, Ort:</th>
          <td>{{user.adress.postCode}} {{user.adress.city}}</td>
        </tr>
        <tr class="control">
          <td colspan="2"><button class="btn ydl-btn" @click="startEditing"> Bearbeiten </button></td>
        </tr>
      </table>
    </div>
  </div>
  <div v-else class="container">
    <div>
      <figure class="figure">
        <img src="../assets/img/blank-profile-picture.jpg" class="figure-img img-fluid rounded" alt="no image found">
        <figcaption>
          <button class="btn ydl-btn"> Bild hochladen</button>
        </figcaption>
      </figure>
    </div>
    <div>
      <form @submit.prevent="saveChanges">
        <table class="setting-table">
          <tr>
            <th>Vorname:</th>
            <td>
              <input class="text" type="text" name="firstName" v-bind:value="user.firstName" placeholder="Vorname">
            </td>
          </tr>
          <tr>
            <th>Nachname:</th>
            <td>
              <input class="text" type="text" name="lastName" v-bind:value="user.lastName" placeholder="Nachname">
            </td>
          </tr>
          <tr>
            <th>Benutzername:</th>
            <td>
              <input class="text" type="text" name="username" v-bind:value="user.username" placeholder="Benutzername">
            </td>
          </tr>
          <tr>
            <th>E-Mail:</th>
            <td>
              <input class="text" type="text" name="email" v-bind:value="user.email" placeholder="E-Mail">
            </td>
          </tr>
          <tr>
            <th>Straße, Hausnummer:</th>
            <td>
              <input type="text" name="street" v-bind:value="user.adress.street" placeholder="Straße">
              <input class="number" type="text" name="houseNumber" v-bind:value="user.adress.houseNumber" placeholder="Hausnummer" maxlength="5">
            </td>
          </tr>
          <tr>
            <th>PLZ, Ort:</th>
            <td>
              <input class="number" type="text" name="plz" v-bind:value="user.adress.postCode" placeholder="PLZ" maxlength="5">
              <input type="text" name="city" v-bind:value="user.adress.city" placeholder="City">
            </td>
          </tr>
          <tr class="control">
            <td colspan="2">
              <button type="submit" class="btn ydl-btn"> Speichern </button>
              <button class="btn ydl-btn" @click="abortEditing"> Abbrechen </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Settings",
  props: ["user"],
  data () {
    return {
      editmode: false
    }
  },
  methods: {
    startEditing () {
      this.editmode = true
    },
    abortEditing () {
      this.editmode = false
    },
    saveChanges () {
      console.log("Should be implemented but API unclear")
      alert("Button out on Order \nShould be implemented but API unclear")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";

.container {
  padding-top: 50px;
  display: flex;
  justify-content: space-around;

  .figure {
    max-width: 250px;
    max-height: 250px;
  }
}

.ydl-btn {
  background-color: $ydl-primary;
  color: white;
}

.ydl-btn:hover {
  text-decoration: underline;
  font-size: 18px;
  transition: 200ms;
}

.setting-table {
  float: left;
  text-align: left;
  border-collapse: collapse;
  font-size: 20px;

  tr {
    border-bottom: 1px solid black;
  }

  th, td {
    padding: 15px;
  }

  input {
    max-width: 200px;
  }

  .number {
    max-width: 100px;
  }

  .text {
    max-width: 350px;
  }

  .control {
    text-align: center;
    border: none;
  }
}
</style>
