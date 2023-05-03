import { combineReducers } from 'redux'
import { userReducer } from './user/user.reducer'
import { authReducer } from './auth/auth.reducer'
import { cmsReducer } from './cms/cms.reducer'

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  cms: cmsReducer
})
