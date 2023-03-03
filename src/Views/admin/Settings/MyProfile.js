import React from 'react'
/* Components */
import { Link } from 'react-router-dom'
// import defaultimage from '../../../assets/images/default.jpeg'
import mail from '../../../assets/images/mail.svg'
import phone from '../../../assets/images/phone.svg'
import studenticon from '../../../assets/images/student-icon.svg'
import lightlogomark from '../../../assets/images/lightlogomark.svg'
// import { viewProfileAdmin } from '../../../Actions/auth'
// import { useDispatch, useSelector } from 'react-redux'

// import { useDispatch, useSelector } from 'react-redux'

function AdminProfile () {
  // const token = localStorage.getItem('token')
  // const dispatch = useDispatch()
  // const profileData = useSelector((state) => state.auth.profileDataAdmin)

  // useEffect(() => {
  //   dispatch(viewProfileAdmin(token))
  // }, [])

  return (
    <>
          {/* <TitleHeader name='My Profile' /> */}
          <div className='main-layout whitebox-layout my-profile-page'>
            <h3 className='text-start'>My Profile</h3>
            <div className="profilebutton-box text-end">
              <Link to='/admin/settings/myprofile/change-password' className='theme-btn text-none d-inline-block'>Change Password</Link>
              <Link to='/admin/settings/my-profile/editmyprofile' className='theme-btn text-none d-inline-block ms-2'>Edit My Profile</Link>
            </div>
            <div className="my-profile-box">
              <div className="row ">
                <div className="col-xl-9">
                  <div className="profile-item">
                    <div className="row align-items-center">
                      <div className="col-xl-8">
                        <div className="profileinfo profile-updated">
                          <div className="profile-img">
                            {/* <img src={profileData?.profile_pic ? `${process.env.REACT_APP_AXIOS_BASE_URL}${profileData?.profile_pic}` : defaultimage} alt="ollato-img" /> */}
                          </div>
                          <div className="profiledesc">
                            {/* <h4>{profileData?.first_name} {profileData?.last_name}</h4> */}
                            <ul className="iconbox">
                              <li>
                                <img src={mail} alt="ollato-img" />
                                {/* <p>{profileData?.email} </p> */}
                              </li>
                              <li>
                                <img src={phone} alt="ollato-img" />
                                {/* <p>{profileData?.mobile} </p> */}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="profile-item h-100 text-center d-flex align-items-center justify-content-center position-relative overflow-hidden">
                    <div className='student-code'>
                      <img src={studenticon} alt="studenticon" />
                      <p>Ollato Expert Code </p>
                      {/* <h4>{profileData?.ollato_code}</h4> */}
                    </div>
                    <img src={lightlogomark} className='lightlogomark' alt="ollato-img" />
                  </div>
                </div>

              </div>

            </div>
          </div>
    </>
  )
}

export default AdminProfile
