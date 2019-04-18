import * as types from './mutation-types'

export default {
  [types.RECEIVED_CONFIGURATION] (state, { configuration }) {
    state.current = configuration
  }
}
