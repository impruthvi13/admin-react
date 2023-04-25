import { takeLatest, call, all, put } from 'redux-saga/effects'

import {
    loginUserFailed,
    loginUserSuccess
} from './auth.action'
import { AUTH_ACTION_TYPES } from './auth.types'
import { loginUser } from '../Actions/auth'
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

export function * onUserLogin () {
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_USER_START, loginUsersAsync)
}

export function * authSagas () {
  yield all([call(onUserLogin)])
}
