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
  const [notificationVariant, setNotificationVariant] = useState(null)
  const showNotification = (message, variant) => {
    // display notification 
    setNotification(message, true)
    setNotificationVariant(variant)

    // hide notification after 3s
    setTimeout(() => {
      setNotification(null)
      setNotificationVariant(null)
    }, 3000)
  }

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
        showNotification(
          `Added ${returnedPerson.name}`, 
          'success'
        )
      })
      .catch(error => {
        showNotification(
          error.response.data.error, 
          'error'
        )
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

          showNotification(
            `Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`, 
            'success'
          )
        })
        .catch(error => {
          showNotification(
            error.response.data.error, 
            'error'
          )
        })
  }

  const handleDeletePerson = (name) => {
    const person = persons.find(p => p.name === name)

    personService.deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))

        showNotification(
          `Information of ${name} removed from server`,
          'success'
        )
      })
      .catch(() => {
        showNotification(
          `Information of ${name} already removed from server`,
          'error'
        )
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

      <Notification 
        message={notification} 
        variant={notificationVariant} 
      />

      <SearchBar query={query} setQuery={setQuery} />

      <h3>Add a new contact</h3>
      <PersonForm onAddPerson={handleAddPerson} />

      <h3>Numbers</h3>
      <PersonList persons={personsToShow} onDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App