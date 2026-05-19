import { useState } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import SearchBar from './components/SearchBar'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  
  // add a new person to the phonebook if name doesn't already exist
  const handleAddPerson = (name, phone) => {
    if (persons.some((p) => p.name === name)) {
      alert(`${name} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({
      name,
      phone,
      id: persons.length + 1
    }))
  }

  // search query
  const [query, setQuery] = useState('')

  const personsToShow = query === ''
    ? persons
    : persons.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))

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