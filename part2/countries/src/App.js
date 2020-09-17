import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res=> {
      setCountries(res.data)
    })
  }

  useEffect(hook, []);

  const doFilter = (event) => {
    setFilter(event.target.value);
  }

  const filtering = () => {
    if (filter) {
      let list = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

      if (list.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
      } else if (list.length === 1) {
        let one = list[0];
        return (
          <div>
            <h2>{one.name}</h2>
            <p>{one.capital}</p>
            <p>{one.population}</p>
            <h4>languages</h4>
            <ul>
              {one.languages.map(lang=> <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img src={one.flag} alt={'#'} style={{width: '100px', height: '100px'}}/>
          </div>
        )
      } else if (list.length < 1) {
        return (<p>No match found, try another filter</p>)
      } else {
        return (
          <div>
            { list.map((l,i) => <p key={i}>{l.name}</p>) }
          </div>
        )
      }
    } else {
      return (<p>Use filter to find countries</p>)
    }
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={doFilter}/>
      </div>
      {
        filtering()
      }
    </div>
  );
}

export default App;