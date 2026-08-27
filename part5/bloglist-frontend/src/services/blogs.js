import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null;

const setToken = (value) => {
  token = `Bearer ${value}`;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token }
  })

  return response.data
}

export default { getAll, setToken, createBlog }