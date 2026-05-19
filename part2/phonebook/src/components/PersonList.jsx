const PersonList = ({ persons }) => {
  return (
    <ul>
      {persons.length === 0
        ? <li>No contacts.</li>
        : persons.map((p) => <li key={p.id}>{p.name} {p.phone}</li>)
      }
    </ul>
  )
}

export default PersonList