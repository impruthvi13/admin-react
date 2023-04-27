import React from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import notification from '../../assets/images/notification.svg'
import defaultimage from '../../assets/images/default.jpeg'
import PropTypes from 'prop-types'
import { selectAuth } from '../../Store/auth/auth.selector'
import { useSelector } from 'react-redux'

function Header (props) {
  const profileData = useSelector(selectAuth)
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
                profileData?.profile
                  ? `${profileData?.profile}`
                  : defaultimage
              }
              alt=''
            />
              <h6>
                {profileData?.full_name}
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
