<template>
  <div>
    <ydl-titleheader v-if="!embed" color="darkgreen">RESOURCES</ydl-titleheader>
    <div class="ydl-resource-container">
      <p v-if="!displayedResources.length" class="empty-resources">
        No resources available for your courses.
      </p>
      <div
        v-for="resource in displayedResources"
        :key="resource.id"
        class="ydl-resource list-group-item"
      >
        <div class="ydl-resource__entry resource-name">
          <strong>{{ resource.name }}</strong>
          <small v-if="resource.courseName" class="course-name">{{
            resource.courseName
          }}</small>
        </div>
        <div class="ydl-resource__entry uploader">
          {{ resource.uploader_name }}
        </div>
        <div class="ydl-resource__entry">
          <a
            v-if="resource.file"
            class="btn btn-primary"
            :href="resource.file"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="'Open ' + resource.name"
          >
            <fa-icon icon="link" /> Open
          </a>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click="copyToClipboard(resource.content)"
          >
            <fa-icon icon="link" /> Copy link
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/Util/TitleHeader";
import demoResources from "@/demo/resources";
import { mapState } from "vuex";

export default {
  name: "Resources",
  props: ["embed"],
  computed: {
    ...mapState({
      resources: (state) => state.api.resources,
      user: (state) => state.api.user,
      ownCourses: (state) => state.api.ownCourses,
      joinedCourses: (state) => state.api.joinedCourses,
    }),
    displayedResources() {
      if (process.env.NODE_ENV === "production") {
        return Array.isArray(this.resources) ? this.resources : [];
      }
      const courses = this.ownCourses.concat(this.joinedCourses);
      const names = courses.map((course) => course.name);
      return demoResources.filter(
        (resource) => names.indexOf(resource.courseName) !== -1,
      );
    },
  },
  created() {
    if (process.env.NODE_ENV === "production") {
      this.$store.dispatch("getResources");
    } else if (
      !this.ownCourses.length &&
      !this.joinedCourses.length &&
      this.user
    ) {
      this.$store.dispatch("getCourses");
    }
  },
  components: {
    "ydl-titleheader": TitleHeader,
  },
  methods: {
    copyToClipboard(link) {
      const input = document.createElement("input");
      input.style = "position: absolute; left: -1000px; top: -1000px";
      input.value = link || "";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      this.$notify({
        title: "Copied link",
        text: input.value,
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ydl-resource {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 16px;
}
.ydl-resource__entry {
  padding: 5px;
}
.resource-name {
  flex: 1;
  min-width: 180px;
}
.uploader {
  min-width: 130px;
}
.course-name {
  display: block;
  color: #69798b;
  margin-top: 4px;
}
.empty-resources {
  padding: 18px;
  color: #69798b;
}
</style>
