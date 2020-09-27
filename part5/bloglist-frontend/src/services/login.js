import axios from 'axios'

const baseURL = 'api/login'

const login = (credential) => {
  return axios.post(baseURL, credential)
}

export default { login }