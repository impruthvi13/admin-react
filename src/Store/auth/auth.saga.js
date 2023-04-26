import { takeLatest, call, all, put } from 'redux-saga/effects'

import {
  changePasswordFailed,
  changePasswordSuccess,
  editProfileFailed,
  editProfileSuccess,
  getLoggedInDetailsFailed,
  getLoggedInDetailsSuccess,
  loginUserFailed,
  loginUserSuccess
} from './auth.action'
import { AUTH_ACTION_TYPES } from './auth.types'
import { changeAdminPassword, editProfile, getLoginDetails, loginUser } from '../Actions/auth'

export function * loginUsersAsync (action) {
  try {
    const usersArray = yield call(loginUser, action.payload)
    yield put(loginUserSuccess(usersArray))
  } catch (error) {
    yield put(loginUserFailed(error))
  }
}

export function * changePasswordAsync (action) {
  try {
    const user = yield call(changeAdminPassword, action.payload)
    yield put(changePasswordSuccess(user))
  } catch (error) {
    yield put(changePasswordFailed(error))
  }
}

export function * getLoggedInDetailsAsync (action) {
  try {
    const user = yield call(getLoginDetails, action.payload)
    yield put(getLoggedInDetailsSuccess(user))
  } catch (error) {
    yield put(getLoggedInDetailsFailed(error))
  }
}

export function * editProfileAsync (action) {
  try {
    console.log(action)
    const user = yield call(editProfile, action.payload)
    yield put(editProfileSuccess(user))
  } catch (error) {
    yield put(editProfileFailed(error))
  }
}

export function * onUserLogin () {
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_USER_START, loginUsersAsync)
}

export function * onChangePassword () {
  yield takeLatest(AUTH_ACTION_TYPES.CHANGE_PASSWORD_START, changePasswordAsync)
}

export function * onGetLoggedInDetails () {
  yield takeLatest(AUTH_ACTION_TYPES.GET_LOGGED_IN_DETAILS_START, getLoggedInDetailsAsync)
}

export function * onEditProfile () {
  yield takeLatest(AUTH_ACTION_TYPES.EDIT_PROFILE_START, editProfileAsync)
}

export function * authSagas () {
  yield all([call(onUserLogin), call(onChangePassword), call(onGetLoggedInDetails), call(onEditProfile)])
}
