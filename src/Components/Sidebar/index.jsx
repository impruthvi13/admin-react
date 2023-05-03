import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useSnackbar } from 'react-notistack'
import Accordion from 'react-bootstrap/Accordion'
import { NavLink } from 'react-router-dom'
// Images
import logoOllato from '../../assets/images/sidebar-icons/logo-ollato.svg'
import logout from '../../assets/images/sidebar-icons/logout.svg'
import centermanage from '../../assets/images/sidebar-icons/manage-center.svg'
import dashboard from '../../assets/images/sidebar-icons/dashboard.svg'
// import usermanage from '../../assets/images/sidebar-icons/user-manage.svg'
// import leadsmanage from '../../assets/images/sidebar-icons/manage-leads.svg'
// import cmsmanage from '../../assets/images/sidebar-icons/manage-cms.svg'
// import sessionrequest from '../../assets/images/sidebar-icons/session-request.svg'

import closebtn from '../../assets/images/close-circle-mobile.svg'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { logoutStart } from '../../Store/auth/auth.action'
import { selectToken } from '../../Store/auth/auth.selector'
function Sidebar (props) {
  const token = useSelector(selectToken)

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutStart(token))
  }
  Accordion.defaultProps = {
    open: false
  }

  return (
    <>
      <div className='sidebar-box'>
        <div className='menu-box'>
          <div className='logo-box'>
            <a href='#'>
              <img src={logoOllato} alt='logo' />
            </a>
          </div>
          <div className='notification-close-box d-flex align-items-center justify-content-between'>
            <button className='profile-box profile-box-dp'>
              {/* <img src={profile} alt='profile-pic' /> */}
              <img src="" alt='profile-pic' />
            </button>
            <button type='button' className='close-btn' onClick={() => props?.toggleHandle(!props.toggle)}>
              <img src={closebtn} alt='close' />
            </button>
          </div>
          <ul className='sidebar-menu'>
            {/* Dashboard */}
            <li>
                <NavLink
                  to='/admin/dashboard'
                  className='menu-link'
                >
                  <div className='icon-box'>
                    <img src={dashboard} alt='logo sidebar' />
                  </div>
                  <span> Dashboard </span>
                </NavLink>
              </li>
            <li>
                <NavLink
                  to='/admin/users'
                  className='menu-link'
                >
                  <div className='icon-box'>
                    <img src={dashboard} alt='logo sidebar' />
                  </div>
                  <span> User </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to='/admin/cms'
                  className='menu-link'
                >
                  <div className='icon-box'>
                    <img src={dashboard} alt='logo sidebar' />
                  </div>
                  <span> CMS </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/admin/settings/myprofile'
                  className='menu-link'
                >
                  <div className='icon-box'>
                    <img src={centermanage} alt='logo sidebar' />
                  </div>
                  <span>My Profile</span>
                </NavLink>
              </li>
          </ul>
        </div>
        {/* Logout Button */}
        <div className='logout-btn'>
          <button type='button' className='logout menu-link' onClick={handleLogout}>
            <div className='icon-box'>
              <img src={logout} alt='logo sidebar' />
            </div>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

Sidebar.propTypes = {
  location: PropTypes.object,
  toggleHandle: PropTypes.func,
  toggle: PropTypes.bool
}

export default Sidebar
