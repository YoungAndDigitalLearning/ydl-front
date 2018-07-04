<template>
  <div class="ydl-container">
    <div class="left-sidebar">
      <!-- TODO: need to be removed into sub compoentnts -->
      <div class="navigation">
        <ydl-titleheader color="green">NAVIGATION</ydl-titleheader>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active badge-link" :href="'/#/profile/' + user.id + '/courses/'">
              <span>My Courses</span>
              <span class="ydl-badge">
                <b-badge>{{[...own_courses, ...joined_courses].length}}</b-badge>
              </span>
              <span v-if="user.is_teacher" class="ydl-badge-add">
                <b-badge :href="'/#/profile/' + user.id + '/createcourse'">
                  <fa-icon icon="plus" />
                </b-badge>
              </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :href="'/#/profile/' + user.id + '/allcourses/'">All Courses</a>
          </li>
          <li v-for="course in [...own_courses, ...joined_courses]" v-bind:key="course.id" class="nav-item">
            <a class="nav-link" @click="goToCourse(course.id)">
              <fa-icon v-if="course.id === currentViewingCourse" icon="caret-right" />{{" " + course.name}}</a>
          </li>
        </ul>
      </div>
      <div class="recent-uploads">
        <ydl-titleheader color="orange">RECENT UPLOADS</ydl-titleheader>
      </div>
    </div>
    <div class="profile-content-container">
      <div class="profile-content">
        <router-view/>
      </div>
    </div>
    <div class="right-sidebar">
      <div class="navigation">
        <ydl-events />
      </div>
      <div class="recent-uploads">
        <ydl-titleheader color="blue">CALENDAR <b-button :href="'/#/profile/' + user.id + '/calendar/'" variant="primary">Open</b-button></ydl-titleheader>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeader from "@/components/Util/TitleHeader"
import Events from "@/components/Profile/Event/Events"
import { mapState } from "vuex"

export default {
  name: "ProfilePage",
  created () {
    console.log("loaded profile")
    this.$store.dispatch("getCourses")
  },
  methods: {
    goToCourse (id) {
      console.log("goto course")
      this.$router.push("/profile/" + this.user.id + "/courses/" + id)
    }
  },
  components: {
    "ydl-titleheader": TitleHeader,
    "ydl-events": Events
  },
  computed: mapState({
    own_courses: state => state.api.ownCourses,
    joined_courses: state => state.api.joinedCourses,
    user: state => state.api.user,
    currentViewingCourse: state => state.api.viewingCourse
  })
}
</script>

<style lang="scss" scoped>
@import "styles/global";
@import "compass/css3";

a:hover {
  cursor: pointer;
}

/* navigation style (new components) */

.badge-link {
  position: relative;
}

.ydl-badge {
  position: absolute;
  right: 10px;

  .badge {
    width: 28px;
  }

  &-add {
    right: 50px;
    position: absolute;

    .badge {
      width: 28px;
      background-color: $skb-green;
    }
  }
}

.inner-button {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  // justify-content: center;
  background-color: red;

  > a {
    color: white;
  }
}

/* ------------------------------------ */

.ydl-container {
  margin: 20px;
  height: 100%;
  display: flex;
}

.navigation {
  width: 270px;
  background-color: #fff;
  @include box-shadow(0 0 15px 1px rgba(0, 0, 0, 0.23));
}

.recent-uploads {
  margin-top: 20px;
  width: 270px;
  height: 240px;
  background-color: #fff;
  @include box-shadow(0 0 15px 1px rgba(0, 0, 0, 0.23));
}

.profile-content-container {
  flex: 1;
  margin: 0 20px;
  background-color: #fff;
  @include box-shadow(0 0 15px 1px rgba(0, 0, 0, 0.23));
  overflow: auto;
}

.profile-container {
  overflow: auto;
}

.left-sidebar {
  width: 270px;
  height: 100%;
}
</style>
