<template>
  <div class="landing-page">
    <img
      class="landing-logo"
      src="@/assets/img/YDL-Logo.svg"
      height="250"
      alt="Y&D Learning logo"
    />
    <h1 class="text-center">Young&amp;Digital Learning</h1>
    <h2 class="announcements">Announcements</h2>
    <div class="announcements-container">
      <div
        v-for="announcement in displayedAnnouncements"
        :key="announcement.id"
        class="announcement-container"
      >
        <div class="announcement-header">{{ announcement.title }}</div>
        <p class="announcements-by">
          by {{ authorName(announcement) }} |
          {{ formatDate(announcement.date) }}
        </p>
        <div class="announcement-text">
          {{ announcement.content }}
          <a
            v-if="announcement.link"
            :href="announcement.link"
            target="_blank"
            rel="noopener noreferrer"
            >{{ announcement.linkLabel || announcement.link }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import demoAnnouncements from "@/demo/announcements"

export default {
  name: "LandingPage",
  computed: {
    ...mapState({
      announcements: (state) => state.api.announcements
    }),
    displayedAnnouncements () {
      const value = Array.isArray(this.announcements)
        ? this.announcements
        : (this.announcements && this.announcements.results) || []
      return process.env.NODE_ENV !== "production"
        ? value.concat(demoAnnouncements)
        : value
    }
  },
  mounted () {
    this.$store.dispatch("getAnnouncements")
  },
  methods: {
    authorName (announcement) {
      const author = announcement.author
      if (author && typeof author === "object") {
        return author.first_name && author.last_name
          ? author.first_name + " " + author.last_name
          : author.username || "Demo Team"
      }
      return announcement.authorName || "Y&D Learning Team"
    },
    formatDate (value) {
      if (!value) return ""
      const date = new Date(value)
      if (isNaN(date.getTime())) return ""
      return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/global";
.landing-logo {
  padding-top: 30px;
}
.text-center {
  padding: 30px;
  color: white;
}
.announcements {
  color: white;
  margin-top: 15px;
}
.announcements-container {
  margin: 0 10% 5%;
}
.announcement-container {
  background: white;
  padding: 2%;
  margin-bottom: 20px;
}
.announcement-header {
  background: $dark-green;
  color: white;
  font-weight: bold;
  font-size: 15pt;
  padding: 5px;
}
.announcement-text {
  color: black;
  margin-top: 12px;
}
.announcements-by {
  color: #777;
  font-style: italic;
  margin-top: 6px;
}
</style>
