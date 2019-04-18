import * as types from './mutation-types'

export default {
  [types.FETCH_RESEARCHER] (state) {
    state.current = undefined
  },
  [types.RECEIVED_RESEARCHER] (state, { researcher }) {
    state.current = researcher
  },
  [types.FETCH_RESEARCHERS] (state) {
    state.list = undefined
  },
  [types.RECEIVED_RESEARCHERS] (state, { researchersPage }) {
    state.list = researchersPage
  },
  [types.RECEIVED_RECORDS] (state, { recordsPage }) {
    state.records = recordsPage
  },
  [types.FETCH_AFFILIATIONS] (state) {
    state.affiliations = undefined
  },
  [types.RECEIVED_AFFILIATIONS] (state, { affiliationsPage }) {
    state.affiliations = affiliationsPage
  },
  [types.FETCH_COAUTHORS] (state) {
    state.coAuthors = undefined
  },
  [types.RECEIVED_COAUTHORS] (state, { coAuthorsPage }) {
    state.coAuthors = coAuthorsPage
  },
  [types.FETCH_FUNDINGS] (state) {
    state.fundings = undefined
  },
  [types.RECEIVED_FUNDINGS] (state, { fundingsPage }) {
    state.fundings = fundingsPage
  },
  [types.FETCH_SUPERVISIONS] (state) {
    state.supervisions = undefined
  },
  [types.RECEIVED_SUPERVISIONS] (state, { supervisionsPage }) {
    state.supervisions = supervisionsPage
  },
  [types.FETCH_BIO] (state) {
    state.bio = undefined
  },
  [types.RECEIVED_BIO] (state, { bio }) {
    state.bio = bio
  }
}
