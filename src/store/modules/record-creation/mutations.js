import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.UPDATE_STEP_NUMBER] (state, { stepNumber }) {
    state.stepNumber = stepNumber
  },
  [types.UPDATE_STEPS] (state, { steps }) {
    state.steps = steps
  },
  [types.UPDATE_NEW_RECORD] (state, { newRecord }) {
    state.newRecord = newRecord
  },
  [types.UPDATE_VALIDATION] (state, { validation }) {
    state.validation = validation
  },
  [types.UPDATE_ITERATION] (state, { iteration }) {
    state.iteration = iteration
  },
  [types.UPDATE_NEXT_VALID] (state, { valid }) {
    state.nextValid = valid
  },
  [types.UPDATE_FILE] (state, { file }) {
    Vue.set(state.files, file.id, file)
  },
  [types.REMOVE_FILE] (state, { file }) {
    for (const key in state.files) {
      if (state.files.hasOwnProperty(key)) {
        if (state.files[key].id === file.id) {
          Vue.delete(state.files, key)
        }
      }
    }
  }
}
