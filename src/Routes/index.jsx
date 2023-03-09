/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'

/* Components */
import Dashboard from '../Views/Dashboard'
import PrivateRoute from './PrivateRoute'

/* Center Pages */
import AdminProfile from '../Views/admin/Settings/MyProfile'
import ChangePassword from '../Views/admin/Settings/ChangePassword'
import EditmyprofileAdmin from '../Views/admin/Settings/EditMyProfile'

/* Auth routes */
import PublicRoute from './PublicRoute'
import Login from '../Views/auth/login'
import ForgotPassword from '../Views/auth/ForgotPassword'
import SignUp from '../Views/auth/SignUp'
import AddNewUser from '../Views/admin/Users/AddNewUser'
import GetAllUsers from '../Views/admin/Users/GetAllUsers'

function RoutesFile () {
  return (
    <>
      <Routes>
      <Route
          exact
          path='/admin/login'
          element={<PublicRoute element={<Login />} />}
        />
      <Route
          exact
          path='/admin/signup'
          element={<PublicRoute element={<SignUp />} />}
        />
        <Route
          exact
          path='/admin/forgot-password'
          element={<PublicRoute element={<ForgotPassword />} />}
        />
        <Route
          exact
          path='/admin/dashboard'
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          exact
          path='/admin/add-user'
          element={<PrivateRoute element={<AddNewUser />} />}
        />
        <Route
          exact
          path='/admin/users'
          element={<PrivateRoute element={<GetAllUsers />} />}
        />
        <Route
          exact
          path='/admin/settings/myprofile'
          element={<PrivateRoute element={<AdminProfile />} />}
        />
        <Route
          exact
          path='/admin/settings/myprofile/change-password'
          element={<PrivateRoute element={<ChangePassword />} />}
        />
        <Route
          exact
          path='/admin/settings/myprofile/editmyprofile'
          element={<PrivateRoute element={<EditmyprofileAdmin />} />}
        />
      </Routes>
    </>
  )
}
export default RoutesFile
