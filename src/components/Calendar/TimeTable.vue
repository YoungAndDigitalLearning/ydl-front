<template>
  <section class="calendar-page">
    <header class="calendar-header">
      <div>
        <h2>Course Calendar</h2>
        <p>
          Upcoming assignments, presentations and exams in your enrolled
          courses.
        </p>
      </div>
      <div class="month-controls">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="changeMonth(-1)"
          aria-label="Previous month"
        >
          ‹
        </button>
        <strong>{{ monthLabel }}</strong>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="changeMonth(1)"
          aria-label="Next month"
        >
          ›
        </button>
      </div>
    </header>
    <div v-if="loading" class="alert alert-light">Loading events…</div>
    <div v-if="error" class="alert alert-warning">{{ error }}</div>
    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="day"
        :class="{ outside: !cell.inMonth, today: cell.isToday }"
      >
        <span class="day-number">{{ cell.date.getDate() }}</span>
        <div
          v-for="event in eventsForDate(cell.date)"
          :key="event.id"
          class="event"
        >
          <strong>{{ event.matter }}</strong>
          <span>{{ event.courseName }}</span>
        </div>
      </div>
    </div>
    <h3 class="upcoming-title">Upcoming course events</h3>
    <div v-if="!events.length && !loading" class="empty">
      No events available for your courses.
    </div>
    <ul v-else class="event-list">
      <li v-for="event in sortedEvents" :key="event.id">
        <span class="event-date">{{ formatDate(event.date) }}</span>
        <span
          ><strong>{{ event.matter }}</strong> · {{ event.courseName }}</span
        >
      </li>
    </ul>
  </section>
</template>

<script>
import axiosInstance from "@/store/api";

export default {
  name: "TimeTable",
  data() {
    return {
      events: [],
      loading: true,
      error: "",
      month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    };
  },
  computed: {
    monthLabel() {
      return this.month.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      });
    },
    cells() {
      const first = new Date(
        this.month.getFullYear(),
        this.month.getMonth(),
        1,
      );
      const offset = (first.getDay() + 6) % 7;
      const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
      const today = new Date();
      return Array.from({ length: 42 }, (_, i) => {
        const date = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate() + i,
        );
        return {
          date: date,
          inMonth: date.getMonth() === first.getMonth(),
          isToday: date.toDateString() === today.toDateString(),
        };
      });
    },
    sortedEvents() {
      return this.events
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    },
  },
  mounted() {
    axiosInstance
      .get("courses/")
      .then((response) => {
        const courses = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];
        this.events = courses.reduce((all, course) => {
          const next = (course.events || []).map((event) =>
            Object.assign({}, event, {
              id: String(course.id) + "-" + String(event.id),
              courseName: course.name,
            }),
          );
          return all.concat(next);
        }, []);
        if (this.events.length) {
          const nextDate = this.sortedEvents.find(
            (event) => new Date(event.date) >= new Date(),
          );
          const date = new Date((nextDate || this.sortedEvents[0]).date);
          this.month = new Date(date.getFullYear(), date.getMonth(), 1);
        }
      })
      .catch(() => {
        this.error = "Could not load calendar events.";
      })
      .then(() => {
        this.loading = false;
      });
  },
  methods: {
    changeMonth(offset) {
      this.month = new Date(
        this.month.getFullYear(),
        this.month.getMonth() + offset,
        1,
      );
    },
    eventsForDate(date) {
      return this.events.filter((event) => {
        const d = new Date(event.date);
        return (
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
        );
      });
    },
    formatDate(value) {
      return new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-page {
  background: #f7f9fb;
  padding: 25px;
  color: #253447;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 22px;
}
.calendar-header h2 {
  margin: 0 0 5px;
}
.calendar-header p {
  margin: 0;
  color: #69798b;
}
.month-controls {
  display: flex;
  gap: 14px;
  align-items: center;
}
.month-controls strong {
  min-width: 145px;
  text-align: center;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border: 1px solid #dbe3ec;
  background: white;
}
.weekday {
  background: #0689b3;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}
.day {
  min-height: 105px;
  border: 1px solid #e4eaf1;
  padding: 6px;
  overflow: hidden;
}
.day.outside {
  background: #f2f5f8;
  color: #a8b4bf;
}
.day.today .day-number {
  background: #0689b3;
  color: white;
  border-radius: 50%;
  padding: 3px 7px;
}
.day-number {
  display: inline-block;
  margin-bottom: 5px;
}
.event {
  background: #d9f1ec;
  border-left: 3px solid #32b37c;
  padding: 5px;
  margin-bottom: 4px;
  font-size: 11px;
  overflow-wrap: anywhere;
}
.event strong,
.event span {
  display: block;
}
.upcoming-title {
  font-size: 20px;
  margin: 25px 0 12px;
}
.event-list {
  list-style: none;
  padding: 0;
  background: white;
}
.event-list li {
  display: flex;
  gap: 18px;
  border-bottom: 1px solid #e5ebf0;
  padding: 11px 15px;
}
.event-date {
  width: 110px;
  flex-shrink: 0;
  color: #0689b3;
}
.empty {
  color: #657588;
}
@media (max-width: 800px) {
  .day {
    min-height: 80px;
  }
  .event {
    font-size: 9px;
  }
  .calendar-page {
    padding: 12px;
  }
}
</style>
