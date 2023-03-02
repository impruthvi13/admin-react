import axios from 'axios'
import constants from '../../Shared/Types/constants'
export const getAllStudentListAction =
  (start, limit, sort, order, search, token) => (dispatch) => {
    const data = {
      start,
      limit,
      sort,
      order,
      search
    }
    dispatch({ type: constants.CLEAR_GET_ALL_STUDENT_DATA })
    axios
      .post(
        `${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/student/get-all`,
        data,
        { headers: { Authorization: token } }
      )
      .then((response) => {
        dispatch({
          type: constants.GET_ALL_STUDENT_DATA,
          payload: {
            resStatus: true,
            resMessage: response.data.message,
            studentList: response.data.data.rows,
            studentCount: response.data.data.count
          }
        })
      })
      .catch((error) => {
        dispatch({
          type: constants.GET_ALL_SUBADMIN_DATA,
          payload: {
            resStatus: false,
            resMessage: error?.response?.data?.message
          }
        })
      })
  }

// update student
export const editSpecificStudent = (studentData, token) => (dispatch) => {
  dispatch({ type: constants.CLEAR_EDIT_SPECIFIC_STUDENT })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/student/update`, studentData, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: constants.EDIT_SPECIFIC_STUDENT,
      payload: {
        resStatus: true,
        resMessage: response.data?.message,
        isStudentEdited: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.EDIT_SPECIFIC_STUDENT,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isStudentEdited: false
      }
    })
  })
}

// delete student
export const deleteStudent = (studentData, token) => (dispatch) => {
  dispatch({ type: constants.CLEAR_DELETE_STUDENT })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/student/delete`, studentData, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: constants.DELETE_STUDENT,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isDeleted: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.DELETE_STUDENT,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isDeleted: false
      }
    })
  })
}

// add student
export const addStudentAction = (studentData, token) => (dispatch) => {
  dispatch({ type: constants.CLEAR_ADD_STUDENT_DATA })
  axios
    .post(
      `${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/student/create`,
      studentData,
      { headers: { Authorization: token } }
    )
    .then((response) => {
      dispatch({
        type: constants.ADD_STUDENT_DATA,
        payload: {
          resStatus: true,
          resMessage: response.data.message,
          isStudentAdded: true
        }
      })
    })
    .catch((error) => {
      dispatch({
        type: constants.ADD_STUDENT_DATA,
        payload: {
          resStatus: false,
          resMessage: error?.response?.data?.message,
          isStudentAdded: false
        }
      })
    })
}

// get specific student
export const getSpecificStudent = (id, token) => (dispatch) => {
  dispatch({ type: constants.CLEAR_GET_SPECIFIC_SUBADMIN })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/student/get-by-id`, { id }, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: constants.GET_SPECIFIC_STUDENT,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        resData: response.data.data
        // isStudentEdited: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.GET_SPECIFIC_STUDENT,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        specificStudentData: false
        // isStudentEdited: false
      }
    })
  })
}

// update student
export const uploadCsvfile = (formdata, token) => (dispatch) => {
  dispatch({ type: constants.CLEAR_ADD_SPECIFIC_CSVFILE })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/import/student`, formdata, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: constants.ADD_SPECIFIC_CSVFILE,
      payload: {
        resStatus: true,
        resMessage: response.data?.message,
        isFileAdded: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.ADD_SPECIFIC_CSVFILE,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isFileAdded: false
      }
    })
  })
}
