<template>
  <div>
    <ydl-titleheader color="darkgreen">All Courses</ydl-titleheader>
    <ul class="list-group" v-for="course in courses" v-bind:key="course.id">
      <a class="list-group-item list-group-item-action horizontal-align">
        <div class="centered-text-ydl">
          <h4>{{ course.name }}</h4>
        </div>
        <button
          v-if="
            user &&
            !isRegistered(course.id) &&
            !(user.is_teacher && user.id === course.teacher)
          "
          type="button"
          class="btn btn-primary"
          :disabled="updatingCourseId !== null"
          @click="registerToCourse(course.id)"
          title="Join course"
        >
          <fa-icon icon="sign-in-alt" />
        </button>
        <button
          v-else-if="
            user && isRegistered(course.id) && user.id !== course.teacher
          "
          type="button"
          class="btn btn-success"
          :disabled="updatingCourseId !== null"
          @click="unregisterFromCourse(course.id)"
          title="Leave course"
        >
          <fa-icon icon="sign-out-alt" />
        </button>
        <div v-else class="btn" title="eingeschrieben">
          <fa-icon icon="user" />
        </div>
      </a>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axiosInstance from "@/store/api";
import TitleHeader from "@/components/Util/TitleHeader";

export default {
  name: "AllCourses",
  data() {
    return {
      updatingCourseId: null,
    };
  },
  computed: mapState({
    courses: (state) => state.api.freeCourses,
    user: (state) => state.api.user,
  }),
  mounted() {
    this.$store.dispatch("getFreeCourses");
  },
  components: {
    "ydl-titleheader": TitleHeader,
  },
  methods: {
    async updateRegistration(id, shouldJoin) {
      if (!this.user || this.updatingCourseId !== null) return;
      const current = Array.isArray(this.user.courses)
        ? this.user.courses.slice()
        : [];
      const courses = shouldJoin
        ? current.filter((courseId) => courseId !== id).concat(id)
        : current.filter((courseId) => courseId !== id);
      if (
        courses.length === current.length &&
        courses.every((value, index) => value === current[index])
      )
        return;

      this.updatingCourseId = id;
      try {
        await axiosInstance.put("students/" + this.user.id, {
          courses: courses,
        });
        await this.$store.dispatch("getUser", { params: { id: this.user.id } });
        await this.$store.dispatch("getCourses");
        this.$notify({
          title: "Course enrollment",
          text: shouldJoin
            ? "Successfully joined the course"
            : "Successfully left the course",
          type: "success",
        });
      } catch (error) {
        console.error("Could not update enrollment", error);
        this.$notify({
          title: "Course enrollment",
          text: "Could not update your courses. Please try again.",
          type: "error",
        });
      } finally {
        this.updatingCourseId = null;
      }
    },
    registerToCourse(id) {
      return this.updateRegistration(id, true);
    },
    unregisterFromCourse(id) {
      return this.updateRegistration(id, false);
    },
    isRegistered(id) {
      return Boolean(
        this.user &&
        Array.isArray(this.user.courses) &&
        this.user.courses.includes(id),
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.horizontal-align {
  display: flex;
}

.fill-out {
  flex: 1;
}

h4 {
  margin: 0px;
}

.centered-text-ydl {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-group-item {
  border-radius: 0;
}
</style>
