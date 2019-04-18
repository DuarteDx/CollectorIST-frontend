import * as types from './mutation-types'

export const updateCanClickNext = async ({ commit }, { canClickNext }) => {
  commit(types.UPDATE_CAN_CLICK_NEXT, { canClickNext })
}

export const updateName = async ({ commit }, { name }) => {
  commit(types.UPDATE_NAME, { name })
}

export const updateEmail = async ({ commit }, { email }) => {
  commit(types.UPDATE_EMAIL, { email })
}

export const updateUsername = async ({ commit }, { username }) => {
  commit(types.UPDATE_USERNAME, { username })
}

export const updateAffiliations = async ({ commit }, { affiliations }) => {
  commit(types.UPDATE_AFFILIATIONS, { affiliations })
}

export const updateAliases = async ({ commit }, { aliases }) => {
  commit(types.UPDATE_ALIASES, { aliases })
}
