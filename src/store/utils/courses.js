import api from "./api"

const GET_COURSES = "GET_COURSES"
const GET_COURSE = "GET_COURSE"

export const courseActions = {
  // noch irgendwann so machen das man nur noch getCollection callen muss ...
  // async getCollection ({ commit }, name) {
  // }
  async getCourses ({ commit }) {
    try {
      const response = await api.get("coursses/")
      commit("GET_COURSES", response.data)
      console.log(response)
    } catch (error) {
      console.error(error.response)
    }
  },
  async getCourse ({ commit }, id) {
    try {
      const response = await api.get("courses/" + id)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
}

export const courseMutations = {
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
  [GET_COURSE] (state, course) {
    
  }
}
