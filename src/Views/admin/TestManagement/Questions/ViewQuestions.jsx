import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Header from '../../../../Components/Header'
import TitleHeader from '../../../../Components/TitleHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSubCategoryFrontend, getSpecificQuestion } from '../../../../Actions/Admin/Test/Question'
function ViewQuestions () {
  // Constant
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()

  // useState
  const [questionOptions, setQuestionOptions] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const mainData = useSelector((state) => state.question.resData)
  const subCategoryArray = useSelector((state) => state.question.testSubCategoryList)

  // useEffect to get Data
  useEffect(() => {
    dispatch(getSpecificQuestion(Number(id), token))
    dispatch(getAllSubCategoryFrontend(token))
  }, [])
  useEffect(() => {
    mainData?.options?.length && setQuestionOptions(mainData?.options)
    subCategoryArray && setSubCategory(subCategoryArray?.filter((data) => data?.id === mainData?.test_detail_id))
  }, [mainData, subCategoryArray])

  return (
    <>
          <Header />
          <TitleHeader name='View Questions' title='Test Management' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>View Question</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className='form-middle-layout'>
              <Form className='light-bg'>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Sub Category</Form.Label>
                      <Form.Control value={subCategory[0]?.title} disabled />
                    </Form.Group>
                  </div>
                  <div className='col-md-12 quesbox has-image'>
                    <Form.Group
                      className='form-group mb-0 text-input'
                      controlId='formquestion'
                    >
                      <Form.Label>Question</Form.Label>
                      <Form.Control value={mainData?.question} disabled />
                    </Form.Group>
                    {mainData?.is_image === true && (
                      <Form.Group
                        controlId='formFile'
                        className='form-group mb-0  document-file-input common-input-file uploaded-doc'
                      >
                        <div className='form-control d-flex align-items-center flex-column justify-content-center text-center'>
                          <div className='img-box'>
                            <img
                              src={`${process.env.REACT_APP_AXIOS_BASE_URL}` + mainData?.path}
                              alt=''
                            />
                          </div>
                        </div>
                      </Form.Group>
                    )}
                    {
                      mainData?.is_math === true &&
                      <Form.Group
                      className='form-group mb-0 text-input'
                      controlId='formquestion'
                    >
                      <Form.Label>Math Expression</Form.Label>
                      <Form.Control value={mainData?.math_expression} disabled />
                    </Form.Group>
                    }
                    <Form.Group
                      className='form-group checkbox-box d-flex align-items-start'
                      controlId='formBasicCheckbox'
                    >
                        <Form.Check type='checkbox' id='checkbox-1'>
                          <Form.Check.Input
                            checked={mainData?.is_image}
                            disabled
                          />
                          <Form.Check.Label>Is Image ?</Form.Check.Label>
                        </Form.Check>

                        <Form.Check type='checkbox' id='checkbox-2'>
                          <Form.Check.Input
                            checked={mainData?.is_math}
                            disabled
                          />
                          <Form.Check.Label>Is Math ?</Form.Check.Label>
                        </Form.Check>

                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Marks</Form.Label>
                      <Form.Control value={mainData?.marks} disabled />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Time in second</Form.Label>
                      <Form.Control
                        value={`${mainData?.time_Sec} sec.`}
                        disabled
                      />
                    </Form.Group>
                  </div>
                  <div
                    className='col-md-12 optionaddbox'
                  >
                    <div
                      className='option-item'
                    >
                      {/* map */}
                      {questionOptions?.map((data) => {
                        return (
                          <>
                            <div className='optionitembox'>
                              <Form.Group
                                className='form-group mb-2 text-input'
                                controlId='formoption'
                              >
                                <Form.Label>Options</Form.Label>
                                <Form.Control
                                  type='text'
                                  placeholder='Enter Option'
                                  value={
                                    data?.ans_desc
                                  }
                                  disabled
                                />
                              </Form.Group>
                              {
                                data?.is_image === true &&
                                <Form.Group
                                controlId='formFile'
                                className='form-group mb-0  document-file-input common-input-file'
                              >
                                <div className='form-control d-flex align-items-center flex-column justify-content-center text-center'>
                                  <div className='img-box'>
                                    <img src={`${process.env.REACT_APP_AXIOS_BASE_URL}` + data?.path} alt='' />
                                  </div>
                                </div>
                              </Form.Group>
                              }
                              {
                                data?.is_math === true &&
                                <Form.Group
                                className='form-group mb-0 text-input'
                                controlId='formquestion'
                              >
                                <Form.Label>Math Expression</Form.Label>
                                <Form.Control value={data?.math_expression} disabled />
                              </Form.Group>
                              }
                              <Form.Group
                                className='form-group checkbox-box d-flex align-items-center'
                                controlId='formBasicCheckbox'
                              >
                                <Form.Check type='checkbox' id='checkbox-12' >
                                  <Form.Check.Input type='checkbox' checked={data?.is_image} disabled />
                                  <Form.Check.Label>
                                    Is Image ?
                                  </Form.Check.Label>
                                </Form.Check>
                                <Form.Check type='checkbox' id='checkbox-23'>
                                  <Form.Check.Input type='checkbox' checked={data?.is_math} disabled />
                                  <Form.Check.Label>Is Math ?</Form.Check.Label>
                                </Form.Check>
                                <Form.Check type='checkbox' id='checkbox-34'>
                                  <Form.Check.Input type='checkbox' checked={data?.is_correct_ans} disabled />
                                  <Form.Check.Label>
                                    Is Correct ?
                                  </Form.Check.Label>
                                </Form.Check>
                              </Form.Group>
                            </div>
                          </>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
    </>
  )
}

export default ViewQuestions
