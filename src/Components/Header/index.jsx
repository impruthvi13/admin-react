import React from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import notification from '../../assets/images/notification.svg'
import ls from 'localstorage-slim'
import defaultimage from '../../assets/images/default.jpeg'
import PropTypes from 'prop-types'

function Header (props) {
  const profiledata = ls.get(process.env.REACT_APP_AUTH_USER, {
    decrypt: true,
    secret: process.env.REACT_APP_LOCAL_STORAGE_ENCRYPT
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.value

    // eslint-disable-next-line react/prop-types
    props?.parentCallback(value)
  }

  return (
    <>
      <header className='header-section'>
        <div className='search-box'>
          {props?.searchbar &&
            <Form>
              <Form.Group className='form-group mb-0' controlId='formsearch'>
                <Form.Control
                  value={props?.search}
                  type='search'
                  placeholder='Search'
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </Form>
              }
        </div>
        <div className='profile-info'>
          <button type='button' className='notification-box'>
            <img src={notification} alt='' />
          </button>
          <button
            className='profile-box '
            onClick={() => {
                navigate('/admin/settings/myprofile')
            }}
          >
            <img
              src={
                profiledata?.profile
                  ? `${profiledata?.profile}`
                  : defaultimage
              }
              alt=''
            />
              <h6>
                {profiledata?.full_name}
              </h6>
          </button>
        </div>
      </header>
    </>
  )
}
Header.propTypes = {
  parentCallback: PropTypes.func,
  setSearch: PropTypes.func,
  search: PropTypes.string,
  searchbar: PropTypes.bool
}
export default Header
