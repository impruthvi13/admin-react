import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/auth'
import userSlice from './Slices/user'
const store = configureStore({
  reducer: { auth: authSlice.reducer, user: userSlice.reducer }
})

export default store
