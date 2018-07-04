<template>
  <div>
    <ydl-profileheadertext color="pink" >EVENTS</ydl-profileheadertext>
    <div class="ydl-event-container">
      <div v-for="event in eventsFromCurses" :key="event.id">
        <div>{{event.matter}}</div>
        <div>{{moment(event.date).format('DD.MM.YYYY, HH:mm')}}</div>
        <div>{{event.course}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/Util/TitleHeader"
import Event from "@/components/Event"
import { mapState } from "vuex"
var moment = require("moment")

export default {
  name: "events",
  data () {
    return {
      moment: moment
    }
  },
  computed: {
    ...mapState({
      own_courses: state => state.api.ownCourses,
      joined_courses: state => state.api.joinedCourses
    }),
    eventsFromCurses () {
      let courses = [...this.own_courses, ...this.joined_courses]
      let events = []
      courses.forEach(course => {
        if (course.events.length !== 0) {
          events.push(...course.events)
        }
      })

      return events
    }
  },
  components: {
    "ydl-profileheadertext": TitleHeader,
    "ydl-event": Event
  },
  mounted () {

  }
}
</script>
