<template>
  <div>
    <ydl-titleheader color="pink">EVENTS</ydl-titleheader>
    <div class="ydl-event-container">
      <div
        class="ydl-event"
        v-for="event in eventsFromCourses"
        :key="event.displayId"
      >
        <div class="ydl-event__entry">{{ event.matter }}</div>
        <div class="ydl-event__entry">
          {{ moment(event.date).format("DD.MM.YYYY") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/Util/TitleHeader";
import Event from "@/components/Profile/Event/Event";
import { mapState } from "vuex";
var moment = require("moment");

export default {
  name: "events",
  data() {
    return {
      moment: moment,
    };
  },
  computed: {
    ...mapState({
      own_courses: (state) => state.api.ownCourses,
      joined_courses: (state) => state.api.joinedCourses,
    }),
    eventsFromCourses() {
      const courses = [
        ...(this.own_courses || []),
        ...(this.joined_courses || []),
      ];
      const events = [];
      courses.forEach((course) => {
        const courseEvents = course.events || [];
        courseEvents.forEach((event) => {
          events.push({
            ...event,
            displayId: String(course.id) + "-" + String(event.id),
          });
        });
      });
      return events.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
  },
  components: {
    "ydl-titleheader": TitleHeader,
    "ydl-event": Event,
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.ydl-event {
  display: flex;
  flex-direction: row;

  &__entry {
    padding: 5px;

    &:first-child {
      flex: 1;
    }
  }
}
</style>
