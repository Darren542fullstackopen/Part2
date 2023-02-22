import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('');
  const [matches, setMatches] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect( () => {
    const response = axios.get('https://restcountries.com/v3.1/all').then(response => response.data).then(response => setCountries(response));
  } ,[]);
  
  useEffect( () => {
    setMatches(countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase())));
  }, [search, countries])

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  
    console.log(countries[0].name.common);
    console.log(countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase())));
  }

  const showView = (event) => {
    console.log(event);
    setSearch(event.target.value)
  }

  const makeOutput = (matches) => {
    if (!search) return 'Type in search bar';
    console.log(matches);
    if (matches.length > 10) {
      return 'Too many matches, specify another filter'
    } else if (matches.length === 0 ) {
      return 'No matches found'
    } else if (matches.length === 1) {
      return (<div>
                <div className='bigWords'>{matches[0].name.common}</div>
                <div className='capital'>capital {matches[0].capital[0]}</div>
                <div className='area'>area {matches[0].area}</div>
                <div className='languages'>
                  <strong>languages:</strong>
                  <ul>
                    { 
                      Object.values(matches[0].languages).map(val => (<li key={val}>{val}</li>))
                    }
                  </ul>
                </div>
                <div className='imageBox'>
                  <img src={matches[0].flags.png} alt='flag' />
                </div>
              </div>
        )
    }
    return matches.map((match, index) => 
    (<div key={index}>
      {match.name.common}
      <button value={match.name.common} onClick={(event) => showView(event)}>show</button>
      </div>)
  )
  }

  return (
    <div className="App">
      <div className='inputBar'>
        find countries
        <input value={search} onChange={handleSearchChange} />
      </div>
      <div className='outputDiv'>
        {makeOutput(matches)}
      </div>
    </div>
  );
}

export default App;
