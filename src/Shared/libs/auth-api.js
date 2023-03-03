import axios from 'axios'
import { API_LOGIN_ENDPOINT } from '../../constants/apiEndpoints'

export async function loginUser (userData) {
  const response = await axios.post(API_LOGIN_ENDPOINT, userData, { headers: { 'Content-Type': 'application/json', accept: 'application/json' } })
  return response
}
