import axios from 'axios'
import { API_ADD_NEW_USER_ENDPOINT, API_LIST_USERS } from '../../constants/apiEndpoints'

export async function addUser (userData) {
    const { data, token } = userData
    const response = await axios.post(API_ADD_NEW_USER_ENDPOINT, data, { headers: { 'Content-Type': 'application/json', accept: 'application/json', Authorization: `Bearer ${token}` } })
    return response
  }

export async function getUsers (userData) {
    const { offset, limit, token } = userData
    const response = await axios.get(API_LIST_USERS, { headers: { 'Content-Type': 'application/json', accept: 'application/json', Authorization: `Bearer ${token}` }, params: { limit, offset } })
    return response
}
