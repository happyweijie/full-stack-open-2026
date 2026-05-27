import { useState, useEffect } from 'react';

import countriesService from './services/countries';
import CountryDetail from './components/CountryDetail';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    countriesService
      .getAll()
      .then(countriesList => setCountries(countriesList));
  }, [])
  
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const searchResults = countries
    .filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()));

  const renderResults = () => {
    if (query === '') {
      return null
    }

    if (searchResults.length > 10) {
      return <p>Too many countries, specify another filter</p>
    }

    if (searchResults.length > 1) {
      return searchResults.map(country => (
        <p key={country.name.common}>{country.name.common}</p>
      ))
    }

    if (searchResults.length === 1) {
      return <CountryDetail country={searchResults[0]} />
    }

    return <p>No matches</p>
  }

  return (
    <div>
      find countries 
      <input 
        type="text" 
        name="query" 
        value={query} 
        onChange={handleChange} 
      />

      {renderResults()}
    </div>
  );
}

export default App
