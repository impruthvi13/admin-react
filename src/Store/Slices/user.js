import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    limit: 10,
    offset: 0,
    search: null,
    sort_column: null,
    sort_order: null,
    usersCount: 0,
    resMessage: null,
    pageNo: 1
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    allUsers (state, action) {
        state.users = action.payload.data ? action.payload?.data : state.users
        state.limit = action.payload.limit ? +action.payload.limit : state.limit
        state.offset = action.payload.offset || action.payload.offset === 0 ? +action.payload.offset : state.offset
        state.pageNo = action.payload.pageNo ? +action.payload.pageNo : state.pageNo
        state.usersCount = action.payload?.links?.total_count ? +action.payload?.links?.total_count : state.usersCount
        // state.search = action.payload?.links?.search
        // state.sort_column = action.payload?.links?.sort_column
        // state.sort_column = action.payload?.links?.sort_column
        // state.sort_order = action.payload?.links?.sort_order
        // state.message = action.payload?.meta?.message
    }
  }
})

export const userActions = userSlice.actions
export default userSlice
