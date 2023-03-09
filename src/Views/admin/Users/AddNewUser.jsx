import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Header from '../../../Components/Header'
import useHttp from '../../../Shared/Hooks/use-http'
import { addUser } from '../../../Actions/user'
import { useSnackbar } from 'react-notistack'
import * as yup from 'yup'

export default function AddNewUser () {
  const { sendRequest, status, error: addNewUserError } = useHttp(addUser)
  const navigate = useNavigate()
  const [type, setType] = useState('password')
  const [typeConfirm, setTypeConfirm] = useState('password')
  const [isShowPassword, setShowPassword] = useState(false)
  const [isShowConfirmPassword, setShowConfirmPassword] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const validateSchemaAddNewUser = yup.object().shape({
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
    resolver: yupResolver(validateSchemaAddNewUser)
  })

  const onSubmit = (data) => {
    const token = localStorage.getItem('token')
    sendRequest({ data, token })
  }

  useEffect(() => {
    if (status === 'completed') {
      navigate('/admin/dashboard')
    }
    if (status === 'error') {
      enqueueSnackbar(addNewUserError, {
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

return (
    <>
      <Header />
      <div className='main-layout'>
        <Form className='light-bg' onSubmit={handleSubmit(onSubmit)}>
          <div className='heading-box'>
            <h5>Add New User </h5>
            <div className='btn-box'>
              <button
                type='button'
                className='theme-btn dark-btn text-none'
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button type='submit' className='theme-btn text-none'>
                Save
              </button>
            </div>
          </div>
          <div className='form-middle-layout'>
            <div className='row'>
              <div className='col-md-6'>
              <Form.Group
                className={`form-group ${errors.first_name?.type ? 'error-occured' : ''
                  }`}
                controlId='formFirstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  name={name}
                  placeholder='Enter First Name'
                  {...register('first_name', { required: true })}
                />
                {errors.first_name?.message && (
                  <Form.Text className='error-msg'>
                    {errors.first_name?.message}{' '}
                  </Form.Text>
                )}
              </Form.Group>
              </div>
              <div className='col-md-6'>
              <Form.Group
                className={`form-group ${errors.last_name?.type ? 'error-occured' : ''
                  }`}
                controlId='formLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  name={name}
                  placeholder='Enter Last Name'
                  {...register('last_name', { required: true })}
                />
                {errors.last_name?.message && (
                  <Form.Text className='error-msg'>
                    {errors.last_name?.message}{' '}
                  </Form.Text>
                )}
              </Form.Group>
              </div>
              <div className='col-md-6'>
              <Form.Group
                className={`form-group ${errors.email?.type ? 'error-occured' : ''
                  }`}
                controlId='formBasicEmail'>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type='text'
                  name={name}
                  placeholder='Enter E-Mail'
                  {...register('email', { required: true })}
                />
                {errors.email?.message && (
                  <Form.Text className='error-msg'>
                    {errors.email?.message}{' '}
                  </Form.Text>
                )}
              </Form.Group>
              </div>
              <div className='col-md-6'>
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
              </div>
              <div className='col-md-6'>
              <Form.Group
                className={`form-group ${errors.passwordConfirm?.type ? 'error-occured' : ''
                  }`}
                controlId='formBasicPassword'>
                <div className='label-box'>
                  <Form.Label>Confirm Password</Form.Label>
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
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
