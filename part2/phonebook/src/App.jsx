import { useState, useEffect } from 'react'
import personService from './services/persons'

import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import SearchBar from './components/SearchBar'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService.getAllPersons()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const [notification, setNotification] = useState(null)
  
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
        
        // notification 
        setNotification(`Added ${returnedPerson.name}`)
        setTimeout(() => setNotification(null), 3000)
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

          setNotification(
            `Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`
          )
          setTimeout(() => setNotification(null), 3000)
        })
        
  }

  const handleDeletePerson = (name) => {
    const person = persons.find(p => p.name === name)

    personService.deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
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

      <Notification message={notification} />

      <SearchBar query={query} setQuery={setQuery} />

      <h3>Add a new contact</h3>
      <PersonForm onAddPerson={handleAddPerson} />

      <h3>Numbers</h3>
      <PersonList persons={personsToShow} onDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App