/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

function TitleHeader (props) {
  // const // dispatch = use// dispatch()
  // const location = useLocation()

  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }
  const handleDelete = () => {
    console.log(props.rowArray)
    console.log(props?.location?.pathname)
    setShow(false)
    props.setRowArray([])

    if (props.allRowSelect === true) {
      props.setPageNo(1)
    }

    if (props?.rowArray) {
      if (props?.location?.pathname === '/admin/users') {
        // dispatch(deleteGrade({ id: props.rowArray }, token))
      }
    }
  }

  return (
    <>
      <div className='title-header'>
        <ul className='breadcrumbs'>
          <li className='breadcumbs-item'>
            <h3>{props?.title} </h3>
          </li>
          <li><a href="#">{props?.name}</a></li>
        </ul>
        {props?.showbuttons && (
          <div className='button-box'>
            <button
                className='theme-btn red-btn'
                onClick={handleShow}
                type='button'
                disabled={props?.rowArray?.length > 0 ? 0 : 1}
              >Delete Selected</button>
              <Link
                to={props?.location?.pathname + '/' + props?.url}
                className='theme-btn blue-btn'
              >
                Add New {props.name}
              </Link>
          </div>
        )}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className='title-box has-subtitle'>
            <h2>Delete </h2>
            <h4>Are you sure to delete this?</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type='button'
            onClick={handleDelete}
            className='theme-btn w-100 red-btn'
          >
            Delete
          </button>
          <button
            type='button'
            onClick={handleClose}
            className='theme-btn w-100 gray-btn'
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

TitleHeader.propTypes = {
  name: PropTypes.string
}

export default TitleHeader
