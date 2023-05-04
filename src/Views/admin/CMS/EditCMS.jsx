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
// import { selectSingleUser, selectUserError, selectUsersResMessage } from '../../../Store/user/user.selector'
// import { setUserResponseNull, updateUserStart } from '../../../Store/user/user.action'
import { selectToken } from '../../../Store/auth/auth.selector'
import TitleHeader from '../../../Components/TitleHeader'
import { selectCMSError, selectCMSResMessage, selectSingleCMS } from '../../../Store/cms/cms.selector'
import { setCMSResponseNull, showCMStart } from '../../../Store/cms/cms.action'

export default function EditCMS () {
  const { id } = useParams()
  const token = useSelector(selectToken)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const cmsError = useSelector(selectCMSError)
  const cmsResponse = useSelector(selectCMSResMessage)
  const cms = useSelector(selectSingleCMS)

  const validateSchemaEditCMS = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Last Name is required')
  })
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateSchemaEditCMS)
  })

  const onSubmit = (data) => {
    // dispatch(updateUserStart({ data, token, id }))
  }

  useEffect(() => {
    dispatch(showCMStart({ token, id }))
  }, [])

  useEffect(() => {
    if (cms && cms != null) {
      setValue('title', cms.title)
      setValue('description', cms.description)
    }
  }, [cms])

  useEffect(() => {
    if (cmsResponse && cmsResponse != null) {
      navigate('/admin/users')
    }
  }, [cmsResponse])

  useEffect(() => {
    if (cmsError && cmsError != null) {
      enqueueSnackbar(cmsError, {
        variant: 'error',
        autoHide: true,
        hide: 3000,
        TransitionComponent: 'Fade'
      })
      dispatch(setCMSResponseNull())
    }
  }, [cmsError])

return (
    <>
      <Header />
      <TitleHeader
        name="CMS"
        title="CMS Management"
      />
      <div className='main-layout'>
        <Form className='light-bg' onSubmit={handleSubmit(onSubmit)}>
          <div className='heading-box'>
            <h5>Edit CMS </h5>
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
              <div className='col-md-12'>
              <Form.Group
                className={`form-group ${errors.title?.type ? 'error-occured' : ''
                  }`}
                controlId='formFirstName'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  name={name}
                  placeholder='Enter Title'
                  {...register('title', { required: true })}
                />
                {errors.title?.message && (
                  <Form.Text className='error-msg'>
                    {errors.title?.message}{' '}
                  </Form.Text>
                )}
              </Form.Group>
              </div>
              <div className='col-md-12'>
              <Form.Group
                className={`form-group ${errors.description?.type ? 'error-occured' : ''
                  }`}
                controlId='formLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name={name}
                  {...register('description', { required: true })}
                />
                {errors.description?.message && (
                  <Form.Text className='error-msg'>
                    {errors.description?.message}{' '}
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
