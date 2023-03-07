import axios from 'axios'
import { API_ADD_NEW_USER_ENDPOINT, API_LOGIN_ENDPOINT, API_SIGNUP_ENDPOINT } from '../../constants/apiEndpoints'

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

export async function registerUser (userData) {
  const { data, token } = userData
  const response = await axios.post(API_ADD_NEW_USER_ENDPOINT, data, { headers: { 'Content-Type': 'application/json', accept: 'application/json', Authorization: `Bearer ${token}` } })
  return response
}
