import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSnackbar } from 'react-notistack'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'

// Components
import Language from '../../../Components/Language'
import AuthLeftLogo from '../../../Components/AuthLeftLogo'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserStart, setResponseNull } from '../../../Store/auth/auth.action'
import { selectAuth, selectIsAuthError, selectIsAuthenticated, selectToken } from '../../../Store/auth/auth.selector'

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
  const [isShowPassword, setShowPassword] = useState(false)
  const [disable] = useState(false)
  const [type, setType] = useState('password')
  const auth = useSelector(selectAuth)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  // const isLoading = useSelector(selectIsLoading)
  const token = useSelector(selectToken)
  const authError = useSelector(selectIsAuthError)
  // const authResponse = useSelector(selectAuthResponse)

  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (
      authError == null &&
      isAuthenticated &&
      isAuthenticated === true &&
      token &&
      token !== null &&
      auth &&
      auth !== null
    ) {
      navigate('/admin/dashboard')
    }
  }, [authError, isAuthenticated, token, auth])

  useEffect(() => {
    console.log(authError)
    if (authError && authError != null) {
      enqueueSnackbar(authError, {
        variant: 'error',
        autoHide: true,
        hide: 3000,
        TransitionComponent: 'Fade'
      })
      dispatch(setResponseNull())
    }
  }, [authError])

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
  const onSubmit = async (data) => dispatch(loginUserStart(data))

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
              Don&apos;t have an account yet?<Link to={'/admin/signup'}>Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
