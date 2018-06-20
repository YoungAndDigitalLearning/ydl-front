import { FETCH_USER, SIGN_UP, LOGIN, LOGOUT, LOGIN_SUCCESS, GET_ANNOUNCEMENTS } from "./mutations-types"

export const mutations = {
  [GET_ANNOUNCEMENTS] (state, announcements) {
    console.log("mutation called announcements")
    console.log(state)
    console.log(announcements)
    state.announcements = announcements
  },
  [FETCH_USER] (state, user) {
    console.log("fired mutation")
    console.log(user)
    state.user = user
  },
  [SIGN_UP] (state, user) {

  },
  [LOGIN] (state) {
    console.log("MUTATION: LOGIN")
    state.loginPending = true
  },
  [LOGIN_SUCCESS] (state) {
    console.log("MUTATION: LOGIN_SUCCESS")
    state.loginPending = false
    state.isLoggedIn = true
  },
  [LOGOUT] (state) {
    console.log("MUTATION: LOGOUT")
    state.isLoggedIn = false
  }
}
