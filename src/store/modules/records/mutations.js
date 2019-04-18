import * as types from './mutation-types'

export default {
  [types.FETCH_RECORD] (state) {
    state.current = undefined
  },
  [types.RECEIVED_RECORD] (state, { record }) {
    state.current = record
  },
  [types.FETCH_RECORDS] (state) {
    state.list = undefined
  },
  [types.RECEIVED_RECORDS] (state, { recordsPage }) {
    state.list = recordsPage
  }
}
