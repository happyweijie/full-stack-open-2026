import { useState } from 'react'

const PersonForm = ({ onAddPerson }) => {
  // new name to be added to the phonebook
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)

  // new name to be added to the phonebook
  const [newPhone, setNewPhone] = useState('')
  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    
    onAddPerson(newName, newPhone)
    setNewName('')
    setNewPhone('')
  }

  return (
    <form onSubmit={handleSubmit} >
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
