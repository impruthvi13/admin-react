import { takeLatest, call, all, put } from 'redux-saga/effects'

import {
  addUserSuccess,
  deleteUserFailed,
  deleteUserSuccess,
  fetchUserFailed,
  fetchUserStatusSuccess,
  fetchUserSuccess,
  showUserFailed,
  showUserSuccess,
  updateUserFailed,
  updateUserSuccess
} from './user.action'
import { USER_ACTION_TYPES } from './user.types'
import { addUser, deleteUser, editUser, getUsers, showUser } from './user.api'

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
    const index = action.payload.index
    const usersArray = [...action.payload.users]
    usersArray[index].active = action.payload?.data?.is_active
    const editedUser = yield call(editUser, action.payload)
    yield put(fetchUserStatusSuccess({ users: usersArray, editedUser, params: action.payload }))
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

export function * showUserAsync (action) {
  try {
    const user = yield call(showUser, action.payload)
    yield put(showUserSuccess(user))
  } catch (error) {
    yield put(showUserFailed(error))
  }
}

export function * deleteUserAsync ({ payload: { id, users, token } }) {
  try {
    const filteredUsers = users.filter((user) => user.custom_id !== id)
    const deletedUser = yield call(deleteUser, { token, id })
    yield put(deleteUserSuccess({ users: filteredUsers, user: deletedUser }))
  } catch (error) {
    yield put(deleteUserFailed(error))
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

export function * onShowUser () {
  yield takeLatest(USER_ACTION_TYPES.SHOW_USER_START, showUserAsync)
}

export function * onDeleteUser () {
  yield takeLatest(USER_ACTION_TYPES.DELETE_USER_START, deleteUserAsync)
}

export function * userSagas () {
  yield all([call(onFetchUsers), call(onChangeUserStatus), call(onAddUser), call(onUpdateUser), call(onShowUser), call(onDeleteUser)])
}
