import * as types from './mutation-types'

export default {
  [types.UPDATE_CAN_CLICK_NEXT] (state, { canClickNext }) {
    state.canClickNext = canClickNext
  },
  [types.UPDATE_NAME] (state, { name }) {
    state.name = name
  },
  [types.UPDATE_EMAIL] (state, { email }) {
    state.email = email
  },
  [types.UPDATE_USERNAME] (state, { username }) {
    state.username = username
  },
  [types.UPDATE_AFFILIATIONS] (state, { affiliations }) {
    state.affiliations = affiliations
  },
  [types.UPDATE_ALIASES] (state, { aliases }) {
    state.aliases = aliases
  }
}
