import axios from 'axios'
const baseUrl: string = '/api/users'

const register = async (credentials: any) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { register }
