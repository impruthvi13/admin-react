import { AUTH_ACTION_TYPES } from './auth.types'

const INITIAL_AUTH = {
  auth: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
  authError: null,
  authResponse: null
}

export const authReducer = (state = INITIAL_AUTH, action) => {
  const { type, payload } = action
  switch (type) {
    case AUTH_ACTION_TYPES.LOGIN_USER_START:
      return {
        ...state,
        isLoading: true
      }
    case AUTH_ACTION_TYPES.LOGIN_USER_START_SUCCESS:
      return {
        ...state,
        auth: payload.data.data,
        isLoading: false,
        token: payload.headers['x-authorization-token'],
        authResponse: payload?.data?.meta?.message,
        isAuthenticated: true
      }
    case AUTH_ACTION_TYPES.LOGIN_USER_START_FAILED:
      return { ...state, isLoading: false, authError: payload?.response?.data?.meta?.message }
    case AUTH_ACTION_TYPES.SET_RESPONSE_NULL:
        return { ...state, isLoading: false, authError: null }
    default:
      return state
  }
}
