import axios from 'axios'
import { API_CHANGE_ADMIN_PASSWORD_ENDPOINT, API_LOGIN_ENDPOINT, API_SIGNUP_ENDPOINT } from '../../constants/apiEndpoints'

export async function loginUser (userData) {
  const response = await axios.post(API_LOGIN_ENDPOINT, userData, { headers: { 'Content-Type': 'application/json', accept: 'application/json' } })

  if (response.statusText !== 'OK') {
    throw new Error(response.data.message || 'Somthing went wrong')
  }

  return response
}
export async function signUpUser (userData) {
  const response = await axios.post(API_SIGNUP_ENDPOINT, userData, { headers: { 'Content-Type': 'application/json', accept: 'application/json' } })
  return response
}

export async function changeAdminPassword (userData) {
  const { token, data } = userData
  const response = await axios.post(API_CHANGE_ADMIN_PASSWORD_ENDPOINT, data, { headers: { 'Content-Type': 'application/json', accept: 'application/json', Authorization: `Bearer ${token}` } })
  return response
}
