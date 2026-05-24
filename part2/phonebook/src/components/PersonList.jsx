const PersonList = ({ persons, onDeletePerson }) => {
  const handleDeleteClick = (id) => () => {
    const person = persons.find(p => p.id === id)
    
    if (window.confirm(`Delete ${person.name}?`)) {
      onDeletePerson(id)
    }
  }

  return (
    <ul>
      {persons.length === 0
        ? <li>No contacts.</li>
        : persons.map(p => {
          return <li key={p.id}>
            {p.name} {p.number} <button onClick={handleDeleteClick(p.id)}>delete</button>
            </li>
        })
      }
    </ul>
  )
}

export default PersonList