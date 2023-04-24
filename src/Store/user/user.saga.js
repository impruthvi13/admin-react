import { takeLatest, call, all, put } from 'redux-saga/effects'

import {
  addUserSuccess,
  fetchUserFailed, fetchUserStatusSuccess, fetchUserSuccess, updateUserFailed, updateUserSuccess
} from './user.action'
import { USER_ACTION_TYPES } from './user.types'
import { addUser, editUser, getUsers } from '../Actions/user'
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

export function * addUserAsync (action) {
  try {
    const addNewUser = yield call(addUser, action.payload)
    yield put(addUserSuccess(addNewUser))
  } catch (error) {
    yield put(fetchUserFailed(error))
  }
}

export function * updateUserAsync (action) {
  try {
    const editedUser = yield call(editUser, action.payload)
    yield put(updateUserSuccess(editedUser))
  } catch (error) {
    yield put(updateUserFailed(error))
  }
}

export function * onFetchUsers () {
  yield takeLatest(USER_ACTION_TYPES.FETCH_USER_START, fetchUsersAsync)
}

export function * onChangeUserStatus () {
  yield takeLatest(USER_ACTION_TYPES.CHANGE_USER_STATUS_START, changeUserStatusAsync)
}

export function * onAddUser () {
  yield takeLatest(USER_ACTION_TYPES.ADD_USER_START, addUserAsync)
}

export function * onUpdateUser () {
  yield takeLatest(USER_ACTION_TYPES.UPDATE_USER_START, updateUserAsync)
}

export function * userSagas () {
  yield all([call(onFetchUsers), call(onChangeUserStatus), call(onAddUser), call(onUpdateUser)])
}
