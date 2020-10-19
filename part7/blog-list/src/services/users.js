import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = () => {
  return axios.get(baseUrl).then(res => res.data).catch(err => new Error(err.response.data.error))
}

export default { getAllUsers }