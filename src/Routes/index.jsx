/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'

/* Components */
import Dashboard from '../Views/Dashboard'
import PrivateRoute from './PrivateRoute'

function RoutesFile () {
  return (
    <>
      <Routes>
      <Route
          exact
          path='/admin/dashboard'
          element={<PrivateRoute element={<Dashboard />} />}
        />
      </Routes>
    </>
  )
}
export default RoutesFile
