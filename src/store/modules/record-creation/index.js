import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const getDefaultState = () => {
  return {
    stepNumber: 0,
    steps: [
      'SelectRecordTypeStep',
      'UploadRecordFileStep',
      'TitleRecordStep'
    ],
    newRecord: { },
    validation: { },
    files: { }, // Contains metadata directly associated with the files
    iteration: 0,
    nextValid: false
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
