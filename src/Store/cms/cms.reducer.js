import { CMS_ACTION_TYPES } from './cms.types'

const INITIAL_CMS = {
  cms: [],
  limit: 10,
  offset: 0,
  search: null,
  sort_column: null,
  sort_order: null,
  cmsCount: 0,
  pageNo: 1,
  isLoading: false,
  resMessage: null,
  error: null,
  oneCMS: null
}

export const cmsReducer = (state = INITIAL_CMS, action) => {
  const { type, payload } = action
  switch (type) {
    case CMS_ACTION_TYPES.FETCH_CMS_START:
      return { ...state, isLoading: true }
    case CMS_ACTION_TYPES.FETCH_CMS_FAILED:
      return { ...state, isLoading: false, error: payload?.response?.data?.meta?.message }
    case CMS_ACTION_TYPES.FETCH_CMS_SUCCESS:
      return {
        ...state,
        cms: payload && payload.cmsArray.data,
        offset: payload && payload.cmsArray.links ? payload.cmsArray.links.offset : state.offset,
        limit: payload && payload.cmsArray.links ? payload.cmsArray.links.limit : state.limit,
        cmsCount: payload && payload.cmsArray.links.total_count,
        pageNo: payload && payload.params.pageNo ? payload.params.pageNo : state.pageNo,
        isLoading: false
      }

      case CMS_ACTION_TYPES.SHOW_CMS_START:
        return { ...state, isLoading: true }
      case CMS_ACTION_TYPES.SHOW_CMS_SUCCESS:
          return {
            ...state,
            isLoading: false,
            oneCMS: payload.data
          }
      case CMS_ACTION_TYPES.SHOW_CMS_FAILED:
        return { ...state, isLoading: false, error: payload?.response?.data?.meta?.message }

      case CMS_ACTION_TYPES.SET_CMS_RESPONSE_NULL:
        return { ...state, resMessage: null, error: null }

    default:
      return state
  }
}
