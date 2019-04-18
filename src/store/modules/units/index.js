import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const getDefaultState = () => {
  return {
    list: undefined,
    listTypes: undefined,
    current: undefined,
    members: undefined,
    managers: undefined,
    records: undefined,
    subUnitsPage: undefined
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
