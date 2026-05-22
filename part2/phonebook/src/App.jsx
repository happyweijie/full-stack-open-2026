import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import SearchBar from './components/SearchBar'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
  }, [])
  
  // add a new person to the phonebook if name doesn't already exist
  const handleAddPerson = (name, phone) => {
    if (persons.some((p) => p.name === name)) {
      alert(`${name} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({
      name: name,
      number: phone,
      id: String(persons.length + 1)
    }))
  }

  // search query
  const [query, setQuery] = useState('')

  const personsToShow = query.trim() === ''
    ? persons
    : persons.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar query={query} setQuery={setQuery} />

      <h3>Add a new contact</h3>
      <PersonForm onAddPerson={handleAddPerson} />

      <h3>Numbers</h3>
      <PersonList persons={personsToShow} />
    </div>
  )
}

export default App