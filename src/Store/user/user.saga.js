import { takeLatest, call, all, put } from 'redux-saga/effects'

import {
  fetchUserFailed, fetchUserStatusSuccess, fetchUserSuccess
  // fetchUserSuccess
} from './user.action'
import { USER_ACTION_TYPES } from './user.types'
import { editUser, getUsers } from '../Actions/user'
// import { getUsers } from '../Actions/user'

export function * fetchUsersAsync (action) {
  try {
    const usersArray = yield call(getUsers, action.payload)
    yield put(fetchUserSuccess({ usersArray, params: action.payload }))
  } catch (error) {
    yield put(fetchUserFailed(error))
  }
}

export function * changeUserStatusAsync (action) {
  try {
    const editedUser = yield call(editUser, action.payload)
    yield put(fetchUserStatusSuccess(editedUser))
  } catch (error) {
    yield put(fetchUserFailed(error))
  }
}

export function * onFetchUsers () {
  yield takeLatest(USER_ACTION_TYPES.FETCH_USER_START, fetchUsersAsync)
}

export function * onChangeUserStatus () {
  yield takeLatest(USER_ACTION_TYPES.CHANGE_USER_STATUS_START, changeUserStatusAsync)
}

export function * userSagas () {
  yield all([call(onFetchUsers), call(onChangeUserStatus)])
}
