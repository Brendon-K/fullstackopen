import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const get = id => {
  return axios.get(`${baseUrl}/${id}`)
}

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  get, getAll, create, remove
}