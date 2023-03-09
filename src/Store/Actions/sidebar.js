import axios from 'axios'
import { API_SIDEBAR_ENDPOINT } from '../../constants/apiEndpoints'

export async function getAdminSideBar (token) {
    const response = await axios.get(API_SIDEBAR_ENDPOINT, { headers: { 'Content-Type': 'application/json', accept: 'application/json', Authorization: `Bearer ${token}` } })
    return response
}
