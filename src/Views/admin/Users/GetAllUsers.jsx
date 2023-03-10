import React, { useEffect, useState } from 'react'

/* React Packages */
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
// import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
// import { Spinner } from 'react-bootstrap'
// import { useSnackbar } from 'react-notistack'
import Select from 'react-select'
import orderup from '../../../assets/images/order-up.svg'
import orderdown from '../../../assets/images/order-down.svg'
import orderdefault from '../../../assets/images/order-default.svg'

/* Components */
import Header from '../../../Components/Header'
import TitleHeader from '../../../Components/TitleHeader'
// import DeleteModal from '../../../Components/DeleteModal'

/* Action File */
import DeleteModal from '../../../Components/DeleteModal/DeleteModal'
import ActiveButton from '../../../Shared/Component/ActiveButton'
import { getUsers } from '../../../Store/Actions/user'
import useHttp from '../../../Shared/Hooks/use-http'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../../Store/Slices/user'
export default function GetAllUsers () {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const { sendRequest, data: userData, status: getUserStatus } = useHttp(getUsers, true)

  const location = useLocation()
  // const { enqueueSnackbar } = useSnackbar()
  // const token = localStorage.getItem('token')

  const pagePerLimitArray = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' }
  ]

  // useState
  const [show, setShow] = useState(false)
  const [rowArray, setRowArray] = useState([])
  // const [sort] = useState('title')
  // const [order] = useState('asc')
  // const [search, setSearch] = useState('')
//   const [id, setId] = useState('')
  // const [usersArray, setUsersArray] = useState([])

  // useSelector
  // const isCouponDeleted = useSelector(state => state.CoupenCodesAdmin.isCouponDeleted)
  const users = useSelector(state => state.user.users)
  const usersCount = useSelector(state => state.user.usersCount)
  const offset = useSelector(state => state.user.offset)
  const limit = useSelector(state => state.user.limit)
  const pageNo = useSelector(state => state.user.pageNo)
  // const resMessage = useSelector(state => state.CoupenCodesAdmin.resMessage)

  useEffect(() => {
    sendRequest({ offset, limit, token })
  }, [offset, limit])

  useEffect(() => {
    if (getUserStatus === 'completed') {
      dispatch(userActions.allUsers(userData))
    }
  }, [dispatch, userData])

  const actionbutton = (row, cell) => {
    return <ActiveButton id={cell?.id} handleShow={handleShow} slug='coupon-codes' viewlink='/admin/users' editlink='/admin/users/edit' />
  }

  // Function to delete Row in table
  const handleShow = id => {
    // setId(1f194_squaredid)
    setShow(true)
  }
  const handleClose = () => setShow(false)
  const handleDelete = () => {
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
        <input type="checkbox" checked={row === 'y'} onChange={e => handleChange(e, cell.id)} />
        <span className="slider blue" id="round"></span>
      </label>
    )
  }

  // Function to handle switch of table
  const handleChange = (e, id) => {
    // const data = {
    //   id,
    //   isActive: e.target.checked ? 'y' : 'n',
    //   updateType: 'status'
    // }
    // dispatch(editSpecificCoupon(data, token))
    // setCouponArray(
    //   couponArray?.map(item => {
    //     if (item.id === id) {
    //       item.is_active = e.target.checked ? 'y' : 'n'
    //       return item
    //     } else return item
    //   })
    // )
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
    dispatch(userActions.allUsers({ limit, offset: limit * (pageNo - 1), pageNo }))
  }

  // pagePerLimit
  const handlePagePerLimit = (e) => {
    dispatch(userActions.allUsers({ limit: e.value, offset, pageNo }))
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
            noDataIndication={ () => getUserStatus === 'pending' ? <Spinner className='text-center' animation='border' /> : 'No data' }
          />
        </div>
      </div>
      <DeleteModal show={show} id={1} handleClose={handleClose} handleDelete={handleDelete} />
    </>
  )
}
