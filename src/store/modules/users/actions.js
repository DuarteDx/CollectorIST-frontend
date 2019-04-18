import * as types from './mutation-types'
import * as rootTypes from '@/store/mutation-types'
import UsersAPI from '@/api/users'

export const fetchMany = async ({ commit }, { page, perPage, sort, q }) => {
  commit(types.FETCH_USERS)
  commit(rootTypes.SENT_REQUEST_TO_SERVER, null, { root: true })
  try {
    const data = await UsersAPI.list({ page, perPage, sort, q })
    commit(types.RECEIVED_USERS, data)
  } finally {
    commit(rootTypes.RECEIVED_RESPONSE_FROM_SERVER, null, { root: true })
  }
}
