import { createAction } from '../../utils/reducer/reducer.util'
import { USER_ACTION_TYPES } from './user.types'

export const fetchUserStart = (payload) =>
  createAction(USER_ACTION_TYPES.FETCH_USER_START, payload)

export const fetchUserSuccess = (userArray) =>
  createAction(USER_ACTION_TYPES.FETCH_USER_SUCCESS, userArray)

export const fetchUserFailed = (error) =>
  createAction(USER_ACTION_TYPES.FETCH_USER_FAILED, error)

export const changeUserStatusStart = (payload) =>
  createAction(USER_ACTION_TYPES.CHANGE_USER_STATUS_START, payload)

export const fetchUserStatusSuccess = (userArray) =>
  createAction(USER_ACTION_TYPES.CHANGE_USER_STATUS_SUCCESS, userArray)

export const changeUserStatusFailed = (payload) =>
  createAction(USER_ACTION_TYPES.CHANGE_USER_STATUS_FAILED, payload)

export const setUserResponseNull = () =>
  createAction(USER_ACTION_TYPES.SET_USER_RESPONSE_NULL)
