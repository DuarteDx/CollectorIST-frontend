import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const getDefaultState = () => {
  return {
    list: undefined,
    current: undefined,
    affiliations: undefined,
    coAuthors: undefined,
    fundings: undefined,
    records: undefined,
    supervisions: undefined,
    bio: undefined
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
