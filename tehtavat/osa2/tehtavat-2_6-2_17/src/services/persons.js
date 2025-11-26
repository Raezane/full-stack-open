import axios from "axios";
const url = 'http://localhost:3001/persons'

const getPersons = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const addPerson = newPerson => {
  const request = axios.post(url, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (name) => {
  return axios.delete(`${url}/${name}`)
}

const updateNumber = (id, changedNumPerson) => {
  const request = axios.put(`${url}/${id}`, changedNumPerson)
  return request.then(response => response.data)
}

export default {getPersons, addPerson, deletePerson, updateNumber}