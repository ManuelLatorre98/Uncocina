import axios from "axios";
import { useSelector } from "react-redux";
const fetcher = (method, endPointURL, body, token) => {
  
  const apiService = axios.create({
    baseURL: process.env.BASE_API_URL
  })

  apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return apiService[method](endPointURL, body)
}

export const postService = (endPointURL, data, token) => {
  return fetcher('post', endPointURL, data, token)
}

export const putService = (endPointURL, data, token) => {
  return fetcher('put', endPointURL, data, token)
}

export const getQueryService = (endPointURL, data, token) => {
  const params = {params: data}
  return fetcher('get', endPointURL, params,token)
}

export const deleteService = (endPointURL, data, token) => {
  return fetcher('delete', endPointURL, {data:data},token)
}



