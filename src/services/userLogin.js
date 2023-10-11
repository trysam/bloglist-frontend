import axios from 'axios'
const baseURL = '/api/login'

const userLogin = async credentials => {
  const response =  await axios.post(baseURL, credentials)
  return response.data
}

export default userLogin