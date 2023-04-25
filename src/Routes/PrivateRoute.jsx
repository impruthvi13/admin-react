import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
// import PageNotFound from '../Components/PageNotFound'
import MainLayout from '../MainLayout/MainLayout'
import { useSelector } from 'react-redux'
import { selectToken } from '../Store/auth/auth.selector'
// import ls from 'localstorage-slim'
// import localStorage from 'react-secure-storage'

function PrivateRoute ({ element: Component, slug }) {
  const navigate = useNavigate()
  const token = useSelector(selectToken)

  if (!token) {
    setTimeout(() => {
      navigate('/admin/login')
    }, 500)
  } else {
    return <MainLayout> {Component} </MainLayout>
  }
}
PrivateRoute.propTypes = {
  element: PropTypes.element,
  slug: PropTypes.string
}

export default PrivateRoute
