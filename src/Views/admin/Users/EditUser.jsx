import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../../Components/Header'
import { useSnackbar } from 'react-notistack'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import 'yup-phone'
import { selectSingleUser, selectUserError, selectUsersResMessage } from '../../../Store/user/user.selector'
import { setUserResponseNull, showUserStart, updateUserStart } from '../../../Store/user/user.action'
import { selectToken } from '../../../Store/auth/auth.selector'

export default function AddNewUser () {
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const { id } = useParams()
  const token = useSelector(selectToken)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const userError = useSelector(selectUserError)
  const userResponse = useSelector(selectUsersResMessage)
  const user = useSelector(selectSingleUser)

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
    contact_no: yup.string().phone(91, true, 'Phone number is not valid').required('Phone number is required')
  })
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateSchemaAddNewUser)
  })

  const onSubmit = (data) => {
    dispatch(updateUserStart({ data, token, id }))
  }

  useEffect(() => {
    dispatch(showUserStart({ token, id }))
  }, [])

  useEffect(() => {
    if (user && user != null) {
      setValue('first_name', user.first_name)
      setValue('last_name', user.last_name)
      setValue('email', user.email)
      setValue('contact_no', user.contact_no)
    }
  }, [user])

  useEffect(() => {
    if (userResponse && userResponse != null) {
      navigate('/admin/users')
    }
  }, [userResponse])

  useEffect(() => {
    if (userError && userError != null) {
      enqueueSnackbar(userError, {
        variant: 'error',
        autoHide: true,
        hide: 3000,
        TransitionComponent: 'Fade'
      })
      dispatch(setUserResponseNull())
    }
  }, [userError])

return (
    <>
      <Header />
      <div className='main-layout'>
        <Form className='light-bg' onSubmit={handleSubmit(onSubmit)}>
          <div className='heading-box'>
            <h5>Edit User </h5>
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
                  {...register('first_name', { first_name: 'asd' }, { required: true })}
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
                className={`form-group ${errors.contact_no?.type ? 'error-occured' : ''
                  }`}
                controlId='formBasicEmail'>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type='text'
                  name={name}
                  placeholder='Contact Number'
                  {...register('contact_no', { required: true })}
                />
                {errors.contact_no?.message && (
                  <Form.Text className='error-msg'>
                    {errors.contact_no?.message}{' '}
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
