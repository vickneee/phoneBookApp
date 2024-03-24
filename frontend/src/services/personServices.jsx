import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons' // Backend URL for the persons before deployment
const baseUrl = 'https://phonebook-backend-cmob.onrender.com/api/persons' // Backend URL for the persons after deployment
// Also Vite config was updated to proxy the request to the backend server

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  deletePerson
}