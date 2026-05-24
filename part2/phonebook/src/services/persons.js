import axios from "axios"

const BASE_URL = "http://localhost:3001/persons"

const getAllPersons = () => {
  return axios.get(BASE_URL)
    .then(response => response.data)
}

const createPerson = (person) => {
  return axios.post(BASE_URL, person)
    .then(response => response.data)
}

const updatePerson = (id, updatedPerson) => {
  return axios.put(`${BASE_URL}/${id}`, updatedPerson)
    .then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${BASE_URL}/${id}`)
}

export default { getAllPersons, createPerson, updatePerson, deletePerson }
