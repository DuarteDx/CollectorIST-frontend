import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const getDefaultState = () => {
  return {
    current: undefined,
    externalProfiles: undefined,
    aliases: [],
    settings: undefined,
    emails: [],
    primaryEmailId: undefined
  }
}

const state = getDefaultState()

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  getDefaultState
}
