import axios from 'axios'
import { API_GET_CMS_ENDPOINT, API_SHOW_CMS_ENDPOINT } from '../../constants/apiEndpoints'

export async function getCMS (cmsData) {
    const { offset, limit, token, search } = cmsData
    const response = await axios.get(API_GET_CMS_ENDPOINT, { headers: { 'Content-Type': 'application/json', accept: 'application/json', Authorization: `Bearer ${token}` }, params: { limit, offset, search } })
    return response.data
}

export async function showCMS (cmsData) {
    const { token, id } = cmsData
    const response = await axios.get(`${API_SHOW_CMS_ENDPOINT}/${id}/edit`, { headers: { 'Content-Type': 'application/json', accept: 'application/json', Authorization: `Bearer ${token}` } })
    return response.data
}
