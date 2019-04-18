import * as types from './mutation-types'
import * as rootTypes from '@/store/mutation-types'
import ProfileAPI from '@/api/profile'

export const fetch = async ({ commit }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await ProfileAPI.get()
    commit(types.RECEIVED_PROFILE, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchExternalProfiles = async ({ commit }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  commit(types.FETCH_EXTERNAL_PROFILES)
  try {
    const data = await ProfileAPI.getExternalProfiles()
    commit(types.RECEIVED_EXTERNAL_PROFILES, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const syncExternalProfile = async ({ commit }, { provider }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    await ProfileAPI.syncExternalProfile({ provider })
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchAliases = async ({ commit }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  commit(types.FETCH_ALIASES)
  try {
    const data = await ProfileAPI.getAliases()
    commit(types.RECEIVED_ALIASES, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchSettings = async ({ commit }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  commit(types.FETCH_SETTINGS)
  try {
    const data = await ProfileAPI.getSettings()
    commit(types.RECEIVED_SETTINGS, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const fetchEmails = async ({ commit }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  commit(types.FETCH_EMAILS)
  try {
    const data = await ProfileAPI.getEmails()
    commit(types.RECEIVED_EMAILS, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const removeEmail = async ({ commit }, { id }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    await ProfileAPI.removeEmail({ id })
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const addEmail = async ({ commit }, { email, primary }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    await ProfileAPI.addEmail({ email, primary })
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const changePrimaryEmail = async ({ commit }, { id }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    await ProfileAPI.updateEmail({ id, primary: true })
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const updateSettings = async ({ commit }, payload) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    await ProfileAPI.updateSettings(payload)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const addEmailVerificationRequest = async ({ commit }, { emailId }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    await ProfileAPI.addEmailVerificationRequest({ emailId })
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}

export const resolveEmailVerificationRequest = async ({ commit }, { emailId, token }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    await ProfileAPI.updateEmail({ id: emailId, token })
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}
