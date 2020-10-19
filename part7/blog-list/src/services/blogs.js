import axios from 'axios'
const baseUrl = '/api/blogs'
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const formatedToken = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  return `Bearer ${user.token}`
}

const createComment = (blogId, comment) => {
  return axios
    .post(`${baseUrl}/${blogId}/comments`, comment)
    .then(res => res.data)
    .catch(err => new Error(err.response.data.error))
}

const create = (blog) => {
  const token = formatedToken()
  const config = {
    headers: {
      Authorization: token
    }
  }
  return axios
    .post(baseUrl, blog, config)
    .then(res => res.data)
    .catch(err => new Error(err.response.data.error))
}

const update = (blog) => {
  return axios
    .put(`${baseUrl}/${blog.id}`, blog)
    .then(res => res.data)
    .catch(err => new Error(err.response.data.error))
}

const deleteBlog = (id) => {
  const token = formatedToken()
  const config = {
    headers: {
      Authorization: token
    }
  }
  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then(() => 'successfull deleted')
    .catch(err => new Error(err.response.data.error))
}

export default { getAll, create, update, deleteBlog, createComment }