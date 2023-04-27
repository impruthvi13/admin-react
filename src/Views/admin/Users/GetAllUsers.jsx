import React, { useEffect, useState } from 'react'

/* React Packages */
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Link, useLocation } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import Select from 'react-select'
import orderup from '../../../assets/images/order-up.svg'
import orderdown from '../../../assets/images/order-down.svg'
import orderdefault from '../../../assets/images/order-default.svg'
import { useSnackbar } from 'react-notistack'

/* Components */
import Header from '../../../Components/Header'
import TitleHeader from '../../../Components/TitleHeader'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal'
import ActiveButton from '../../../Shared/Component/ActiveButton'

/* Action File */
import { useDispatch, useSelector } from 'react-redux'
import { changeUserStatusStart, deleteUserStart, fetchUserStart, setUserResponseNull } from '../../../Store/user/user.action'
import { selectAllUsers, selectUserIsLoading, selectUsersCount, selectUsersLimit, selectUsersOffset, selectUsersPageNo, selectUsersResMessage } from '../../../Store/user/user.selector'
import { selectToken } from '../../../Store/auth/auth.selector'

export default function GetAllUsers () {
  const { enqueueSnackbar } = useSnackbar()

  const token = useSelector(selectToken)

  const dispatch = useDispatch()

  const location = useLocation()

  const pagePerLimitArray = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' }
  ]

  // useState
  const [show, setShow] = useState(false)
  const [rowArray, setRowArray] = useState([])
  const [id, setId] = useState('')
  // const [usersArray, setUsersArray] = useState([])
  // const [sort] = useState('title')
  // const [order] = useState('asc')
  // const [search, setSearch] = useState('')

  // useSelector
  const users = useSelector(selectAllUsers)
  const usersCount = useSelector(selectUsersCount)
  const offset = useSelector(selectUsersOffset)
  const limit = useSelector(selectUsersLimit)
  const pageNo = useSelector(selectUsersPageNo)
  const resMessage = useSelector(selectUsersResMessage)

  useEffect(() => {
    dispatch(fetchUserStart({ offset, limit, token }))
  }, [])

  useEffect(() => {
    if (resMessage && resMessage !== null) {
      enqueueSnackbar(resMessage, {
        variant: 'success',
        autoHide: true,
        hide: 3000,
        TransitionComponent: 'Fade'
      })
      dispatch(setUserResponseNull())
    }
  }, [resMessage])

  const actionbutton = (row, cell) => {
    return <ActiveButton id={cell?.custom_id} handleShow={handleShow} slug='coupon-codes' viewlink='/admin/users' editlink='/admin/users/edit' />
  }

  // Function to delete Row in table
  const handleShow = (id) => {
    setShow(true)
    setId(id)
  }
  const handleClose = () => setShow(false)
  const handleDelete = (id) => {
    dispatch(deleteUserStart({ token, id, users }))
    setShow(false)
  }
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

  // Table Switch : Status on/off
  const switchAction = (row, cell, rowIndex) => {
    return (
      <label className="switch">
        <input type="checkbox" checked={row === 'y'} onChange={e => handleChange(e, cell.custom_id, rowIndex)} />
        <span className="slider blue" id="round"></span>
      </label>
    )
  }

  // Function to handle switch of table
  const handleChange = (e, id, index) => {
    const data = {
      id,
      is_active: e.target.checked ? 'y' : 'n',
      action: 'change_status'
    }

    const allUsers = [...users]
    const statusUser = allUsers[index]
    const obj = { ...statusUser, active: e.target.checked ? 'y' : 'n' }
    allUsers[index] = obj
    dispatch(changeUserStatusStart({ users: allUsers, data, token, id }))
  }

  // Search
  // const handleCallback = (childData) => {
  //   setSearch(childData)
  //   if (childData) {
  //     dispatch(getAllCouponCodes(0, limit, sort, order, childData, token))
  //   } else {
  //     dispatch(getAllCouponCodes(0, limit, sort, order, '', token))
  //   }
  // }

  // const users = userData?.data.data || []
  const columns = [
    {
      dataField: 'Sr.no',
      text: 'Sr. No',
      formatter: (cell, row, rowIndex) => {
        const rowNumber = rowIndex + 1
        return <span>{rowNumber}</span>
      }
    },
    {
      dataField: 'first_name',
      text: 'First Name',
      sort: true,
      sortCaret: (order, column) => {
        if (!order) {
          return (
            <span className="sort-box">
              <img src={orderdefault} alt="order-up" />
            </span>
          )
        } else if (order === 'asc') {
          return (
            <span className="sort-box">
              <img src={orderup} alt="order-up" />
            </span>
          )
        } else if (order === 'desc') {
          return (
            <span className="sort-box">
              <img src={orderdown} alt="order-down" />
            </span>
          )
        }
        return null
      }
    },
    {
      dataField: 'last_name',
      text: 'Last Name'
    },
    {
      dataField: 'email',
      text: 'Email'
    },
    {
      dataField: 'contact_no',
      text: 'Contact Number'
    },
    {
      dataField: 'active',
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
  const onPageChange = (pageNo) => {
    dispatch(fetchUserStart({ limit, offset: limit * (pageNo - 1), pageNo, token }))
  }

  // pagePerLimit
  const handlePagePerLimit = (e) => {
    dispatch(fetchUserStart({ limit: e.value, offset, pageNo, token }))
  }

  const options = {
    sizePerPage: limit,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: false,
    alwaysShowAllBtns: true,
    totalSize: usersCount,
    remote: { pagination: true },
    onPageChange,
    page: +pageNo
  }

  // Sorting
  const defaultSortedBy = [
    {
      dataField: 'name',
      order: 'asc'
    }
  ]

  const handleTablechange = (type, { page, sortField, sortOrder }) => {
    if (type === 'sort') {
      if (sortOrder) {
        // dispatch(
        //   getAllCouponCodes(start, limit, sort, sortOrder, search, token)
        // )
      }
    }
  }

  // Notification for Delete
  // useEffect(() => {
  //   if (previousProps?.isCouponDeleted !== isCouponDeleted) {
  //     if (isCouponDeleted) {
  //       setShow(false)
  //       enqueueSnackbar(`${resMessage}`, {
  //         variant: 'success',
  //         hide: 2000,
  //         autoHide: true
  //       })
  //       // dispatch(getAllCouponCodes(0, limit, sort, order, '', token))
  //     } else if (isCouponDeleted === false) {
  //       setShow(false)
  //       enqueueSnackbar(`${resMessage}`, {
  //         variant: 'error',
  //         hide: 2000,
  //         autoHide: true,
  //         TransitionComponent: 'Fade'
  //       })
  //     }
  //   }
  //   // return () => {
  //   //   previousProps.isCouponDeleted = isCouponDeleted
  //   // }
  // }, [isCouponDeleted])

  // Notification for status
  // useEffect(() => {
  //   if (previousProps?.isCouponCodeEdited !== isCouponCodeEdited) {
  //     if (isCouponCodeEdited) {
  //       setShow(false)
  //       enqueueSnackbar(`${resMessage}`, {
  //         variant: 'success',
  //         hide: 2000,
  //         autoHide: true
  //       })
  //       // dispatch(getAllCouponCodes(0, limit, sort, order, '', token))
  //     } else if (isCouponCodeEdited === false) {
  //       setShow(false)
  //       enqueueSnackbar(`${resMessage}`, {
  //         variant: 'error',
  //         hide: 2000,
  //         autoHide: true,
  //         TransitionComponent: 'Fade'
  //       })
  //     }
  //   }
  //   return () => {
  //     previousProps.isCouponCodeEdited = isCouponCodeEdited
  //   }
  // }, [isCouponCodeEdited])

  return (
    <>
      <Header name="Users List" searchbar={true} />
      <TitleHeader
        name="Users"
        title="Users Management"
        url="add-coupon-code"
        setRowArray={setRowArray}
        rowArray={rowArray}
        location={location}
        slug='qualification-management'
        showbuttons={true}
      />
      <div className="row">
        <div className='d-flex justify-content-between'>
          <div className="col-md-6 text-end filterboxcontent">
            <div className="categoryfilterbtn text-center sizeperpagebtn">
              <Select
                classNamePrefix="filter-custom"
                className="filter-time-btn withrightimg"
                isSearchable={false}
                options={pagePerLimitArray}
                defaultValue={{ value: 10, label: 10 }}
                onChange={e => handlePagePerLimit(e)}
              />
            </div>
          </div>
          <div className="col-md-6 text-end">
              <Link to='add' className='theme-btn text-none'>
                  Add User
              </Link>
          </div>
        </div>
        <div className="col-md-12">
          <BootstrapTable
            keyField="id"
            data={users}
            columns={columns}
            remote={true}
            selectRow={{
              mode: 'checkbox',
              clickToSelect: false,
              classes: 'custom-class',
              onSelect: selectRow
            }}
            pagination={paginationFactory(options)}
            responsive="md"
            options={options}
            defaultSorted={defaultSortedBy}
            onTableChange={handleTablechange}
            noDataIndication={ () => selectUserIsLoading ? <Spinner className='text-center' animation='border' /> : 'No data' }
          />
        </div>
      </div>
      <DeleteModal show={show} id={id} handleClose={handleClose} handleDelete={handleDelete} />
    </>
  )
}
