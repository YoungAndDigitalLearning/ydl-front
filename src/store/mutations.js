import { LOGIN_BEGIN, LOGIN_END, LOGOUT, LOGIN_SUCCESS, GET_ANNOUNCEMENTS, GET_USER, SIGNUP_BEGIN, SIGNUP_END } from "./mutations-types"

export const mutations = {
  [SIGNUP_BEGIN] (state) {
    state.signupPending = true
  },
  [SIGNUP_END] (state) {
    state.signupPending = false
  },
  [GET_ANNOUNCEMENTS] (state, announcements) {
    console.log("mutation called announcements")
    console.log(state)
    console.log(announcements)
    state.announcements = announcements
  },
  [GET_USER] (state, user) {
    console.log("fired mutation")
    console.log(user)
    state.user = user
  },
  [LOGIN_BEGIN] (state) {
    console.log("MUTATION: LOGIN")
    state.loginPending = true
  },
  [LOGIN_SUCCESS] (state) {
    console.log("MUTATION: LOGIN_SUCCESS")
    state.isLoggedIn = true
  },
  [LOGIN_END] (state) {
    state.signupPedning = false
  },
  [LOGOUT] (state) {
    console.log("MUTATION: LOGOUT")
    state.isLoggedIn = false
  }
}
