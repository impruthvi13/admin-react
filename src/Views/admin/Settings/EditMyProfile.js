import React, { useEffect, useState } from 'react'
import TitleHeader from '../../../Components/TitleHeader'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import defaultimage from '../../../assets/images/default.jpeg'

import { useSnackbar } from 'react-notistack'
// import { useDispatch, useSelector } from 'react-redux'
// import { editProfileAdmin, viewProfileAdmin } from '../../../Actions/auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import crossWhite from '../../../assets/images/crosswhite.svg'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, selectAuthResponse, selectIsAuthError, selectToken } from '../../../Store/auth/auth.selector'
import { editProfileStart, getLoggedInDetailsStart, setResponseNull } from '../../../Store/auth/auth.action'
// import defaultimage from '../../../assets/images/default.jpeg'
function EditmyprofileAdmin () {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedImage, setSelectedFile] = useState()

  const dispatch = useDispatch()

  const profileData = useSelector(selectAuth)
  const token = useSelector(selectToken)
  const authResponse = useSelector(selectAuthResponse)
  const authError = useSelector(selectIsAuthError)

  const validationSchema = yup.object().shape({
    full_name: yup
      .string()
      .required('Full Name is required')
      .min(2, 'Full Name must be at least 2 characters')
      .max(20, 'Full Name must be at most 20 characters')
      .matches(/^[a-zA-z]+([\s][a-zA-Z]+)*$/, 'Special Characters & Numeric value are not allowed'),
    contact_no: yup
      .string()
      .required('Contact Number is required')
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Enter valid Contact Number'),
    email: yup
      .string()
      .required('Email is required')
      .matches(/.+@.+\.[A-Za-z]+$/, 'Enter valid E-Mail')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange } = register()

  useEffect(() => {
      dispatch(getLoggedInDetailsStart(token))
      reset({
        full_name: profileData?.full_name,
        email: profileData?.email,
        contact_no: profileData?.contact_no
      })
      setSelectedFile(profileData?.profile)
  }, [])

  useEffect(() => {
    if (authResponse && authResponse !== null) {
      enqueueSnackbar(authResponse, {
        variant: 'success',
        autoHide: true,
        hide: 3000,
        TransitionComponent: 'Fade'
      })
      reset({
        full_name: profileData?.full_name,
        email: profileData?.email,
        contact_no: profileData?.contact_no
      })
      dispatch(setResponseNull())
    }
  }, [authResponse])

  useEffect(() => {
    if (authError && authError !== null) {
      enqueueSnackbar(authError, {
        variant: 'error',
        autoHide: true,
        hide: 3000,
        TransitionComponent: 'Fade'
      })
      reset()
      dispatch(setResponseNull())
    }
  }, [authError])

  const removeImage = (e) => {
    e.preventDefault()
    setSelectedFile(null)
  }

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('full_name', data?.full_name)
    formData.append('email', data?.email)
    formData.append('contact_no', data?.contact_no)
    if (selectedImage !== null) {
      formData.append(
        'profile',
        data?.files[0] ? data?.files[0] : profileData?.profile
      )
    }
    dispatch(editProfileStart({ formData, token }))
  }

  return (
    <>
      <TitleHeader name='Edit' title='My Profile' />
      <div className='main-layout whitebox-layout my-editprofile-page'>
        <Form className='light-bg' onSubmit={handleSubmit(onSubmit)}>
          <div className='heading-box'>
            <div className='text-end'>
              <button
                className='theme-btn dark-btn text-none'
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button type='submit' className='theme-btn text-none ms-2'>
                Save
              </button>
            </div>
          </div>
          <div className='light-bg-box'>
            <div className='row'>
              <div className='col-xxl-3 profile-update'>
                <Form.Group
                  controlId='formFile'
                  className='form-group profile-picture common-input-file d-flex justify-content-center'
                >
                  <div className='close-dp'>
                    <Form.Control
                      type='file'
                      className='hidden-file'
                      name='files'
                      accept="image/*"
                      {...register('files', { required: true })}
                      onChange={(e) => {
                        onChange(e)
                        setSelectedFile(e.target.files[0])
                      }}
                    />
                    <div className='form-control d-flex align-items-center flex-column justify-content-center text-center '>
                      <div className='img-box'>
                        <img
                          src={
                            selectedImage === null
                              ? defaultimage
                              : typeof selectedImage === 'string'
                                ? selectedImage
                                : typeof selectedImage === 'object'
                                  ? URL.createObjectURL(selectedImage)
                                  : null
                          }
                          alt=''
                        />
                      </div>
                    </div>
                    <button
                      onClick={(e) => removeImage(e)}
                      className='dp-remove'
                    >
                      <img src={crossWhite} alt='' />
                    </button>
                  </div>
                </Form.Group>
              </div>

              <div className='col-xxl-9 '>
                <div className='row'>
                  <div className='col-lg-12'>
                    <h4>Admin Details</h4>
                  </div>
                  <div className='col-lg-6'>
                    <Form.Group
                      className={`form-group ${
                        errors.full_name?.message ? 'error-occured' : ''
                      }`}
                      controlId='full_name'
                    >
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        placeholder='Enter Full Name'
                        type='text'
                        {...register('full_name', { required: true })}
                      />
                      {errors.full_name?.message && (
                        <Form.Text className='error-msg'>
                          {errors.full_name?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>

                  <div className='col-lg-6'>
                    <Form.Group
                      controlId='formBasicEmail'
                      className={`form-group ${
                        errors.contact_no?.message ? 'error-occured' : ''
                      }`}
                    >
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        placeholder='Enter Contact Number'
                        type='text'
                        {...register('contact_no', { required: true })}
                      />
                      {errors.contact_no?.message && (
                        <Form.Text className='error-msg'>
                          {errors.contact_no?.message}{' '}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='col-lg-6'>
                    <Form.Group
                      className={`form-group verified ${
                        errors.email?.message ? 'error-occured' : ''
                      }`}
                      controlId='formBasicEmail'
                    >
                      <Form.Label>Email ID</Form.Label>
                      <div className='position-relative'>
                        <Form.Control
                          placeholder='Enter Email ID'
                          type='email'
                          {...register('email', { required: true })}
                        />
                      </div>
                      {errors.email?.message && (
                        <Form.Text className='error-msg'>
                          {errors.email?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default EditmyprofileAdmin
