<template>
  <ydl-timetable />
</template>

<script>
import TimeTable from "@/components/Calendar/TimeTable"

// The existing /calendar route now uses the same API-backed events as /schedule.
export default {
  name: "TeacherCalendar",
  components: { "ydl-timetable": TimeTable }
}
</script>
