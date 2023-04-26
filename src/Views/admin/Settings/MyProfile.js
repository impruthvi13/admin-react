import React, { useEffect } from 'react'
/* Components */
import { Link } from 'react-router-dom'
import defaultimage from '../../../assets/images/default.jpeg'
import mail from '../../../assets/images/mail.svg'
import phone from '../../../assets/images/phone.svg'
import { selectAuth, selectToken } from '../../../Store/auth/auth.selector'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInDetailsStart } from '../../../Store/auth/auth.action'

function AdminProfile () {
  const dispatch = useDispatch()

  const profileData = useSelector(selectAuth)
  const token = useSelector(selectToken)

  useEffect(() => {
    dispatch(getLoggedInDetailsStart(token))
  }, [])

  return (
    <>
          {/* <TitleHeader name='My Profile' /> */}
          <div className='main-layout whitebox-layout my-profile-page'>
            <h3 className='text-start'>My Profile</h3>
            <div className="profilebutton-box text-end">
              <Link to='/admin/settings/myprofile/change-password' className='theme-btn text-none d-inline-block'>Change Password</Link>
              <Link to='/admin/settings/myprofile/editmyprofile' className='theme-btn text-none d-inline-block ms-2'>Edit My Profile</Link>
            </div>
            <div className="my-profile-box">
              <div className="row ">
                <div className="col-xl-9">
                  <div className="profile-item">
                    <div className="row align-items-center">
                      <div className="col-xl-8">
                        <div className="profileinfo profile-updated">
                          <div className="profile-img">
                            <img src={profileData?.profile ? `${profileData?.profile}` : defaultimage} alt="ollato-img" />
                          </div>
                          <div className="profiledesc">
                            <h4>{profileData?.full_name}</h4>
                            <ul className="iconbox">
                              <li>
                                <img src={mail} alt="ollato-img" />
                                <p>{profileData?.email} </p>
                              </li>
                              <li>
                                <img src={phone} alt="ollato-img" />
                                <p>{profileData?.contact_no} </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
    </>
  )
}

export default AdminProfile
