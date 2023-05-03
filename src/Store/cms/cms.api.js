import axios from 'axios'
import { API_GET_CMS_ENDPOINT } from '../../constants/apiEndpoints'

export async function getCMS (cmsData) {
    const { offset, limit, token, search } = cmsData
    const response = await axios.get(API_GET_CMS_ENDPOINT, { headers: { 'Content-Type': 'application/json', accept: 'application/json', Authorization: `Bearer ${token}` }, params: { limit, offset, search } })
    return response.data
}
