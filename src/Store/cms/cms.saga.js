import { takeLatest, call, all, put } from 'redux-saga/effects'
import { CMS_ACTION_TYPES } from './cms.types'
import { getCMS, showCMS } from './cms.api'
import { fetchCMSFailed, fetchCMSSuccess, showCMSFailed, showCMSSuccess } from './cms.action'

export function * fetchCMSAsync (action) {
  try {
    console.log(action)
    const cmsArray = yield call(getCMS, action.payload)
    yield put(fetchCMSSuccess({ cmsArray, params: action.payload }))
  } catch (error) {
    yield put(fetchCMSFailed(error))
  }
}

export function * showCMSAsync (action) {
  try {
    const cms = yield call(showCMS, action.payload)
    yield put(showCMSSuccess(cms))
  } catch (error) {
    yield put(showCMSFailed(error))
  }
}

export function * onFetchCMS () {
  yield takeLatest(CMS_ACTION_TYPES.FETCH_CMS_START, fetchCMSAsync)
}

export function * onShowCMS () {
  yield takeLatest(CMS_ACTION_TYPES.SHOW_CMS_START, showCMSAsync)
}

export function * cmsSagas () {
  yield all([call(onFetchCMS), call(onShowCMS)])
}
