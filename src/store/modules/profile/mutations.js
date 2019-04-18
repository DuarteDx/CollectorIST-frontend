import * as types from './mutation-types'

export default {
  [types.FETCH_PROFILE] (state) {
    state.current = undefined
  },
  [types.RECEIVED_PROFILE] (state, { profile }) {
    state.current = profile
  },
  [types.FETCH_EXTERNAL_PROFILES] (state) {
    state.externalProfiles = undefined
  },
  [types.RECEIVED_EXTERNAL_PROFILES] (state, { externalProfiles }) {
    state.externalProfiles = externalProfiles
  },
  [types.FETCH_ALIASES] (state) {
    state.aliases = undefined
  },
  [types.RECEIVED_ALIASES] (state, { aliases }) {
    state.aliases = aliases
  },
  [types.FETCH_SETTINGS] (state) {
    state.settings = undefined
  },
  [types.RECEIVED_SETTINGS] (state, { settings }) {
    state.settings = settings
  },
  [types.FETCH_EMAILS] (state) {
    state.emails = undefined
    state.primaryEmailId = undefined
  },
  [types.RECEIVED_EMAILS] (state, { emails }) {
    state.emails = emails.emails
    state.primaryEmailId = emails.primaryEmailId
  }
}
