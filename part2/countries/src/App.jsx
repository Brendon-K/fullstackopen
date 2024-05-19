import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

function App() {
  const countriesUrl = 'http://localhost:3001/countries'
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(countriesUrl)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // check for matches
  const findMatches = (list, searchTerm) => {
    const matches = list.filter(entry => entry.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    return matches
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const showDetails = (country) => {
      setSearch(country.name.common)
  }

  const matches = findMatches(countries, search)

  return (
    <>
      find countries <input
        onChange={handleSearchChange}
      />
      <Country countries={matches} buttonClick={showDetails} />
    </>
  )
}

export default App
