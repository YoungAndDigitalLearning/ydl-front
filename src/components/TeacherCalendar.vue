<template>
  <div class="calendar-container">
    <ydl-titleheader color="blue">Calendar</ydl-titleheader>
    <calendar-view :show-date="showDate" :events="events" @show-date-change="setShowDate" theme-default holiday-us-traditional holiday-us-official/>
  </div>
</template>

<script>
import TitleHeader from "@/components/Util/TitleHeader"
import CalendarView from "vue-simple-calendar"
import { mapState } from "vuex"
require("vue-simple-calendar/dist/static/css/default.css")
require("vue-simple-calendar/dist/static/css/holidays-us.css")

export default {
  data () {
    return {
      events: [],
      showDate: new Date()
    }
  },
  computed: mapState({
    own_courses: state => state.api.ownCourses
  }),
  mounted () {
    this.own_courses.forEach(course => {
      course.events.forEach(event => {
        this.events.push({
          id: event.id,
          title: event.matter,
          startDate: event.date
        })
      })

      this.events.push({
        id: course.id,
        title: course.name,
        startDate: course.created,
        endDate: course.deadline
      })
    })
  },
  components: {
    CalendarView,
    "ydl-titleheader": TitleHeader
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
