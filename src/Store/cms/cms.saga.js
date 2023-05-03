import { takeLatest, call, all, put } from 'redux-saga/effects'
import { CMS_ACTION_TYPES } from './cms.types'
import { getCMS } from './cms.api'
import { fetchCMSFailed, fetchCMSSuccess } from './cms.action'

export function * fetchCMSAsync (action) {
  try {
    console.log(action)
    const cmsArray = yield call(getCMS, action.payload)
    yield put(fetchCMSSuccess({ cmsArray, params: action.payload }))
  } catch (error) {
    yield put(fetchCMSFailed(error))
  }
}

export function * onFetchCMS () {
  yield takeLatest(CMS_ACTION_TYPES.FETCH_CMS_START, fetchCMSAsync)
}

export function * cmsSagas () {
  yield all([call(onFetchCMS)])
}
