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

export const addUserStart = (payload) =>
  createAction(USER_ACTION_TYPES.ADD_USER_START, payload)

export const addUserSuccess = (user) =>
  createAction(USER_ACTION_TYPES.ADD_USER_SUCCESS, user)

export const addUserFailed = (error) =>
  createAction(USER_ACTION_TYPES.ADD_USER_FAILED, error)

export const updateUserStart = (payload) =>
  createAction(USER_ACTION_TYPES.UPDATE_USER_START, payload)

export const updateUserSuccess = (user) =>
  createAction(USER_ACTION_TYPES.UPDATE_USER_SUCCESS, user)

export const updateUserFailed = (error) =>
  createAction(USER_ACTION_TYPES.UPDATE_USER_FAILED, error)

export const showUserStart = (payload) =>
  createAction(USER_ACTION_TYPES.SHOW_USER_START, payload)

export const showUserSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SHOW_USER_SUCCESS, user)

export const showUserFailed = (error) =>
  createAction(USER_ACTION_TYPES.SHOW_USER_FAILED, error)
