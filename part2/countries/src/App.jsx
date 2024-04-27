import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryForm from './components/CountryForm'
import Country from './components/Country'
import CountryDetails from './components/CountryDetails'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newCountry, setCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  // find possible country matches
  let matches 
  // check for a perfect match
  matches = countries.filter(country => country.name.common.toLowerCase() === newCountry)
  if (matches.length !== 1) {
    matches = countries.filter(country => country.name.common.toLowerCase().includes(newCountry))
  }

  return (
    <div>
      <CountryForm 
        countryValue={newCountry} 
        onCountryChange={handleCountryChange} 
      />
      {matches.length > 10 ? ("Too many matches") : null}
      {matches.length < 11 && matches.length > 1 ? (matches.map(match => <Country key={match.cca2} name={match.name.common} />)) : null }
      {matches.length === 1 ? (<CountryDetails country={matches[0]} />) : null}
    </div>
  )
}

export default App