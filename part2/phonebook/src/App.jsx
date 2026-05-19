import { useState } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

  // new search query
  const [query, setQuery] = useState('')
  const handleQueryChange = (event) => setQuery(event.target.value)

  const personsToShow = query === ''
    ? persons
    : persons.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={query} onChange={handleQueryChange} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <PersonList persons={personsToShow} />
    </div>
  )
}

export default App