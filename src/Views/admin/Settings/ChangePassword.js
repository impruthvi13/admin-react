// import React, { useState, useRef, useEffect } from 'react'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../Components/Header'
// import ls from 'localstorage-slim'
// import localStorage from 'react-secure-storage'
import useHttp from '../../../Shared/Hooks/use-http'
import { changeAdminPassword } from '../../../Store/Actions/auth'
import { Navigate } from 'react-router-dom'
import { useSnackbar } from 'react-notistack'
// Regex for password
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// Validations Schema
const validationSchema = yup.object().shape({
  current_password: yup.string().required('Please Enter Current Password'),
  password: yup
    .string()
    .required('Password is required')
    .test(
      'passwords-match',
      'Passwords should be unique from current password',
      function (value) {
        return this.parent.current_password !== value
      }
    )
    .matches(
      passRegex,
      'Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters'
    ),
  password_confirmation: yup
    .string()
    .required('Confirm Password is required')
    .oneOf(
      [yup.ref('password'), null],
      'Password and Confirm password must be same '
    )
})

function ChangePassword () {
  const { sendRequest, status, error: signupError } = useHttp(changeAdminPassword)
  const token = localStorage.getItem('token')
  const { enqueueSnackbar } = useSnackbar()
  const [type, setType] = useState('password')
  const [isShowPassword, setShowPassword] = useState(false)
  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors }
    // reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register('password', 'password_confirmation')

  // Submit Method
  const onSubmit = (data) => {
    sendRequest({ token, data })
  }

  // Handle method show/hide password
  const handleShowHidePassword = () => {
    if (type === 'password') {
      setType('text')
      setShowPassword(true)
    } else {
      setType('password')
      setShowPassword(false)
    }
  }

  useEffect(() => {
    if (status === 'completed') {
      //sucess notification code 
    }
    if (status === 'error') {
      enqueueSnackbar(signupError, {
        variant: 'error',
        autoHide: true,
        hide: 3000,
        TransitionComponent: 'Fade'
      })
    }
  }, [status, navigator])

  return (
    <>
        {/* <Helmet> */}
        <meta charSet='utf-8' />
        <title>Settings - Ollato</title>
          <Header />
          <div className='main-layout whitebox-layout'>
            <Form className='light-bg' onSubmit={handleSubmit(onSubmit)}>
              <div className='heading-box'>
                <h5 className='mr-1'>Change Password</h5>
                <div className='text-end'>
                  <button className='theme-btn text-end' type='submit'>
                    Save New Password
                  </button>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-xl-6 col-lg-8 col-md-10'>
                      <Form.Group
                        className={`form-group ${
                          errors.current_password?.message ? 'error-occured' : ''
                        }`}
                        controlId='formnewPassword'
                      >
                        <Form.Label>Current Password</Form.Label>
                        <div className='password-box no-eye'>
                          <Form.Control
                            type='password'
                            placeholder='Enter Current Password'
                            {...register('current_password', { required: true })}
                          />
                        </div>
                        <Form.Text className='error-msg'></Form.Text>
                        {errors.current_password?.message && (
                          <Form.Text className='error-msg'>
                            {errors.current_password?.message}{' '}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-xl-6 col-lg-8 col-md-10'>
                      <Form.Group
                        className={`form-group ${
                          errors.password?.message ? 'error-occured' : ''
                        }`}
                        controlId='formnewPassword'
                      >
                        <Form.Label>New Password</Form.Label>
                        <div className='password-box no-eye'>
                          <Form.Control
                            type={type}
                            placeholder='Enter New Password'
                            name={name}
                            onChange={(e) => {
                              onChange(e)
                            }}
                            {...register('password', { required: true })}
                          />
                          {errors.password?.message && (
                            <Form.Text className='error-msg'>
                              {errors.password?.message}{' '}
                            </Form.Text>
                          )}
                          <span
                            className={`show-hide-pass ${
                              isShowPassword ? 'show-pass' : ''
                            }`}
                            onClick={handleShowHidePassword}
                          ></span>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <span
                    className={`show-hide-pass ${
                      isShowPassword ? 'show-pass' : ''
                    }`}
                    onClick={handleShowHidePassword}
                  ></span>
                </div>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-xl-6 col-lg-8 col-md-10'>
                      <Form.Group
                        className={`form-group ${
                          errors.password_confirmation?.message ? 'error-occured' : ''
                        }`}
                        controlId='formconfirmPassword'
                      >
                        <Form.Label>Confirm Passwod</Form.Label>
                        <div className='password-box no-eye'>
                          <Form.Control
                            type='password'
                            placeholder='Re-enter New Password'
                            name={name}
                            onChange={(e) => {
                              onChange(e)
                            }}
                            {...register('password_confirmation', { required: true })}
                          />
                          {errors.password_confirmation?.message && (
                            <Form.Text className='error-msg'>
                              {errors.password_confirmation?.message}{' '}
                            </Form.Text>
                          )}
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
    </>
  )
}

export default ChangePassword
