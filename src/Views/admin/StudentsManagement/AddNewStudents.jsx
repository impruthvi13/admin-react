import React, { useEffect, useRef, useState } from 'react'
/* Components */

import TitleHeader from '../../../Components/TitleHeader'
import * as yup from 'yup'
import Select from 'react-select'

import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addStudentAction } from '../../../Actions/Admin/student'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllBoardsAction,
  getAllGradeAction,
  getAllSchoolAction
} from '../../../Actions/auth'
import { useSnackbar } from 'react-notistack'
import moment from 'moment'
import { useAddress } from '../../../Shared/Hooks/UseAddress'

function AddNewStudents () {
  // Constant
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  let startdate = moment()
  startdate = startdate.subtract(15, 'years')
  startdate = startdate.format('YYYY-MM-DD')

  // useStates
  // const [countryid, setCountryid] = useState()
  // const [stateid, setStateid] = useState()
  const [scienceChecked, setScienceChecked] = useState(true)
  const [mathsChecked, setmathsChecked] = useState(true)

  // custom hook
  const { countryid, setCountryid, stateid, setStateid, countriesArray, statesArray, districtArray } = useAddress()

  // useSelector
  const boardData = useSelector((state) => state.auth.boardsData)
  const schoolListData = useSelector((state) => state.auth.schoolData)
  const gradeData = useSelector((state) => state.auth.gradeData)
  const isStudentAdded = useSelector(state => state.student.isStudentAdded)
  const isStudentAddedMessage = useSelector(
    (state) => state.student.resMessage
  )

  const previousProps = useRef({
    boardData,
    schoolListData,
    gradeData,
    isStudentAdded
  }).current

  // function to get all grades
  useEffect(() => {
    dispatch(getAllBoardsAction())
    dispatch(getAllSchoolAction())
    dispatch(getAllGradeAction())
  }, [])

  useEffect(() => {
    if (previousProps?.isStudentAdded !== isStudentAdded) {
      if (isStudentAdded) {
        enqueueSnackbar(`${isStudentAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/admin/students-management')
      } else if (isStudentAdded === false) {
        enqueueSnackbar(`${isStudentAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isStudentAdded = isStudentAdded
    }
  }, [isStudentAdded])

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required('First Name is required')
      .min(2, 'First Name must be at least 2 characters')
      .max(20, 'First Name must be at most 20 characters')
      .matches(/^[a-zA-z]+([\s][a-zA-Z]+)*$/, 'Special Characters & Numeric value are not allowed'),
    lastName: yup
      .string()
      .required('Last Name is required')
      .min(2, 'Last Name must be at least 2 characters')
      .max(20, 'Last Name must be at most 20 characters')
      .matches(/^[a-zA-z]+([\s][a-zA-Z]+)*$/, 'Special Characters & Numeric value are not allowed'),
    middleName: yup
      .string()
      .nullable(true)
      .max(20, 'Middle Name must be at most 20 characters')
      .matches(
        /^([a-zA-Z]+\s?)*$/,
        'Special Characters & Numeric value are not allowed'
      ),
    motherName: yup
      .string()
      .nullable(true)
      .max(20, 'Mother Name must be at most 20 characters')
      .matches(
        /^([a-zA-Z]+\s?)*$/,
        'Special Characters & Numeric value are not allowed'
      ),
    fatherName: yup
      .string()
      .nullable(true)
      .max(20, 'Father Name must be at most 20 characters')
      .matches(
        /^([a-zA-Z]+\s?)*$/,
        'Special Characters & Numeric value are not allowed'
      ),
    dob: yup.string().required('Date of Birth is required'),
    mobileNumber: yup
      .string()
      .required('Mobile Number is required')
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Enter valid Mobile Number'),
    email: yup
      .string()
      .required('Email is required')
      .matches(/.+@.+\.[A-Za-z]+$/, 'Enter valid E-Mail'),
    country: yup
      .object()
      .nullable()
      .required('Country is required'),
    state: yup
      .object()
      .nullable()
      .required('State is required'),
    district: yup
      .object()
      .nullable()
      .required('District is required'),
    board: yup
      .object()
      .nullable()
      .required('Board is required'),
    school: yup
      .object()
      .nullable()
      .required('Board is required'),
    grade: yup
      .object()
      .nullable()
      .required('Board is required'),
    pincode: yup
      .string()
      .matches(/^[\w]*$/, 'Negative numbers not allowed')
      .max(10, 'Pincode must be less than & equals to 10 digits')
      .nullable(true)
  })

  // useForm
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register(
    'firstName',
    'middleName',
    'lastName',
    'dob',
    'mobileNumber',
    'email'
  )

  const onSubmit = (data) => {
    const studentData = {
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      email: data.email,
      mobile: data.mobileNumber,
      dob: data.dob,
      student_pin_code: data.pincode,
      father_name: data.fatherName,
      mother_name: data.motherName,
      grade_id: +data.grade.id,
      board_id: +data.board.id,
      school_id: +data.school.id,
      country_id: +data.country.id,
      state_id: +data.state.id,
      city_id: +data.district.id,
      math_dropped: scienceChecked,
      science_dropped: mathsChecked,
      pin_code: data.pincode
    }

    if (studentData) {
      dispatch(addStudentAction(studentData, token))
    }
  }

  return (
    <>
          {/* <Header /> */}
          <TitleHeader name='Add' title='Add New Students' />
          <div className='main-layout whitebox-layout my-editprofile-page'>
            <Form className='light-bg' onSubmit={handleSubmit(onSubmit)}>
              <div className='heading-box'>
                <h5>Add Student</h5>
                <div className='btn-box'>
                  <button
                    className='theme-btn dark-btn text-none'
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button className='theme-btn text-none'>Save</button>
                </div>
              </div>
              <div className='light-bg-box'>
                <div className='row'>
                  <div className='col-xxl-12 '>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <h4>Student Details</h4>
                      </div>
                      <div className='col-lg-6'>
                        <Form.Group
                          className={`form-group ${
                            errors.firstName?.message ? 'error-occured' : ''
                          }`}
                          controlId='firstName'
                        >
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            placeholder='Enter First Name'
                            type='text'
                            {...register('firstName', { required: true })}
                          />
                          {errors.firstName?.message && (
                            <Form.Text className='error-msg'>
                              {errors.firstName?.message}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-lg-6'>
                        <Form.Group
                          className={`form-group ${
                            errors.firstName?.message ? 'error-occured' : ''
                          }`}
                          controlId='lastName'
                        >
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            placeholder='Enter Last Name'
                            type='text'
                            {...register('lastName', { required: true })}
                          />
                          {errors.lastName?.message && (
                            <Form.Text className='error-msg'>
                              {errors.lastName?.message}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-lg-6'>
                        <Form.Group
                          className={`form-group ${
                            errors.middleName?.message ? 'error-occured' : ''
                          }`}
                          controlId='middleName'
                        >
                          <Form.Label>Middle Name</Form.Label>
                          <Form.Control
                            placeholder='Enter Middle Name'
                            type='text'
                            {...register('middleName')}
                          />
                           {errors.middleName?.message && (
                            <Form.Text className='error-msg'>
                              {errors.middleName?.message}
                            </Form.Text>
                           )}
                        </Form.Group>
                      </div>
                      <div className='col-lg-6'>
                        <Form.Group
                         className={`form-group ${
                          errors.motherName?.message ? 'error-occured' : ''
                        }`}
                          controlId='mothername'
                        >
                          <Form.Label>Mother&apos;s Name</Form.Label>
                          <Form.Control
                            placeholder='Enter Mother’s Name'
                            type='text'
                            {...register('motherName')}
                          />
                          {errors.motherName?.message && (
                            <Form.Text className='error-msg'>
                              {errors.motherName?.message}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-lg-6'>
                        <Form.Group
                           className={`form-group ${
                            errors.fatherName?.message ? 'error-occured' : ''
                          }`}
                          controlId='formfathername'
                        >
                          <Form.Label>Father&apos;s Name</Form.Label>
                          <Form.Control
                            placeholder='Enter Father’s Name'
                            type='text'
                            {...register('fatherName')}
                          />
                          {errors.fatherName?.message && (
                            <Form.Text className='error-msg'>
                              {errors.fatherName?.message}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-lg-6'>
                        <Form.Group
                          className={`form-group ${
                            errors.dob?.message ? 'error-occured' : ''
                          }`}
                          controlId='formdate'
                        >
                          <Form.Label>Date Of Birth</Form.Label>
                          <Form.Control
                            type='date'
                            placeholder='Date Of Birth'
                            max={startdate}
                            name={name}
                            onChange={(e) => {
                              onChange(e)
                              setValue('dob', e.target.value)
                            }}
                            {...register('dob', { required: true })}
                          />
                          {errors.dob?.message && (
                            <Form.Text className='error-msg'>
                              {errors.dob?.message}{' '}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-lg-6'>
                        <Form.Group
                          controlId='formBasicEmail'
                          className={`form-group ${
                            errors.mobileNumber?.message ? 'error-occured' : ''
                          }`}
                        >
                          <Form.Label>Mobile Number</Form.Label>
                          <Form.Control
                            placeholder='Enter Mobile Number'
                            type='text'
                            {...register('mobileNumber', { required: true })}
                          />
                          {errors.mobileNumber?.message && (
                            <Form.Text className='error-msg'>
                              {errors.mobileNumber?.message}{' '}
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

                      <div className='col-lg-12'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='row'>
                              <div className='col-xl-6'>
                                <Form.Group
                                  className='form-group common-select-style'
                                  controlId='formfullname'
                                >
                                  <Form.Label>Country</Form.Label>
                                  <Controller
                                    name='country'
                                    control={control}
                                    render={({ field }) => (
                                      <Select
                                      {...field}
                                      placeholder={'Select Country'}
                                      className='react-dropdown'
                                      classNamePrefix='dropdown'
                                      options={countriesArray}

                                      getOptionLabel={(option) =>
                                        option?.title
                                      }
                                      getOptionValue={(option) =>
                                        option?.id
                                      }
                                      onChange={(e) => {
                                        field.onChange(e)
                                        setCountryid(e.id)
                                      }}
                                    />
                                    )}
                                  />
                                  <p className='error-msg'>
                                    {errors.country?.message ||
                                      errors.country?.label.message}
                                  </p>
                                </Form.Group>
                              </div>
                              <div className='col-xl-6'>
                                <Form.Group
                                  className='form-group common-select-style'
                                  controlId='formfullname'
                                >
                                  <Form.Label>State</Form.Label>
                                  <Controller
                                    name='state'
                                    control={control}
                                    render={({ field }) => (
                                      <Select
                                      {...field}
                                      placeholder={'Select State'}
                                      className='react-dropdown'
                                      classNamePrefix='dropdown'
                                      options={statesArray}
                                      onChange={(e) => {
                                        field.onChange(e)
                                        setStateid(e.id)
                                        setValue('district', '')
                                      }}
                                      getOptionLabel={(option) =>
                                        option?.title
                                      }
                                      getOptionValue={(option) =>
                                        option?.id
                                      }
                                      isDisabled={!countryid && true}
                                    />
                                    )}
                                  />
                                  <p className='error-msg'>
                                    {errors.state?.message ||
                                      errors.state?.label.message}
                                  </p>
                                </Form.Group>
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='row'>
                              <div className='col-xl-6'>
                                <Form.Group
                                  className='form-group common-select-style'
                                  controlId='formfullname'
                                >
                                  <Form.Label>District</Form.Label>
                                  <Controller
                                    name='district'
                                    control={control}
                                    render={({ field }) => (
                                      <Select
                                      {...field}
                                      placeholder={'Select District'}
                                      className='react-dropdown'
                                      classNamePrefix='dropdown'
                                      options={districtArray}
                                      getOptionLabel={(option) =>
                                        option?.title
                                      }
                                      getOptionValue={(option) =>
                                        option?.id
                                      }
                                      isDisabled={!stateid && true}
                                    />
                                    )}
                                  />
                                  <p className='error-msg'>
                                    {errors.district?.message ||
                                      errors.district?.label.message}
                                  </p>
                                </Form.Group>
                              </div>
                              <div className='col-xl-6'>
                                <Form.Group
                                  className='form-groupc'
                                  controlId='formpincode1'
                                >
                                  <Form.Label>PIN Code</Form.Label>
                                  <Form.Control
                                    type='number'
                                    placeholder='Enter PIN Code'
                                    name={name}
                                    onChange={(e) => {
                                      onChange(e)
                                    }}
                                    {...register('pincode')}
                                  />
                                  <p className='error-msg'>
                                    {errors.pincode?.message ||
                                      errors.pincode?.label.message}
                                  </p>
                                </Form.Group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-lg-12'>
                          <h4>Education Details</h4>
                        </div>
                        <div className='col-lg-6'>
                          <Form.Group
                            className='form-group common-select-style'
                            controlId='formfullname'
                          >
                            <Form.Label>Grade</Form.Label>
                            <Controller
                              name='grade'
                              control={control}
                              render={({ field }) => (
                                <Select
                                {...field}
                                placeholder={'Select District'}
                                className='react-dropdown'
                                classNamePrefix='dropdown'
                                options={gradeData}
                                getOptionLabel={(option) =>
                                  option?.title
                                }
                                getOptionValue={(option) =>
                                  option?.id
                                }
                              />
                              )}
                            />
                            <p className='error-msg'>
                              {errors.grade?.message ||
                                errors.grade?.label.message}
                            </p>
                          </Form.Group>
                        </div>
                        <div className='col-lg-6'>
                          <Form.Group
                            className='form-group common-select-style'
                            controlId='formfullname'
                          >
                            <Form.Label>Board</Form.Label>
                            <Controller
                              name='board'
                              control={control}
                              render={({ field }) => (
                                <Select
                                {...field}
                                placeholder={'Select District'}
                                className='react-dropdown'
                                classNamePrefix='dropdown'
                                options={boardData}
                                getOptionLabel={(option) =>
                                  option?.title
                                }
                                getOptionValue={(option) =>
                                  option?.id
                                }
                              />
                              )}
                            />
                            <p className='error-msg'>
                              {errors.board?.message ||
                                errors.board?.label.message}
                            </p>
                          </Form.Group>
                        </div>
                        <div className='col-12'>
                          <div className='row'>
                            <div className='col-lg-6'>
                              <Form.Group
                                className='form-group common-select-style'
                                controlId='formfullname'
                              >
                                <Form.Label>School</Form.Label>
                                <Controller
                                  name='school'
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                    {...field}
                                    placeholder={'Select District'}
                                    className='react-dropdown'
                                    classNamePrefix='dropdown'
                                    options={schoolListData}
                                    getOptionLabel={(option) =>
                                      option?.title
                                    }
                                    getOptionValue={(option) =>
                                      option?.id
                                    }
                                  />
                                  )}
                                />
                                <p className='error-msg'>
                                  {errors.school?.message ||
                                    errors.school?.label.message}
                                </p>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12'>
                        <div className='row'>
                          <Form.Label>Subject Dropout</Form.Label>
                          <div className='col-lg-6'>
                            <Form.Group
                              className='form-group drop-boxes gender-box d-flex align-items-center'
                              controlId='formsubjectdropout'
                            >
                              <Form.Label>Science drop</Form.Label>
                              <Form.Check type='radio' id='radio-3'>
                                <div className='radio-input'>
                                  <input
                                    type='radio'
                                    checked={scienceChecked === true}
                                    // {...register('sciencedrop')}
                                    onChange={(e) => {
                                      setScienceChecked(true)
                                    }}

                                  />
                                </div>
                                <Form.Check.Label>Yes</Form.Check.Label>
                              </Form.Check>
                              <Form.Check type='radio' id='radio-4'>
                                <div className='radio-input'>
                                  <input
                                    type='radio'
                                    checked={scienceChecked === false}
                                    // {...register('sciencedrop')}
                                    onChange={(e) => {
                                      setScienceChecked(false)
                                    }}

                                  />
                                </div>
                                <Form.Check.Label>No</Form.Check.Label>
                              </Form.Check>
                            </Form.Group>
                          </div>
                          <div className='col-lg-6'>
                            <Form.Group
                              className='form-group drop-boxes gender-box d-flex align-items-center'
                              controlId='formsubjectdropout'
                            >
                              <Form.Label>Maths drop</Form.Label>
                              <Form.Check type='radio' id='radio-5'>
                                <div className='radio-input'>
                                  <input
                                    type='radio'
                                    name='mathsdrop'
                                    checked={mathsChecked === true}
                                    // {...register('sciencedrop')}
                                    onChange={(e) => {
                                      setmathsChecked(true)
                                    }}
                                  />
                                </div>
                                <Form.Check.Label>Yes</Form.Check.Label>
                              </Form.Check>
                              <Form.Check type='radio' id='radio-6'>
                                <div className='radio-input'>
                                  <input
                                    type='radio'
                                    checked={mathsChecked === false}
                                    // {...register('sciencedrop')}
                                    onChange={(e) => {
                                      setmathsChecked(false)
                                    }}
                                  />
                                </div>
                                <Form.Check.Label>No</Form.Check.Label>
                              </Form.Check>
                            </Form.Group>
                          </div>
                        </div>
                      </div>
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

export default AddNewStudents
