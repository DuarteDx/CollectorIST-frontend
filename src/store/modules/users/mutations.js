import * as types from './mutation-types'

export default {
  [types.FETCH_USERS] (state) {
    state.list = undefined
  },
  [types.RECEIVED_USERS] (state, { usersPage }) {
    state.list = usersPage
  }
}
