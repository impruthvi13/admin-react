import { createAction } from '../../utils/reducer/reducer.util'
import { USER_ACTION_TYPES } from './user.types'

export const fetchUserStart = (payload) =>
  createAction(USER_ACTION_TYPES.FETCH_USER_START, payload)

export const fetchUserSuccess = (userArray) =>
  createAction(USER_ACTION_TYPES.FETCH_USER_SUCCESS, userArray)

export const fetchUserFailed = (error) =>
  createAction(USER_ACTION_TYPES.FETCH_USER_FAILED, error)
