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
// Action File
// import { logoutAction } from '../../Actions/auth'
// import { getCounsellorDataAction } from '../../Actions/Counsellor/dashboard'
// import ls from 'localstorage-slim'
// import localStorage from 'react-secure-storage'
// import { getCounsellorDataAction } from '../../Actions/Counsellor/dashboard'
function Sidebar (props) {
  // const { sendRequest, data: sideBarsData } = useHttp(getAdminSideBar)

  // const dispatch = useDispatch()
  // const { enqueueSnackbar } = useSnackbar()

  // localStorage
  // const roles = JSON.parse(localStorage.getItem('roles'))
  // const profile = JSON.parse(localStorage.getItem('profile'))
  // const adminType = ls.get('admin-type', { decrypt: true, secret: profile?.id })

  // useSelector
  // const data = useSelector((state) => state.auth.isLoggedOut)
  // const dataMessage = useSelector((state) => state.auth.resMessage)
  // const profileData = useSelector((state) => state.dashboard.counsellorData)
  // const previousProps = useRef({ data, dataMessage }).current

  const handleLogout = () => {
    // localStorage.removeItem('token')
    // // localStorage.setItem('isLogin', '0')
    // if (adminType === 'super' || adminType === 'sub') {
    //   // dispatch(logoutAction(token, 'admin'))
    // } else if (adminType === 'center') {
    //   // dispatch(logoutAction(token, 'center'))
    // } else {
    //   // dispatch(logoutAction(token, 'counsellor'))
    // }
    // setTimeout(() => {
    //   if (
    //     adminType === 'super' ||
    //     adminType === 'sub'
    //   ) {
    //     navigate('/admin/login')
    //   } else if (adminType === 'center') {
    //     navigate('/center/login')
    //   } else if (adminType === 'counsellor') {
    //     navigate('/counsellor/login')
    //   }
    //   localStorage.removeItem('admin-type')
    //   localStorage.removeItem('roles')
    //   localStorage.removeItem('profile')
    // }, 500)
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
                  to='/admin/add-user'
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
          <button className='logout menu-link' onClick={handleLogout}>
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
