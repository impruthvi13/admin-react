import { takeLatest, call, all, put } from 'redux-saga/effects'

import {
  changePasswordFailed,
  changePasswordSuccess,
    loginUserFailed,
    loginUserSuccess
} from './auth.action'
import { AUTH_ACTION_TYPES } from './auth.types'
import { changeAdminPassword, loginUser } from '../Actions/auth'
// import { getUsers } from '../Actions/user'

export function * loginUsersAsync (action) {
  try {
    const usersArray = yield call(loginUser, action.payload)
    console.log(usersArray)
    yield put(loginUserSuccess(usersArray))
  } catch (error) {
    yield put(loginUserFailed(error))
  }
}

export function * changePasswordAsync (action) {
  try {
    console.log(action)
    const user = yield call(changeAdminPassword, action.payload)
    yield put(changePasswordSuccess(user))
  } catch (error) {
    yield put(changePasswordFailed(error))
  }
}

export function * onUserLogin () {
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_USER_START, loginUsersAsync)
}

export function * onChangePassword () {
  yield takeLatest(AUTH_ACTION_TYPES.CHANGE_PASSWORD_START, changePasswordAsync)
}

export function * authSagas () {
  yield all([call(onUserLogin), call(onChangePassword)])
}
