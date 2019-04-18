import * as recordMutationTypes from '../records/mutation-types'
import * as types from './mutation-types'
import ResearchersAPI from '@/api/researchers'

export const fetchOne = async ({ commit }, { userId }) => {
  commit(types.FETCH_RESEARCHER)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await ResearchersAPI.get({ userId })
    commit(types.RECEIVED_RESEARCHER, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const fetchMany = async ({ commit }, { q, sort, page, perPage }) => {
  commit(types.FETCH_RESEARCHERS)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await ResearchersAPI.list({ q, sort, page, perPage })
    commit(types.RECEIVED_RESEARCHERS, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

// ALTHOUGH WE WANT TO FETCH RECORDS FROM A DIFFERENT API, WE WANT TO CHANGE THE RECORDS STORE
export const fetchRecords = async ({ commit }, { userId, q, page, perPage }) => {
  commit(`records/${recordMutationTypes.FETCH_RECORDS}`, null, { root: true })
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await ResearchersAPI.getRecords({ userId, q, page, perPage })
    commit(`records/${recordMutationTypes.RECEIVED_RECORDS}`, data, { root: true })
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const fetchAffiliations = async ({ commit }, { userId, page, perPage, sort }) => {
  commit(types.FETCH_AFFILIATIONS)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await ResearchersAPI.getAffiliations({ userId, page, perPage, sort })
    commit(types.RECEIVED_AFFILIATIONS, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const fetchCoAuthors = async ({ commit }, { userId, page, perPage, q, sort }) => {
  commit(types.FETCH_COAUTHORS)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await ResearchersAPI.getCoAuthors({ userId, page, perPage, q, sort })
    commit(types.RECEIVED_COAUTHORS, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const fetchFundings = async ({ commit }, { userId, page, perPage, sort }) => {
  commit(types.FETCH_FUNDINGS)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await ResearchersAPI.getFundings({ userId, page, perPage, sort })
    commit(types.RECEIVED_FUNDINGS, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const fetchSupervisions = async ({ commit }, { userId, page, perPage, sort, q }) => {
  commit(types.FETCH_SUPERVISIONS)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await ResearchersAPI.getSupervisions({ userId, page, perPage, sort })
    commit(types.RECEIVED_SUPERVISIONS, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}

export const fetchBio = async ({ commit }, { userId, page, perPage, sort, q }) => {
  commit(types.FETCH_BIO)
  commit('SENT_REQUEST_TO_SERVER', null, { root: true })
  try {
    const data = await ResearchersAPI.getBio({ userId })
    commit(types.RECEIVED_BIO, data)
  } finally {
    commit('RECEIVED_RESPONSE_FROM_SERVER', null, { root: true })
  }
}
