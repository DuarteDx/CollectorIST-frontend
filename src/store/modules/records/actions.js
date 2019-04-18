import * as types from './mutation-types'
import RecordsAPI from '@/api/records'

export const fetchOne = async ({ commit }, { id }) => {
  commit(types.FETCH_RECORD)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await RecordsAPI.get({ id })
    commit(types.RECEIVED_RECORD, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const fetchMany = async ({ commit }, { q, sort, page, perPage, templates }) => {
  commit(types.FETCH_RECORDS)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await RecordsAPI.list({ q, sort, page, perPage, templates })
    commit(types.RECEIVED_RECORDS, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const create = async ({ commit }, { id, payload }) => {
  commit(types.REQUEST_CREATE_RECORD)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await RecordsAPI.create({ id, payload })
    commit(types.RECEIVED_RECORD_CREATE_ACK, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const remove = async ({ commit }, { id }) => {
  commit(types.REQUEST_DELETE_RECORD)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await RecordsAPI.remove({ id })
    commit(types.RECEIVED_RECORD_DELETE_ACK, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const update = async ({ commit }, { id, payload }) => {
  commit(types.REQUEST_UPDATE_RECORD)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await RecordsAPI.update({ id, payload })
    commit(types.RECEIVED_UPDATE_RECORD_ACK, data)
    await fetchOne({ id })
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const fetchAttachment = async ({ commit }, { recordID, attachmendtID }) => {
  commit(types.FETCH_ATTACHMENT)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    await RecordsAPI.getAttachment({ recordID, attachmendtID })
    commit(types.RECEIVED_ATTACHMENT)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}
