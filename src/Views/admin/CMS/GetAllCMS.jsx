import React, { useEffect, useState } from 'react'

/* React Packages */
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
// import { useLocation } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import Select from 'react-select'
import orderup from '../../../assets/images/order-up.svg'
import orderdown from '../../../assets/images/order-down.svg'
import orderdefault from '../../../assets/images/order-default.svg'
import { useSnackbar } from 'react-notistack'

/* Components */
import Header from '../../../Components/Header'
import TitleHeader from '../../../Components/TitleHeader'
import ActiveButton from '../../../Shared/Component/ActiveButton'

/* Action File */
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../../../Store/auth/auth.selector'
import { selectAllCMS, selectCMSCount, selectCMSError, selectCMSIsLoading, selectCMSLimit, selectCMSOffset, selectCMSPageNo, selectCMSResMessage } from '../../../Store/cms/cms.selector'
import { fetchCMSStart, setCMSResponseNull } from '../../../Store/cms/cms.action'

export default function GetAllCMS () {
  const { enqueueSnackbar } = useSnackbar()

  const dispatch = useDispatch()

  // const location = useLocation()

  const pagePerLimitArray = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' }
  ]

  // useState
  const [search, setSearch] = useState('')

  // useSelector
  const cms = useSelector(selectAllCMS)
  const cmsCount = useSelector(selectCMSCount)
  const offset = useSelector(selectCMSOffset)
  const limit = useSelector(selectCMSLimit)
  const pageNo = useSelector(selectCMSPageNo)
  const resMessage = useSelector(selectCMSResMessage)
  const errorMessage = useSelector(selectCMSError)
  const isLoading = useSelector(selectCMSIsLoading)
  const token = useSelector(selectToken)

  useEffect(() => {
    dispatch(fetchCMSStart({ offset, limit, token, search }))
  }, [search])

  useEffect(() => {
    if (resMessage && resMessage !== null) {
      enqueueSnackbar(resMessage, {
        variant: 'success',
        autoHide: true,
        hide: 3000,
        TransitionComponent: 'Fade'
      })
      dispatch(setCMSResponseNull())
    }
  }, [resMessage])

  useEffect(() => {
    if (errorMessage && errorMessage !== null) {
      enqueueSnackbar(resMessage, {
        variant: 'error',
        autoHide: true,
        hide: 3000,
        TransitionComponent: 'Fade'
      })
      dispatch(setCMSResponseNull())
    }
  }, [errorMessage])

  const actionbutton = (row, cell) => {
    return <ActiveButton id={cell?.id} slug='coupon-codes' editlink='/admin/cms/edit' />
  }

  // Table Switch : Status on/off
  const switchAction = (row, cell, rowIndex) => {
    return (
      <label className="switch">
        <input type="checkbox" checked={row === 'y'} onChange={e => handleChange(e, cell.id, rowIndex)} />
        <span className="slider blue" id="round"></span>
      </label>
    )
  }

  // Search
  const handleCallback = (search) => setSearch(search)
  // Function to handle switch of table
  const handleChange = (e, id, index) => {
    // const data = {
    //   id,
    //   is_active: e.target.checked ? 'y' : 'n',
    //   action: 'change_status'
    // }

    // dispatch(changeUserStatusStart({ index, data, token, id, users }))
  }

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
      dataField: 'title',
      text: 'Title',
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
      dataField: 'description',
      text: 'Description'
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
    dispatch(fetchCMSStart({ limit, offset: limit * (pageNo - 1), pageNo, token, search }))
  }

  // pagePerLimit
  const handlePagePerLimit = (e) => {
    dispatch(fetchCMSStart({ limit: e.value, offset, pageNo, token, search }))
  }

  const options = {
    sizePerPage: limit,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: false,
    alwaysShowAllBtns: true,
    totalSize: cmsCount,
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

  return (
    <>
      <Header name="CMS List" searchbar={true} parentCallback={handleCallback}/>
      <TitleHeader
        name="CMS"
        title="CMS Management"
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
        </div>
        <div className="col-md-12">
          <BootstrapTable
            keyField="id"
            data={cms}
            columns={columns}
            remote={true}
            pagination={paginationFactory(options)}
            responsive="md"
            options={options}
            defaultSorted={defaultSortedBy}
            onTableChange={handleTablechange}
            noDataIndication={ () => isLoading ? <Spinner className='text-center' animation='border' /> : 'No data' }
          />
        </div>
      </div>
    </>
  )
}
