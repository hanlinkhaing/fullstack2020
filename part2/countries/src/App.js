import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetail from './component/CountryDetail'
import Countries from './component/Countries'

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

  const filterFromList = (filter) => () => {
    setFilter(filter);
  }

  const filtering = () => {
    if (filter) {
      let list = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

      if (list.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
      } else if (list.length === 1) {
        return (
          <CountryDetail country={list[0]}/>
        )
      } else if (list.length < 1) {
        return (<p>No match found, try another filter</p>)
      } else {
        return (
          <Countries list={list}  filter={filterFromList}/>
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