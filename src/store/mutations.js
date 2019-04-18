import * as types from './mutation-types'

export default {
  [types.SENT_REQUEST_TO_SERVER] (state) {
    state.pendingRequestsToServer++
  },
  [types.RECEIVED_RESPONSE_FROM_SERVER] (state) {
    state.pendingRequestsToServer--
  },
  [types.FINISH_INITIAL_LOADING] (state) {
    state.isInitialLoading = false
  },
  [types.SET_TOP_MESSAGE] (state, { active, msg, dismiss, type }) {
    state.topMessage = { active, msg, dismiss, type }
  }
}
