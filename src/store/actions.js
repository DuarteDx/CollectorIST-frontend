import * as types from './mutation-types'

export const finishInitialLoading = async ({ commit }) => {
  commit(types.FINISH_INITIAL_LOADING)
}

export const setTopMessage = async ({ commit }, { active, msg, dismiss, type }) => {
  commit(types.SET_TOP_MESSAGE, { active, msg, dismiss, type })
}
