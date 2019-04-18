import Vue from 'vue'
import client from '@/api/client'
import moment from 'moment'

async function getExternalProfiles () {
  const response = await client.get(`/profile/external-profiles`)
  return { externalProfiles: response.data }
}

async function sendOAuthCodeToServer ({ provider, code, nonce }) {
  return client.get(`/profile/external-profiles/${provider}/oauth/callback`, { params: {
    code,
    nonce
  } })
}

async function checkExternalProfileKeyAndSave ({ provider, key }) {
  const response = await client.put(`/profile/external-profiles/${provider}/key/${key}`)
  return response.data
}

async function syncExternalProfile ({ provider }) {
  return client.put(`/profile/external-profiles/${provider}/sync`)
}

async function get () {
  const response = await client.get(`/profile`)
  Vue.i18n.set(response.data.locale)
  moment.locale(response.data.locale)
  return { profile: response.data }
}

async function update (payload) {
  const response = await client.put(`/profile`, payload)
  return { profile: response.data }
}

async function removeExternalProfile ({ provider }) {
  await client.delete(`/profile/external-profiles/${provider}`)
}

async function getAliases () {
  const response = await client.get(`/profile/aliases`)
  return { aliases: response.data }
}

async function getAffiliations () {
  const response = await client.get(`/profile/affiliations`)
  return { affiliations: response.data }
}

async function getSettings () {
  const response = await client.get(`/profile/settings`)
  return { settings: response.data }
}

async function getEmails () {
  const response = await client.get(`/profile/emails`)
  return { emails: response.data }
}

async function removeEmail ({ id }) {
  const response = await client.delete(`/profile/emails/${id}`)
  return { result: response.data }
}

async function addEmail ({ email, primary }) {
  const response = await client.post('/profile/emails', {
    email,
    primary
  })
  return { result: response.data }
}

async function updateEmail ({ id, primary, token }) {
  const response = await client.put(`/profile/emails/${id}`, {
    ...primary && { primary },
    ...token && { token }
  })
  return { result: response.data }
}

async function updateSettings (payload) {
  const response = await client.put('/profile', payload)
  return { result: response.data }
}

async function addEmailVerificationRequest ({ emailId }) {
  const response = await client.post(`/profile/emails/${emailId}/verification-requests`)
  return { result: response.data }
}

async function addAffiliation ({ unitID, start, end }) {
  const response = await client.post(`/profile/affiliations`, {
    unitID,
    start,
    ...end && { end }
  })
  return { result: response.data }
}

async function removeAffiliation ({ id }) {
  const response = await client.delete(`/profile/affiliations/${id}`)
  return { result: response.data }
}

export default {
  checkExternalProfileKeyAndSave,
  getExternalProfiles,
  update,
  removeExternalProfile,
  syncExternalProfile,
  get,
  getAffiliations,
  sendOAuthCodeToServer,
  getAliases,
  getSettings,
  getEmails,
  removeEmail,
  addEmail,
  updateEmail,
  updateSettings,
  addAffiliation,
  removeAffiliation,
  addEmailVerificationRequest
}
