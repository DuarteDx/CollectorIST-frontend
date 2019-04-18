import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const getDefaultState = () => {
  return {
    name: undefined,
    email: undefined,
    username: undefined,
    affiliations: undefined,
    aliases: undefined,
    canClickNext: false
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
