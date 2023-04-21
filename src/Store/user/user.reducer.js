import { USER_ACTION_TYPES } from './user.types'

const INITIAL_USER = {
  users: [],
  limit: 10,
  offset: 0,
  search: null,
  sort_column: null,
  sort_order: null,
  usersCount: 0,
  resMessage: null,
  pageNo: 1,
  isLoading: false,
  error: null
}

export const userReducer = (state = INITIAL_USER, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_ACTION_TYPES.FETCH_USER_START:
      return { ...state, isLoading: true }
    case USER_ACTION_TYPES.FETCH_USER_FAILED:
      return { ...state, isLoading: false, error: payload }
    case USER_ACTION_TYPES.FETCH_USER_SUCCESS:
      return {
        ...state,
        users: payload && payload.usersArray.data,
        offset: payload && payload.usersArray.links ? payload.usersArray.links.offset : state.offset,
        limit: payload && payload.usersArray.links ? payload.usersArray.links.limit : state.limit,
        usersCount: payload && payload.usersArray.links.total_count,
        pageNo: payload && payload.params.pageNo ? payload.params.pageNo : state.pageNo,
        isLoading: false
      }

    default:
      return state
  }
}
