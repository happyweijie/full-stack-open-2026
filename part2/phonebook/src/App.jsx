import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import SearchBar from './components/SearchBar'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService.getAllPersons()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  
  // add a new person to the phonebook if name doesn't already exist
  const handleAddPerson = (name, phone) => {
    if (persons.some((p) => p.name === name)) {
      alert(`${name} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: name,
      number: phone
    }

    personService.createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
  }

  const handleDeletePerson = (id) => {
    personService.deletePerson(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
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
      <PersonList persons={personsToShow} onDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App