import axios from 'axios'
const baseUrl = 'api/blogs'
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const formatedToken = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  return `Bearer ${user.token}`
}

const create = (blog) => {
  const token = formatedToken()
  const config = {
    headers: {
      Authorization: token
    }
  }
  return axios.post(baseUrl, blog, config).then(res => res.data).catch(err => new Error(err.response.data.error))
}

export default { getAll, create }