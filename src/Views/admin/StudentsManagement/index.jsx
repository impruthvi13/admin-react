import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../Components/Header'
import TitleHeader from '../../../Components/TitleHeader'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import orderdefault from '../../../assets/images/order-default.svg'
import orderup from '../../../assets/images/order-up.svg'
import orderdown from '../../../assets/images/order-down.svg'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteStudent,
  editSpecificStudent,
  getAllStudentListAction,
  uploadCsvfile
} from '../../../Actions/Admin/student'
import { Spinner, Form, Alert } from 'react-bootstrap'
import { useSnackbar } from 'react-notistack'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal'
import Select from 'react-select'
import ActiveButton from '../../../Shared/Component/ActiveButton'

function StudentManagement () {
  // constants
  // const location = useLocation()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [file, setFile] = useState()
  const csvInputRef = useRef()

  // const fileReader = new FileReader()

  const token = localStorage.getItem('token')
  const pagePerLimitArray = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' }
  ]

  // useState
  const [start, setStart] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sort] = useState('first_name')
  const [order] = useState('asc')
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [id, setId] = useState([])
  const [rowArray, setRowArray] = useState([])
  const [sortOrder] = useState('asc')
  const [studentArray, setStudentArray] = useState([])
  const [allRowSelect, setAllRowSelect] = useState(false)
  const [pageNo, setPageNo] = useState(1)

  // useSelector
  const isStudentDeleted = useSelector((state) => state.student.isDeleted)
  const isStudentUpdated = useSelector((state) => state.student.isStudentEdited)
  const studentResMessage = useSelector((state) => state.student.resMessage)
  const studentList = useSelector((state) => state.student.studentList)
  const count = useSelector((state) => state.student.studentCount)
  const isLoading = useSelector((state) => state.student.isLoading)
  const isFileAdded = useSelector((state) => state.student.isFileAdded)

  // previousProps
  const previousProps = useRef({
    studentList,
    isStudentUpdated,
    isStudentDeleted,
    studentResMessage,
    isFileAdded
  }).current

  // useEffect for listing Data
  useEffect(() => {
    dispatch(
      getAllStudentListAction(start, limit, sort, sortOrder, search, token)
    )
  }, [])

  useEffect(() => {
    if (previousProps?.studentList !== studentList) {
      if (studentList) {
        setStudentArray(studentList)
      }
    }
    return () => {
      previousProps.studentList = studentList
    }
  }, [studentList])

  const actionbutton = (row, cell) => {
    return <ActiveButton id={cell?.id} handleShow={handleShow} slug='students-management' viewlink='/admin/students-management/view-students' editlink='/admin/students-management/edit-students' />
  }

  const counsellorinfo = (row, cell) => {
    return (
      <div className='counsellor-infobox'>
        <div className='counsinfo'>
          <p>
            {cell?.first_name} {cell?.last_name}
          </p>
        </div>
      </div>
    )
  }

  // Table Switch : Status on/off
  const switchAction = (row, cell, rowIndex) => {
    return (
      <label className='switch'>
        <input
          type='checkbox'
          checked={row === 'y'}
          onChange={(e) => handleChange(e, cell.id)}
        />
        <span className='slider blue' id='round'></span>
      </label>
    )
  }

  // Function to handle switch of table
  const handleChange = (e, id) => {
    const data = {
      id,
      isActive: e.target.checked ? 'y' : 'n',
      updateType: 'status'
    }
    dispatch(editSpecificStudent(data, token))
    setStudentArray(
      studentArray.map((item) => {
        if (item.id === id) {
          item.is_active = e.target.checked ? 'y' : 'n'
          return item
        } else return item
      })
    )
  }

  const columns = [
    {
      dataField: 'id',
      text: 'Sr. No',
      formatter: (cell, row, rowIndex) => {
        const rowNumber = rowIndex + 1
        return <span>{rowNumber}</span>
      }
    },
    {
      dataField: 'student',
      text: 'Student Name',
      formatter: counsellorinfo,
      sort: true,
      sortCaret: (order, column) => {
        if (!order) {
          return (
            <span className='sort-box'>
              <img src={orderdefault} alt='order-up' />
            </span>
          )
        } else if (order === 'asc') {
          return (
            <span className='sort-box'>
              <img src={orderup} alt='order-up' />
            </span>
          )
        } else if (order === 'desc') {
          return (
            <span className='sort-box'>
              <img src={orderdown} alt='order-down' />
            </span>
          )
        }
        return null
      }
    },
    {
      dataField: 'email',
      text: 'Email'
    },
    {
      dataField: 'is_active',
      text: 'Status',
      formatter: switchAction
    },
    {
      dataField: 'body',
      text: 'Action',
      formatter: actionbutton
    }
  ]

  // Pagination
  const onPageChange = (page) => {
    setPageNo(page)
    setStart(limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1))
    if (page === 1) {
      dispatch(
        getAllStudentListAction(0, limit, sort, sortOrder, search, token)
      )
    } else {
      dispatch(
        getAllStudentListAction(
          limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1),
          limit,
          sort,
          sortOrder,
          search,
          token
        )
      )
    }
  }
  // page change
  const handlePagePerLimit = (e) => {
    setLimit(e.value)
    setPageNo(1)
    dispatch(getAllStudentListAction(0, e.value, sort, sortOrder, search, token))
  }
  const options = {
    sizePerPage: limit,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: false,
    alwaysShowAllBtns: true,
    totalSize: count,
    remote: { pagination: true },
    onPageChange,
    page: +pageNo
  }

  const handleTablechange = (type, { page, sortField, sortOrder }) => {
    if (type === 'sort') {
      if (sortOrder) {
        dispatch(
          getAllStudentListAction(start, limit, sort, sortOrder, search, token)
        )
      }
    }
  }

  // Sorting
  const defaultSortedBy = [
    {
      dataField: 'studentdetails',
      order: 'asc'
    }
  ]

  // Multiple row delete
  const selectRow = (row, isSelect) => {
    let updatedList = [...rowArray]
    if (isSelect) {
      updatedList = [...rowArray, row.id]
    } else {
      updatedList.splice(rowArray.indexOf(row.id), 1)
    }
    setRowArray(updatedList)
  }

  const handleCallback = (childData) => {
    setSearch(childData)
    if (childData) {
      dispatch(
        getAllStudentListAction(0, limit, sort, sortOrder, childData, token)
      )
    } else {
      dispatch(getAllStudentListAction(0, limit, sort, sortOrder, '', token))
    }
  }

  // Notification for Status
  useEffect(() => {
    if (previousProps?.isStudentUpdated !== isStudentUpdated) {
      if (isStudentUpdated) {
        setShow(false)
        enqueueSnackbar(`${studentResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllStudentListAction(0, limit, sort, order, '', token))
      } else if (isStudentUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${studentResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isStudentUpdated = isStudentUpdated
    }
  }, [isStudentUpdated])

  // Notification for Delete
  useEffect(() => {
    if (previousProps?.isStudentDeleted !== isStudentDeleted) {
      if (isStudentDeleted) {
        setShow(false)
        enqueueSnackbar(`${studentResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllStudentListAction(0, limit, sort, order, '', token))
      } else if (isStudentDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${studentResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isStudentDeleted = isStudentDeleted
    }
  }, [isStudentDeleted])

  // Notification for Csv file
  useEffect(() => {
    if (previousProps?.isFileAdded !== isFileAdded) {
      csvInputRef.current.value = ''
      if (isFileAdded) {
        enqueueSnackbar(`${studentResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
      } else if (isFileAdded === false) {
        enqueueSnackbar(`${studentResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isFileAdded = isFileAdded
    }
  }, [isFileAdded])

  const handleClose = () => setShow(false)
  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteStudent({ id: [id] }, token))
    }
  }
  // Function to delete Row in table
  const handleShow = (id) => {
    setId(id)

    setShow(true)
  }

  const handleOnChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (file) {
      const formData = new FormData()
      formData.append('student_import_file', file)
      if (formData) {
        dispatch(uploadCsvfile(formData, token))
      }
    }
  }

  return (
    <>
          <Header name='Student List' parentCallback={handleCallback} searchbar={true}/>
          <TitleHeader
            url='add-new-students'
            title='Students Management'
            location={location}
            rowArray={rowArray}
            setRowArray={setRowArray}
            allRowSelect={allRowSelect}
            pageNo={pageNo}
            setPageNo={setPageNo}
            name='Students'
            slug='student-management'
            showbuttons={true}
          />
          {isFileAdded === false
            ? <Alert variant='danger' className='error-alert'>
          {studentResMessage}
        </Alert>
            : null}
          <div className='col-md-12 text-end filterboxcontent'>
             <div className="csv-container">
             <div className='categoryfilterbtn text-center sizeperpagebtn'>

                <Select
                  classNamePrefix='filter-custom'
                  className='filter-time-btn withrightimg'
                  isSearchable={false}
                  options={pagePerLimitArray}
                  defaultValue={{ value: 10, label: 10 }}
                  onChange={(e) => handlePagePerLimit(e)}
                />
              </div>

              <div className='csv-files'>
          <div className='download'>
        <a className='nav-link' href={`${process.env.REACT_APP_AXIOS_BASE_URL}uploads/import-sample/sample.csv`}>Download CSV</a>
          </div>
            <div className="csv-group">
            <Form.Group
                      controlId='formFile'
                      className='form-group'
                    >
                      <Form.Control
                        className='hidden-file'
                        type={'file'}
                        accept={'.csv'}
                        onChange={handleOnChange}
                        ref={csvInputRef}
                      />
                      <div className='form-control d-flex justify-content-between align-items-center'>
                          <p className='m-0'>{file ? file?.name : 'Select File'}</p>
                          <p className='m-0 file-name-resume'>
                          </p>
                      </div>
                    </Form.Group >
                    <button
                    onClick={(e) => {
                      handleOnSubmit(e)
                    }}
                >
                    Submit CSV
                </button>
            </div>
             </div>
             </div>
            </div>
          <div>
            <BootstrapTable
              keyField='id'
              data={studentArray}
              columns={columns}
              responsive='md'
              remote={true}
              pagination={paginationFactory(options)}
              selectRow={{
                mode: 'checkbox',
                clickToSelect: false,
                classes: 'custom-class',
                onSelect: selectRow,
                onSelectAll: (isSelect, rows, e) => {
                  setAllRowSelect(isSelect)
                  if (isSelect) {
                    setRowArray(rows.map((i) => i.id))
                  } else {
                    setRowArray([])
                  }
                }
              }}
              options={options}
              defaultSorted={defaultSortedBy}
              onTableChange={handleTablechange}
              noDataIndication={() => isLoading
                ? <Spinner className='text-center' animation='border' />
                : 'No data'
              }
            />
          </div>
      <DeleteModal
        show={show}
        handleClose={handleClose}
        handleDelete={handleDelete}
        id={id}
      />
    </>
  )
}

export default StudentManagement
