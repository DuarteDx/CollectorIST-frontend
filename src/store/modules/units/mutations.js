import * as types from './mutation-types'

export default {
  [types.FETCH_UNIT] (state) {
    state.current = undefined
  },
  [types.RECEIVED_UNIT] (state, { unit }) {
    state.current = unit
  },
  [types.FETCH_UNITS] (state) {
    state.list = undefined
  },
  [types.RECEIVED_UNITS] (state, { unitsPage }) {
    state.list = unitsPage
  },
  [types.FETCH_UNIT_TYPES] (state) {
    state.listTypes = undefined
  },
  [types.RECEIVED_UNIT_TYPES] (state, { unitTypes }) {
    state.listTypes = unitTypes
  },
  [types.FETCH_RECORDS] (state) {
    state.records = undefined
  },
  [types.RECEIVED_RECORDS] (state, { recordsPage }) {
    state.records = recordsPage
  },
  [types.FETCH_MEMBERS] (state) {
    state.members = undefined
  },
  [types.RECEIVED_MEMBERS] (state, { membersPage }) {
    state.members = membersPage
  },
  [types.FETCH_MANAGERS] (state) {
    state.managers = undefined
  },
  [types.RECEIVED_MANAGERS] (state, { managersPage }) {
    state.managers = managersPage
  },
  [types.FETCH_SUBUNITS] (state) {
    state.subUnitsPage = undefined
  },
  [types.RECEIVED_SUBUNITS] (state, { subUnitsPage }) {
    console.log(subUnitsPage)
    state.subUnitsPage = subUnitsPage
  },
  [types.REQUEST_CREATE_UNIT] (state) {
  },
  [types.RECEIVED_UNIT_CREATE_ACK] (state) {
  },
  [types.REQUEST_UPDATE_UNIT] (state) {
  },
  [types.RECEIVED_UPDATE_UNIT_ACK] (state) {
  },
  [types.REQUEST_DELETE_UNIT] (state) {
  },
  [types.RECEIVED_UNIT_DELETE_ACK] (state) {
  },

  [types.REQUEST_CREATE_UNIT_MEMBER] (state) {
  },
  [types.RECEIVED_UNIT_MEMBER_CREATE_ACK] (state) {
  },
  [types.REQUEST_UPDATE_UNIT_MEMBER] (state) {
  },
  [types.RECEIVED_UPDATE_MEMBER_UNIT_ACK] (state) {
  },
  [types.REQUEST_DELETE_UNIT_MEMBER] (state) {
  },
  [types.RECEIVED_UNIT_MEMBER_DELETE_ACK] (state) {
  }
}
