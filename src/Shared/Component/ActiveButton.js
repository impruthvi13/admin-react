import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import view from '../../assets/images/view-eye.svg'
import edit from '../../assets/images/pencil-line.svg'
import deletes from '../../assets/images/delete-bin-line.svg'
// import localStorage from 'react-secure-storage'
import PropTypes from 'prop-types'

function ActiveButton ({ id, handleShow, slug, viewlink, editlink }) {
  const location = useLocation()

  if (location.pathname === '/admin/users') {
    return <div className="button-box">
      <Link to={`${editlink}/${id}`}>
        <button className="action-btns light-blue-bg" type="button">
          <img src={edit} alt="" /> Edit
        </button>
      </Link>
      <button className="action-btns light-red-bg" onClick={() => handleShow(id)} type="button">
        <img src={deletes} alt="" /> Delete
      </button>
    </div>
  }

  if (location.pathname === '/admin/cms') {
    return <div className="button-box">
      <Link to={`${editlink}/${id}`}>
        <button className="action-btns light-blue-bg" type="button">
          <img src={edit} alt="" /> Edit
        </button>
      </Link>
    </div>
  }

  return <div className="button-box">
    <Link to={`${viewlink}/${id}`}>
      <button className="action-btns green-bg" type="button">
        <img src={view} alt="" /> View
      </button>
    </Link>

    <Link to={`${editlink}/${id}`}>
      <button className="action-btns light-blue-bg" type="button">
        <img src={edit} alt="" /> Edit
      </button>
    </Link>
    <button className="action-btns light-red-bg" onClick={() => handleShow(id)} type="button">
      <img src={deletes} alt="" /> Delete
    </button>
</div>
}
ActiveButton.propTypes = {
  id: PropTypes.any,
  handleShow: PropTypes.func,
  slug: PropTypes.string,
  viewlink: PropTypes.string,
  editlink: PropTypes.string
}
export default ActiveButton
