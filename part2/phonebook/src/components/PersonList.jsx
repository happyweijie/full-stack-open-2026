const PersonList = ({ persons, onDeletePerson }) => {
  const handleDeleteClick = (name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      onDeletePerson(name)
    }
  }

  return (
    <ul>
      {persons.length === 0
        ? <li>No contacts.</li>
        : persons.map(p => {
          return <li key={p.id}>
            {p.name} {p.number} <button onClick={handleDeleteClick(p.name)}>delete</button>
            </li>
        })
      }
    </ul>
  )
}

export default PersonList