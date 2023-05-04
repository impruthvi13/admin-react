import { createAction } from '../../utils/reducer/reducer.util'
import { CMS_ACTION_TYPES } from './cms.types'

export const fetchCMSStart = (payload) =>
  createAction(CMS_ACTION_TYPES.FETCH_CMS_START, payload)

export const fetchCMSSuccess = (cmsArray) =>
  createAction(CMS_ACTION_TYPES.FETCH_CMS_SUCCESS, cmsArray)

export const fetchCMSFailed = (error) =>
  createAction(CMS_ACTION_TYPES.FETCH_CMS_FAILED, error)

export const setCMSResponseNull = () =>
  createAction(CMS_ACTION_TYPES.SET_CMS_RESPONSE_NULL)

  export const showCMStart = (payload) =>
  createAction(CMS_ACTION_TYPES.SHOW_CMS_START, payload)

export const showCMSSuccess = (cms) =>
  createAction(CMS_ACTION_TYPES.SHOW_CMS_SUCCESS, cms)

export const showCMSFailed = (error) =>
  createAction(CMS_ACTION_TYPES.SHOW_CMS_FAILED, error)
