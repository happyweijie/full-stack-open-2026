import { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)

  const addPerson = (persons, setPersons) => (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName
    }

    setPersons(persons.concat(newPerson))
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
