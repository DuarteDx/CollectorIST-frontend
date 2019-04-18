import * as recordMutationTypes from '../records/mutation-types'
import * as types from './mutation-types'
import * as rootTypes from '@/store/mutation-types'
import UnitsAPI from '@/api/units'

export const fetchOne = async ({ commit }, { unitID }) => {
  commit(types.FETCH_UNIT)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UnitsAPI.get({ unitID })
    commit(types.RECEIVED_UNIT, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchMany = async ({ commit }, { page, perPage, sort, q, ignored, clean }) => {
  commit(types.FETCH_UNITS)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    if (clean) {
      commit(types.RECEIVED_UNITS, undefined)
    } else {
      const data = await UnitsAPI.list({ page, perPage, sort, q, ignored })
      commit(types.RECEIVED_UNITS, data)
    }
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchTypes = async ({ commit }) => {
  commit(types.FETCH_UNIT_TYPES)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UnitsAPI.listTypes()
    commit(types.RECEIVED_UNIT_TYPES, { unitTypes: data })
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchRecords = async ({ commit }, { unitID, page, perPage, sort, q }) => {
  commit(`records/${recordMutationTypes.FETCH_RECORDS}`, null, { root: true })
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UnitsAPI.getRecords({ unitID, q, page, perPage })
    commit(`records/${recordMutationTypes.RECEIVED_RECORDS}`, data, { root: true })
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchMembers = async ({ commit }, { unitID, page, perPage, sort, q, verified, ended }) => {
  commit(types.FETCH_MEMBERS)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UnitsAPI.getMembers({ unitID, page, perPage, sort, q, verified, ended })
    commit(types.RECEIVED_MEMBERS, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchManagers = async ({ commit }, { unitID, page, perPage, sort, q }) => {
  commit(types.FETCH_MANAGERS)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UnitsAPI.getManagers({ unitID, page, perPage, sort, q })
    commit(types.RECEIVED_MANAGERS, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchUnitSubUnits = async ({ commit }, { unitID, page, perPage, sort, q }) => {
  commit(types.FETCH_SUBUNITS)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UnitsAPI.getSubUnits({ unitID, page, perPage, sort, q })
    commit(types.RECEIVED_SUBUNITS, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const create = async ({ commit }, { payload }) => {
  commit(types.REQUEST_CREATE_UNIT)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UnitsAPI.create({ payload })
    commit(types.RECEIVED_UNIT_CREATE_ACK, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const remove = async ({ commit }, { id }) => {
  commit(types.REQUEST_DELETE_UNIT)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UnitsAPI.remove({ id })
    commit(types.RECEIVED_UNIT_DELETE_ACK, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const update = async ({ commit }, { unitID, unit }) => {
  commit(types.REQUEST_UPDATE_UNIT)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await UnitsAPI.update({ unitID, unit })
    commit(types.RECEIVED_UPDATE_UNIT_ACK, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const createMember = async ({ commit }, { unitID, memberId, start, end }) => {
  commit(types.REQUEST_CREATE_UNIT)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await UnitsAPI.addMember({ unitID, memberId, start, end })
    commit(types.RECEIVED_UNIT_CREATE_ACK, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const removeMember = async ({ commit }, { unitID, memberId }) => {
  commit(types.REQUEST_DELETE_UNIT)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await UnitsAPI.removeMember({ unitID, memberId })
    commit(types.RECEIVED_UNIT_DELETE_ACK, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const updateMember = async ({ commit }, { unitID, memberId, verified }) => {
  commit(types.REQUEST_UPDATE_UNIT)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UnitsAPI.updateMember({ unitID, memberId, verified })
    commit(types.RECEIVED_UPDATE_UNIT_ACK, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}
