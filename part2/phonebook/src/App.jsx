import { useState, useEffect } from 'react'
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
  const handleAddPerson = (name, number) => {
    if (persons.some((p) => p.name === name)) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        handleUpdatePerson(name, number)
        return
      }
    }

    const newPerson = {
      name: name,
      number: number
    }

    personService.createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
  }

  const handleUpdatePerson = (name, number) => {
      const oldPerson = persons.find(p => p.name === name)
      const updatedPerson = {
        ...oldPerson,
        number: number
      }
      
      personService.updatePerson(oldPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => {
            return p.id === oldPerson.id 
              ? returnedPerson 
              : p
          }))
        })
  }

  const handleDeletePerson = (id) => {
    personService.deletePerson(id)
      .then(() => {
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