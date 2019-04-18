import * as types from './mutation-types'

export default {
  [types.FETCH_TASKS] (state) {
    state.list = undefined
  },
  [types.RECEIVED_TASKS] (state, { tasksPage }) {
    state.list = tasksPage
  }
}
