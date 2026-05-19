const SearchBar = ({ query, setQuery }) => {

  const handleQueryChange = (event) => setQuery(event.target.value)

  return (
    <>
			search for <input value={query} onChange={handleQueryChange} />
    </>             
  )
}

export default SearchBar
