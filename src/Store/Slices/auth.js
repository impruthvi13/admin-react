import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false
  },
  reducers: {
    login (state, action) {
        state.isAuthenticated = true
    }
  }
})

export const authActions = authSlice.actions
export default authSlice
