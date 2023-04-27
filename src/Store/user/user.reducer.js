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
  error: null,
  user: null
}

export const userReducer = (state = INITIAL_USER, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_ACTION_TYPES.FETCH_USER_START:
      return { ...state, isLoading: true }
    case USER_ACTION_TYPES.FETCH_USER_FAILED || USER_ACTION_TYPES.CHANGE_USER_STATUS_FAILED || USER_ACTION_TYPES.UPDATE_USER_FAILED:
      return { ...state, isLoading: false, error: payload?.response?.data?.meta?.message }
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
    case USER_ACTION_TYPES.CHANGE_USER_STATUS_START:
      return {
        ...state,
        users: payload.users,
        isLoading: true
      }
    case USER_ACTION_TYPES.CHANGE_USER_STATUS_SUCCESS:
      return {
        ...state,
        resMessage: payload?.meta?.message,
        isLoading: false
      }
    case USER_ACTION_TYPES.SET_USER_RESPONSE_NULL:
      return { ...state, resMessage: null, error: null }
    case USER_ACTION_TYPES.ADD_USER_START:
      return { ...state, isLoading: true }
    case USER_ACTION_TYPES.ADD_USER_SUCCESS:
      return {
        ...state,
        resMessage: payload?.meta?.message,
        isLoading: false
      }
    case USER_ACTION_TYPES.UPDATE_USER_START:
      return { ...state, isLoading: true }
    case USER_ACTION_TYPES.UPDATE_USER_SUCCESS:
      return {
        ...state,
        resMessage: payload?.meta?.message,
        isLoading: false
      }
    case USER_ACTION_TYPES.SHOW_USER_START:
      return { ...state, isLoading: true }
    case USER_ACTION_TYPES.SHOW_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: payload.data
        }
    case USER_ACTION_TYPES.DELETE_USER_START:
      return { ...state, isLoading: true }
    case USER_ACTION_TYPES.DELETE_USER_SUCCESS:
      return { ...state, isLoading: false, users: payload.users, resMessage: payload?.user?.meta?.message }
      case USER_ACTION_TYPES.DELETE_USER_FAILED:
        return { ...state, isLoading: false, error: payload?.response?.data?.meta?.message }
    default:
      return state
  }
}
