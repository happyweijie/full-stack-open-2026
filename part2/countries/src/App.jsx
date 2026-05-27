import { useState, useEffect } from 'react';

import countriesService from './services/countries';
import CountryDetail from './components/CountryDetail';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  const displayCountryView = (country) => () => {
    setQuery(country.name.common);
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(countriesList => setCountries(countriesList));
  }, [])

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
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={displayCountryView(country)}>Show</button>
        </p>
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
        onChange={handleQueryChange} 
      />

      {renderResults()}
    </div>
  );
}

export default App
