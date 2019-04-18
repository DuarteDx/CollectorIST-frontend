import * as types from './mutation-types'

export const updateStepNumber = ({ commit }, { stepNumber }) => {
  commit(types.UPDATE_STEP_NUMBER, { stepNumber })
}

export const updateSteps = ({ commit }, { steps }) => {
  commit(types.UPDATE_STEPS, { steps })
}

export const updateNewRecord = ({ commit }, { newRecord }) => {
  commit(types.UPDATE_NEW_RECORD, { newRecord })
}

export const updateValidation = ({ commit }, { validation }) => {
  commit(types.UPDATE_VALIDATION, { validation })
}

export const updateNextValid = ({ commit }, { valid }) => {
  commit(types.UPDATE_NEXT_VALID, { valid })
}

export const updateFile = ({ commit }, { file }) => {
  commit(types.UPDATE_FILE, { file })
}

export const removeFile = ({ commit }, { file }) => {
  commit(types.REMOVE_FILE, { file })
}

export const updateIteration = ({ state, commit }) => {
  commit(types.UPDATE_ITERATION, { iteration: state.iteration + 1 })
}
