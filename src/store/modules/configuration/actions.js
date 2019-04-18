import * as types from './mutation-types'
import * as rootTypes from '@/store/mutation-types'
import ConfigurationAPI from '@/api/configuration'

export const fetch = async ({ commit }) => {
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await ConfigurationAPI.get()
    commit(types.RECEIVED_CONFIGURATION, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}
