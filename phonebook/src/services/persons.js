import axios from 'axios'

const baseUrl = '/api/persons';
const getAllPeople = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const setNewPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const deletePerson = (person) => {
    return axios.delete(`${baseUrl}/${person}`)
}

const updateNumber = (newPerson, id) => {
    return axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data)
}

export default {
    getAllPeople,
    setNewPerson,
    deletePerson,
    updateNumber
}