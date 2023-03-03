import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'

// Components
import Language from '../../../Components/Language'
import AuthLeftLogo from '../../../Components/AuthLeftLogo'

// Validation-Scheme for fields
const adminValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-Mail is required')
    .test('test-name', 'Enter Valid E-Mail', function (value) {
      const emailRegex = /.+@.+\.[A-Za-z]+$/
      const isValidEmail = emailRegex.test(value)
      if (!isValidEmail) {
        return false
      }
      return true
    }),
  password: yup.string().required('Password is required')
})

function Login () {
  const navigate = useNavigate()
  const [isShowPassword, setShowPassword] = useState(false)
  const [disable] = useState(false)
  const [type, setType] = useState('password')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(adminValidationSchema)
  })
  const { onChange, name } = register('email', 'password')

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
  const onSubmit = (data) => {
    console.log(data)
  }

  // Toastify Notification for Counsellor Login
  // useEffect(() => {
  //   if (previousProps?.isAuth !== isAuth) {
  //     if (isAuth) {
  //       setDisable(true)
  //       enqueueSnackbar(`${isAuthMessage}`, {
  //         variant: 'success',
  //         hide: 2000,
  //         autoHide: true
  //       })
  //     } else if (isAuth === false) {
  //       setDisable(false)
  //       enqueueSnackbar(`${isAuthMessage}`, {
  //         variant: 'error',
  //         hide: 2000,
  //         autoHide: true,
  //         TransitionComponent: 'Fade'
  //       }
  //       )
  //     }
  //   }
  //   return () => {
  //     previousProps.isAuth = isAuth
  //   }
  // }, [isAuth])

  return (
    <>
      <div className='common-layout'>
        <AuthLeftLogo />
        <div className='form-box-section'>
          <Language />
          <div className='middle-form'>
            <div className='title-box'>
              <h2>Admin Login</h2>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                  <>
                    <Form.Group
                      className={`form-group ${
                        errors.email?.type ? 'error-occured' : ''
                      }`}
                      controlId='formBasicEmail'
                    >
                      <Form.Label>E-Mail</Form.Label>
                      <Form.Control
                        type='text'
                        name={name}
                        placeholder='Enter E-Mail'
                        onChange={onChange}
                        {...register('email', { required: true })}
                      />
                      {errors.email?.message && (
                        <Form.Text className='error-msg'>
                          {errors.email?.message}{' '}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </>
              <Form.Group
                //  className="form-group error-occured"
                className={`form-group ${
                  errors.password?.type ? 'error-occured' : ''
                }`}
                controlId='formBasicPassword'
              >
                <div className='label-box'>
                  <Form.Label>Password</Form.Label>
                  <Link to='/admin/forgot-password'>Forgot Password?</Link>
                </div>
                <div className='password-box '>
                  <Form.Control
                    type={type}
                    placeholder='Password'
                    name={name}
                    onChange={onChange}
                    {...register('password', { required: true })}
                  />
                  <span
                    className={`show-hide-pass ${
                      isShowPassword ? 'show-pass' : ''
                    }`}
                    onClick={handleShowHidePassword}
                  ></span>
                </div>
                {errors.password?.message && (
                  <Form.Text className='error-msg'>
                    {errors.password?.message}{' '}
                  </Form.Text>
                )}
              </Form.Group>
              <Button
                variant='primary'
                type='submit'
                className='theme-btn large-btn'
                disabled={disable}
              >
                Login
              </Button>
            </Form>
          </div>
          <div className='redirect-to-signup'>
            <p>
              Don&apos;t have an account yet?{' '}
              <button className='formlink' onClick={() => {
                navigate('/admin/signup')
                window.location.reload(false)
              }} >Create an account</button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
