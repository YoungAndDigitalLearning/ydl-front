<template>
  <div class="calendar-container">
    <ydl-profileheadertext color="blue">Calendar</ydl-profileheadertext>
    <calendar-view :show-date="showDate" :events="events" @show-date-change="setShowDate" theme-default holiday-us-traditional holiday-us-official/>
  </div>
</template>

<script>
import ProfileHeaderText from "@/components/ProfileHeaderText"
import CalendarView from "vue-simple-calendar"
require("vue-simple-calendar/dist/static/css/default.css")
require("vue-simple-calendar/dist/static/css/holidays-us.css")

export default {
  data () {
    return {
      events: [
        {
          id: 0,
          title: "Deutsch",
          startDate: "2018-03-01 13:00:00",
          endDate: "2018-07-01 13:00:00",
          classes: "deutsch"
        },
        {
          id: 1,
          title: "Japanisch",
          startDate: "2018-06-12 13:00:00",
          endDate: "2018-07-01 13:00:00",
          classes: "japanisch"
        },
        {
          id: 2,
          title: "Klausur",
          startDate: "2018-06-28 13:00:00",
          endDate: "2018-06-28 15:00:00",
          classes: "klausur"
        }
      ],
      showDate: new Date()
    }
  },
  components: {
    CalendarView,
    "ydl-profileheadertext": ProfileHeaderText
  },
  methods: {
    setShowDate (d) {
      this.showDate = d
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 600px;
}
</style>
