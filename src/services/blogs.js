import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = newToken => {
  token =  `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const addResource = async blog => {
  const config = {
    headers: { 'Authorization':token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const modifyBlog = async(adjustedBlog) => {
  const response = await axios.put(`${baseUrl}/${adjustedBlog.id}`, adjustedBlog)
  return response.data
}

const removeBlog = async(blog) => {
  const config = {
    headers: { 'Authorization':token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const blogService = { getAll, setToken, addResource, modifyBlog, removeBlog }
export default blogService