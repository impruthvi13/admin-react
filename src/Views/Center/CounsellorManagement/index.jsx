/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../Components/Header'
import TitleHeader from '../../../Components/TitleHeader'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import orderdefault from '../../../assets/images/order-default.svg'
import orderup from '../../../assets/images/order-up.svg'
import orderdown from '../../../assets/images/order-down.svg'
import { useSnackbar } from 'react-notistack'
import { useDispatch, useSelector } from 'react-redux'
import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'
import { deleteCouncellor, editSpecificCounsellor, getAllCounsellorListAction } from '../../../Actions/Admin/counsellor'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal'
import Select from 'react-select'
import { Spinner } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import ls from 'localstorage-slim'
// import localStorage from 'react-secure-storage'

function CounsellorManagement() {
  // constants
  const location = useLocation()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const roles = JSON.parse(localStorage.getItem('roles'))
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
  const [counsellorArray, setCounsellorArray] = useState([])
  const [allRowSelect, setAllRowSelect] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [adminType, setAdmintype] = useState()
  const profile = JSON.parse(localStorage.getItem('profile'))
  const admintype = ls.get('admin-type', { decrypt: true, secret: profile?.id })

  // useSelector
  const isCounsellorDeleted = useSelector((state) => state.counsellorManAdmin.isDeleted)
  const isCounsellorUpdated = useSelector((state) => state.counsellorManAdmin.isCounsellorEdited)
  const counsellorResMessage = useSelector((state) => state.counsellorManAdmin.resMessage)
  const counsellorList = useSelector((state) => state.counsellorManAdmin.counsellorList)
  const count = useSelector((state) => state.counsellorManAdmin.counsellorCount)
  const isLoading = useSelector((state) => state.counsellorManAdmin.isLoading)

  // previousProps
  const previousProps = useRef({
    counsellorList,
    isCounsellorUpdated,
    isCounsellorDeleted,
    counsellorResMessage
  }).current

  // useEffect for listing Data
  useEffect(() => {
    if (admintype === 'super' || admintype === 'sub') {
      setAdmintype('admin')
      dispatch(getAllCounsellorListAction(start, limit, sort, sortOrder, search, token, 'admin'))
    } else if (admintype === 'center') {
      setAdmintype('center')
      dispatch(getAllCounsellorListAction(start, limit, sort, sortOrder, search, token, 'center'))
    }
  }, [])

  useEffect(() => {
    if (previousProps?.counsellorList !== counsellorList) {
      if (counsellorList) {
        setCounsellorArray(counsellorList)
      }
    }
    return () => {
      previousProps.counsellorList = counsellorList
    }
  }, [counsellorList])

  const handleCallback = (childData) => {
    setSearch(childData)
    if (childData) {
      dispatch(getAllCounsellorListAction(0, limit, sort, sortOrder, childData, token, adminType))
    } else {
      dispatch(getAllCounsellorListAction(0, limit, sort, sortOrder, '', token, adminType))
    }
  }

  // Notification for Status
  useEffect(() => {
    if (previousProps?.isCounsellorUpdated !== isCounsellorUpdated) {
      if (isCounsellorUpdated) {
        setShow(false)
        enqueueSnackbar(`${counsellorResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllCounsellorListAction(0, limit, sort, order, '', token, adminType))
      } else if (isCounsellorUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${counsellorResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isCounsellorUpdated = isCounsellorUpdated
    }
  }, [isCounsellorUpdated])

  // Notification for Delete
  useEffect(() => {
    if (previousProps?.isCounsellorDeleted !== isCounsellorDeleted) {
      if (isCounsellorDeleted) {
        setShow(false)
        enqueueSnackbar(`${counsellorResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllCounsellorListAction(0, limit, sort, order, '', token, adminType))
      } else if (isCounsellorDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${counsellorResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isCounsellorDeleted = isCounsellorDeleted
    }
  }, [isCounsellorDeleted])

  const actionbutton = (row, cell) => {
    return (
      <>
        <div className='button-box'>
          {admintype === 'super' ||
          admintype === 'center' ||
          roles?.find((i) => i.module_permissions.slug === 'counsellor-management')?.view === '1' ? (
            <Link to={`/${adminType}/counsellor-management/view-counsellor/${cell?.id}`}>
              <button className='action-btns green-bg' type='button'>
                <img src={view} alt='' /> View
              </button>
            </Link>
          ) : null}
          {admintype === 'super' ||
          admintype === 'center' ||
          roles?.find((i) => i.module_permissions.slug === 'counsellor-management')?.update === '1' ? (
            <Link to={`/${adminType}/counsellor-management/edit-counsellor/${cell?.id}`}>
              <button className='action-btns light-blue-bg' type='button'>
                <img src={edit} alt='' /> Edit
              </button>
            </Link>
          ) : null}
          {admintype === 'super' ||
          admintype === 'center' ||
          roles?.find((i) => i.module_permissions.slug === 'counsellor-management')?.delete === '1' ? (
            <button className='action-btns light-red-bg' type='button' onClick={() => handleShow(cell?.id)}>
              <img src={deletes} alt='' /> Delete
            </button>
          ) : null}
        </div>
      </>
    )
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
        <input type='checkbox' checked={row === 'y'} onChange={(e) => handleChange(e, cell.id)} />
        <span className='slider blue' id='round'></span>
      </label>
    )
  }

  // Function to handle switch of table
  const handleChange = (e, id) => {
    const data = {
      counsellor_id: id,
      isActive: e.target.checked ? 'y' : 'n',
      updateType: 'status'
    }
    if (adminType === 'center') {
      dispatch(editSpecificCounsellor(data, token, 'center'))
    } else {
      dispatch(editSpecificCounsellor(data, token, 'admin'))
    }
    setCounsellorArray(
      counsellorArray.map((item) => {
        if (item.id === id) {
          item.is_active = e.target.checked ? 'y' : 'n'
          return item
        } else return item
      })
    )
  }

  const handleClose = () => setShow(false)
  const handleDelete = (id) => {
    if (id) {
      if (adminType === 'center') {
        dispatch(deleteCouncellor({ id: [id] }, token, adminType))
      } else {
        dispatch(deleteCouncellor({ id: [id] }, token, adminType))
      }
    }
  }

  // Function to delete Row in table
  const handleShow = (id) => {
    setId(id)
    setShow(true)
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
      text: 'Counsellor Name',
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
      dataField: 'status',
      text: 'Status'
    },
    {
      dataField: 'is_active',
      text: 'isActive',
      formatter: switchAction
    },
    {
      dataField: 'body',
      text: 'Action',
      formatter: actionbutton
    }
  ]

  const handleTablechange = (type, { page, sortField, sortOrder }) => {
    if (type === 'sort') {
      if (sortOrder) {
        dispatch(getAllCounsellorListAction(start, limit, sort, sortOrder, search, token, adminType))
      }
    }
  }

  // sorting
  const defaultsortedBy = [
    {
      dataField: 'studentdetails',
      order: 'asc'
    }
  ]

  // page change
  const handlePagePerLimit = (e) => {
    setLimit(e.value)
    setPageNo(1)
    dispatch(getAllCounsellorListAction(0, e.value, sort, sortOrder, search, token, adminType))
  }

  // Pagination
  const onPageChange = (page) => {
    setPageNo(page)
    setStart(limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1))
    if (page === 1) {
      dispatch(getAllCounsellorListAction(0, limit, sort, sortOrder, search, token, adminType))
    } else {
      dispatch(
        getAllCounsellorListAction(limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1), limit, sort, sortOrder, search, token, adminType)
      )
    }
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

  const selectRow = (row, isSelect) => {
    let updatedList = [...rowArray]
    if (isSelect) {
      updatedList = [...rowArray, row.id]
    } else {
      updatedList.splice(rowArray.indexOf(row.id), 1)
    }
    setRowArray(updatedList)
  }
  return (
    <>
      <Header name='Counsellor List' parentCallback={handleCallback} searchbar={true} />
      <TitleHeader
        url='add-new-counsellor'
        title='Counsellor Management'
        name='Counsellor'
        location={location}
        rowArray={rowArray}
        setRowArray={setRowArray}
        allRowSelect={allRowSelect}
        pageNo={pageNo}
        setPageNo={setPageNo}
        adminType={adminType}
        slug='counsellor-management'
        showbuttons={true}
      />
      <div className='col-md-12 text-end filterboxcontent'>
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
      </div>
      <div>
        <BootstrapTable
          keyField='id'
          data={counsellorArray}
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
          defaultsorted={defaultsortedBy}
          onTableChange={handleTablechange}
          noDataIndication={() => (isLoading ? <Spinner className='text-center' animation='border' /> : 'No data')}
        />
      </div>

      <DeleteModal show={show} handleClose={handleClose} handleDelete={handleDelete} id={id} />
    </>
  )
}

export default CounsellorManagement
