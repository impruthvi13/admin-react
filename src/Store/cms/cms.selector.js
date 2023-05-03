export const selectAllCMS = (state) => state.cms.cms
export const selectCMSCount = (state) => +state.cms.cmsCount
export const selectCMSOffset = (state) => +state.cms.offset
export const selectCMSLimit = (state) => +state.cms.limit
export const selectCMSPageNo = (state) => +state.cms.pageNo
export const selectCMSResMessage = (state) => state.cms.resMessage
export const selectCMSIsLoading = (state) => state.cms.isLoading
export const selectCMSError = (state) => state.cms.error
