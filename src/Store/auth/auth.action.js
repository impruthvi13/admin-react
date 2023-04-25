import { createAction } from '../../utils/reducer/reducer.util'
import { AUTH_ACTION_TYPES } from './auth.types'

export const loginUserStart = (payload) => createAction(AUTH_ACTION_TYPES.LOGIN_USER_START, payload)
export const loginUserSuccess = (user) =>
  createAction(AUTH_ACTION_TYPES.LOGIN_USER_START_SUCCESS, user)

export const loginUserFailed = (error) =>
  createAction(AUTH_ACTION_TYPES.LOGIN_USER_START_FAILED, error)

  export const changePasswordStart = (payload) => createAction(AUTH_ACTION_TYPES.CHANGE_PASSWORD_START, payload)
  export const changePasswordSuccess = (user) =>
    createAction(AUTH_ACTION_TYPES.CHANGE_PASSWORD_SUCCESS, user)
  export const changePasswordFailed = (error) =>
    createAction(AUTH_ACTION_TYPES.CHANGE_PASSWORD_FAILED, error)

export const setResponseNull = () =>
  createAction(AUTH_ACTION_TYPES.SET_RESPONSE_NULL)
