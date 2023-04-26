import { createAction } from '../../utils/reducer/reducer.util'
import { AUTH_ACTION_TYPES } from './auth.types'

export const loginUserStart = (payload) =>
  createAction(AUTH_ACTION_TYPES.LOGIN_USER_START, payload)
export const loginUserSuccess = (user) =>
  createAction(AUTH_ACTION_TYPES.LOGIN_USER_START_SUCCESS, user)
export const loginUserFailed = (error) =>
  createAction(AUTH_ACTION_TYPES.LOGIN_USER_START_FAILED, error)

export const changePasswordStart = (payload) =>
  createAction(AUTH_ACTION_TYPES.CHANGE_PASSWORD_START, payload)
export const changePasswordSuccess = (user) =>
  createAction(AUTH_ACTION_TYPES.CHANGE_PASSWORD_SUCCESS, user)
export const changePasswordFailed = (error) =>
  createAction(AUTH_ACTION_TYPES.CHANGE_PASSWORD_FAILED, error)

export const getLoggedInDetailsStart = (payload) =>
  createAction(AUTH_ACTION_TYPES.GET_LOGGED_IN_DETAILS_START, payload)
export const getLoggedInDetailsSuccess = (user) =>
  createAction(AUTH_ACTION_TYPES.GET_LOGGED_IN_DETAILS_SUCCESS, user)
export const getLoggedInDetailsFailed = (error) =>
  createAction(AUTH_ACTION_TYPES.GET_LOGGED_IN_DETAILS_FAILED, error)

export const editProfileStart = (payload) =>
  createAction(AUTH_ACTION_TYPES.EDIT_PROFILE_START, payload)
export const editProfileSuccess = (user) =>
  createAction(AUTH_ACTION_TYPES.EDIT_PROFILE_SUCCESS, user)
export const editProfileFailed = (error) =>
  createAction(AUTH_ACTION_TYPES.EDIT_PROFILE_FAILED, error)

export const logoutStart = (payload) =>
  createAction(AUTH_ACTION_TYPES.LOGOUT_START, payload)
export const logoutSuccess = (user) =>
  createAction(AUTH_ACTION_TYPES.LOGOUT_SUCCESS)
export const logoutFailed = (error) =>
  createAction(AUTH_ACTION_TYPES.LOGOUT_FAILED, error)

export const setResponseNull = () =>
  createAction(AUTH_ACTION_TYPES.SET_RESPONSE_NULL)
