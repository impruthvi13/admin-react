import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthLeftLogo from '../../../Components/AuthLeftLogo'
import * as yup from 'yup'
import useHttp from '../../../Shared/Hooks/use-http'
import { signUpUser } from '../../../Actions/auth'
import { useSnackbar } from 'react-notistack'

function SignUp () {
  const { sendRequest, status, error: signupError } = useHttp(signUpUser)
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
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    password: yup.string().required('Password is required'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Confirm password is not match').required('Confirm Password is required')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(adminValidationSchema)
  })
  const { onChange, name } = register('email', 'password')
  const [disable] = useState(false)
  const [type, setType] = useState('password')
  const [typeConfirm, setTypeConfirm] = useState('password')
  const [isShowPassword, setShowPassword] = useState(false)
  const [isShowConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (status === 'completed') {
      navigate('/admin/login')
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

  const handleShowHidePassword = () => {
    if (type === 'password') {
      setType('text')
      setShowPassword(true)
    } else {
      setType('password')
      setShowPassword(false)
    }
  }

  const handleShowHideConfirmPassword = () => {
    if (typeConfirm === 'password') {
      setTypeConfirm('text')
      setShowConfirmPassword(true)
    } else {
      setTypeConfirm('password')
      setShowConfirmPassword(false)
    }
  }

  const onSubmit = async (data) => {
    sendRequest(data)
  }
  return (
    <>
      <div className="common-layout">
        <AuthLeftLogo />
        <div className="form-box-section">
          <div className="middle-form signup-page">
            <div className="title-box">
              <h2>Sign Up</h2>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>

              <Form.Group
                className={`form-group ${errors.email?.type ? 'error-occured' : ''
                  }`}
                controlId='formBasicEmail'>
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

              <Form.Group
                className={`form-group ${errors.first_name?.type ? 'error-occured' : ''
                  }`}
                controlId='formFirstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  name={name}
                  placeholder='Enter First Name'
                  onChange={onChange}
                  {...register('first_name', { required: true })}
                />
                {errors.first_name?.message && (
                  <Form.Text className='error-msg'>
                    {errors.first_name?.message}{' '}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group
                className={`form-group ${errors.last_name?.type ? 'error-occured' : ''
                  }`}
                controlId='formLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  name={name}
                  placeholder='Enter Last Name'
                  onChange={onChange}
                  {...register('last_name', { required: true })}
                />
                {errors.last_name?.message && (
                  <Form.Text className='error-msg'>
                    {errors.last_name?.message}{' '}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group
                className={`form-group ${errors.password?.type ? 'error-occured' : ''
                  }`}
                controlId='formBasicPassword'>
                <div className='label-box'>
                  <Form.Label>Password</Form.Label>
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
                    className={`show-hide-pass ${isShowPassword ? 'show-pass' : ''
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
              <Form.Group
                className={`form-group ${errors.passwordConfirm?.type ? 'error-occured' : ''
                  }`}
                controlId='formBasicPassword'>
                <div className='label-box'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Link to='/admin/forgot-password'>Forgot Password?</Link>
                </div>
                <div className='password-box '>
                  <Form.Control
                    type={typeConfirm}
                    placeholder='Confirm Password'
                    name={name}
                    {...register('passwordConfirm', { required: true })}
                  />
                  <span
                    className={`show-hide-pass ${isShowConfirmPassword ? 'show-pass' : ''
                      }`}
                    onClick={handleShowHideConfirmPassword}
                  ></span>
                </div>

                {errors.passwordConfirm?.message && (
                  <Form.Text className='error-msg'>
                    {errors.passwordConfirm?.message}{' '}
                  </Form.Text>
                )}
              </Form.Group>
              <Button
                variant='primary'
                type='submit'
                className='theme-btn large-btn'
                disabled={disable}
              >
                Sign Up
              </Button>
            </Form>
          </div>
          <div className="redirect-to-signin">
            <p>Already have an account? <Link to="/admin/login">Login</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}
export default SignUp
