import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const notExisting = {
    id: 10000,
    content: 'this note does not exist',
    important: true,
  }
  return request.then(response => response.data.concat(notExisting))
}

const create = newObject => {
  const request =  axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
//   return request.then(response => response.data)
}

export default { 
  getAll, 
  create, 
  update
}