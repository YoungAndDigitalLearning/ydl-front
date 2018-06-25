import { LOGIN_BEGIN, LOGIN_END, LOGOUT, LOGIN_SUCCESS, GET_ANNOUNCEMENTS, GET_USER, SIGNUP_BEGIN, SIGNUP_END, GET_COURSES, VIEW_COURSE } from "./mutations-types"

export const mutations = {
  [SIGNUP_BEGIN] (state) {
    state.signupPending = true
  },
  [SIGNUP_END] (state) {
    state.signupPending = false
  },
  [GET_ANNOUNCEMENTS] (state, announcements) {
    state.announcements = announcements
  },
  [GET_COURSES] (state, courses) {
    var ownCourses = []
    var joinedCourses = []
    courses.forEach(course => {
      if (course.teacher === state.user.id) {
        ownCourses.push(course)
      } else {
        joinedCourses.push(course)
      }
    })
    state.own_courses = ownCourses
    state.joined_courses = joinedCourses
  },
  [GET_USER] (state, user) {
    state.user = user
  },
  [LOGIN_BEGIN] (state) {
    state.loginPending = true
  },
  [LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true
  },
  [LOGIN_END] (state) {
    state.loginPending = false
  },
  [LOGOUT] (state) {
    state.isLoggedIn = false
  },
  [VIEW_COURSE] (state, id) {
    state.currentViewingCourse = id
  }
}
