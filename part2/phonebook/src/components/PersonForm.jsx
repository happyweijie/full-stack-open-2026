import { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {
  // new name to be added to the phonebook
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)

  // new name to be added to the phonebook
  const [newPhone, setNewPhone] = useState('')
  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  // add a new name to the phonebook if it doesn't already exist
  const addPerson = (persons, setPersons) => (event) => {
    event.preventDefault()
    
    // check if the name already exists
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({
      name: newName,
      phone: newPhone,
      id: persons.length + 1
    }))
    setNewName('')
  }

  return (
    <form onSubmit={addPerson(persons, setPersons)} >
      <div>
        name: <input value={newName} onChange={handleNameChange} required/>
      </div>
      <div>
        phone: <input value={newPhone} onChange={handlePhoneChange} required/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
