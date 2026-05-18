import { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {
  // new name to be added to the phonebook
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)

  // add a new name to the phonebook if it doesn't already exist
  const addPerson = (persons, setPersons) => (event) => {
    event.preventDefault()
    
    // check if the name already exists
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({
      name: newName
    }))
    setNewName('')
  }

  return (
    <form onSubmit={addPerson(persons, setPersons)} >
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
