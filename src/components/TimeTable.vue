<template>
  <div class="container-fluid" v-if="!loading">
    <h3 class="heading">Mein Stundenplan</h3>
    <table class="timetable">
      <tr class="table-header">
        <td></td>
        <td>Montag</td>
        <td>Dienstag</td>
        <td>Mittwoch</td>
        <td>Donnerstag</td>
        <td>Freitag</td>
      </tr>
      <tr>
        <td>8:00 - 10:00</td>
        <td>{{timetable.monday.t8to10.subject}} <br> {{timetable.monday.t8to10.room}}</td>
        <td>{{timetable.tuesday.t8to10.subject}} <br> {{timetable.tuesday.t8to10.room}}</td>
        <td>{{timetable.wednesday.t8to10.subject}} <br> {{timetable.wednesday.t8to10.room}}</td>
        <td>{{timetable.thursday.t8to10.subject}} <br> {{timetable.thursday.t8to10.room}}</td>
        <td>{{timetable.friday.t8to10.subject}} <br> {{timetable.friday.t8to10.room}}</td>
      </tr>
      <tr>
        <td>10:00 - 12:00</td>
        <td>{{timetable.monday.t10to12.subject}} <br> {{timetable.monday.t10to12.room}}</td>
        <td>{{timetable.tuesday.t10to12.subject}} <br> {{timetable.tuesday.t10to12.room}}</td>
        <td>{{timetable.wednesday.t10to12.subject}} <br> {{timetable.wednesday.t10to12.room}}</td>
        <td>{{timetable.thursday.t10to12.subject}} <br> {{timetable.thursday.t10to12.room}}</td>
        <td>{{timetable.friday.t10to12.subject}} <br> {{timetable.friday.t10to12.room}}</td>
      </tr>
      <tr>
        <td>12:00 - 14:00</td>
        <td>{{timetable.monday.t12to14.subject}} <br> {{timetable.monday.t12to14.room}}</td>
        <td>{{timetable.tuesday.t12to14.subject}} <br> {{timetable.tuesday.t12to14.room}}</td>
        <td>{{timetable.wednesday.t12to14.subject}} <br> {{timetable.wednesday.t12to14.room}}</td>
        <td>{{timetable.thursday.t12to14.subject}} <br> {{timetable.thursday.t12to14.room}}</td>
        <td>{{timetable.friday.t12to14.subject}} <br> {{timetable.friday.t12to14.room}}</td>
      </tr>
      <tr>
        <td>14:00 - 16:00</td>
        <td>{{timetable.monday.t14to16.subject}} <br> {{timetable.monday.t14to16.room}}</td>
        <td>{{timetable.tuesday.t14to16.subject}} <br> {{timetable.tuesday.t14to16.room}}</td>
        <td>{{timetable.wednesday.t14to16.subject}} <br> {{timetable.wednesday.t14to16.room}}</td>
        <td>{{timetable.thursday.t14to16.subject}} <br> {{timetable.thursday.t14to16.room}}</td>
        <td>{{timetable.friday.t14to16.subject}} <br> {{timetable.friday.t14to16.room}}</td>
      </tr>
      <tr>
        <td>16:00 - 18:00</td>
        <td>{{timetable.monday.t16to18.subject}} <br> {{timetable.monday.t16to18.room}}</td>
        <td>{{timetable.tuesday.t16to18.subject}} <br> {{timetable.tuesday.t16to18.room}}</td>
        <td>{{timetable.wednesday.t16to18.subject}} <br> {{timetable.wednesday.t16to18.room}}</td>
        <td>{{timetable.thursday.t16to18.subject}} <br> {{timetable.thursday.t16to18.room}}</td>
        <td>{{timetable.friday.t16to18.subject}} <br> {{timetable.friday.t16to18.room}}</td>
      </tr>
      <tr>
        <td>18:00 - 20:00</td>
        <td>{{timetable.monday.t18to20.subject}} <br> {{timetable.monday.t18to20.room}}</td>
        <td>{{timetable.tuesday.t18to20.subject}} <br> {{timetable.tuesday.t18to20.room}}</td>
        <td>{{timetable.wednesday.t18to20.subject}} <br> {{timetable.wednesday.t18to20.room}}</td>
        <td>{{timetable.thursday.t18to20.subject}} <br> {{timetable.thursday.t18to20.room}}</td>
        <td>{{timetable.friday.t18to20.subject}} <br> {{timetable.friday.t18to20.room}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Calendar",
  data () {
    return {
      timetable: {
        "monday": {
          "t8to10": {
            "subject": "Polnisch",
            "room": "H0105"
          },
          "t10to12": {
            "subject": "",
            "room": ""
          },
          "t12to14": {
            "subject": "",
            "room": ""
          },
          "t14to16": {
            "subject": "",
            "room": ""
          },
          "t16to18": {
            "subject": "Englisch",
            "room": "He101"
          },
          "t18to20": {
            "subject": "",
            "room": ""
          }
        },
        "tuesday": {
          "t8to10": {
            "subject": "",
            "room": ""
          },
          "t10to12": {
            "subject": "",
            "room": ""
          },
          "t12to14": {
            "subject": "Spanisch",
            "room": "MA001"
          },
          "t14to16": {
            "subject": "",
            "room": ""
          },
          "t16to18": {
            "subject": "",
            "room": ""
          },
          "t18to20": {
            "subject": "",
            "room": ""
          }
        },
        "wednesday": {
          "t8to10": {
            "subject": "",
            "room": ""
          },
          "t10to12": {
            "subject": "Japanisch",
            "room": "C130"
          },
          "t12to14": {
            "subject": "",
            "room": ""
          },
          "t14to16": {
            "subject": "",
            "room": ""
          },
          "t16to18": {
            "subject": "",
            "room": ""
          },
          "t18to20": {
            "subject": "",
            "room": ""
          }
        },
        "thursday": {
          "t8to10": {
            "subject": "",
            "room": ""
          },
          "t10to12": {
            "subject": "",
            "room": ""
          },
          "t12to14": {
            "subject": "",
            "room": ""
          },
          "t14to16": {
            "subject": "",
            "room": ""
          },
          "t16to18": {
            "subject": "",
            "room": ""
          },
          "t18to20": {
            "subject": "Schwedisch",
            "room": "Mar0.017"
          }
        },
        "friday": {
          "t8to10": {
            "subject": "",
            "room": ""
          },
          "t10to12": {
            "subject": "",
            "room": ""
          },
          "t12to14": {
            "subject": "",
            "room": ""
          },
          "t14to16": {
            "subject": "Französisch",
            "room": "A131"
          },
          "t16to18": {
            "subject": "",
            "room": ""
          },
          "t18to20": {
            "subject": "",
            "room": ""
          }
        }
      },
      loading: true
    }
  },
  mounted () {
    // axios.get("http://jsontest/timetable/timetable.json")
    //   .then(response => {
    //     this.timetable = response.data
    //   })
    this.loading = false
    console.log("DISABLED because not ready yet")
  }
}
</script>

<style lang="scss" scoped>
  .timetable {
    width: 100%;
    tr:nth-child(even) {
      background-color: rgba(7, 167, 218, 0.25);
    }
    tr:nth-child(odd) {
      background-color: white;
    }

    .table-header {
      font-weight: bold;
    }

    td {
      border: 1px solid black;
    }
  }

  .heading {
    margin-bottom: 25px;
  }
</style>
