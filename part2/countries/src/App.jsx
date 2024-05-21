import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

function App() {
  const countriesUrl = 'http://localhost:3001/countries'
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState([])

  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

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
    for (let i = 0; i < matches.length; ++i) {
      const match = matches[i]
      if (match.name.common.toLowerCase() === searchTerm) {
        return [match]
      }
    }
    return matches
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const showDetails = (country) => {
    setSearch(country.name.common)
  }

  const matches = findMatches(countries, search)

  // get temp info if only 1 match
  if (matches.length === 1 && weather.length === 0) {
    const country = matches[0]
    const [lat, lon] = country.latlng
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    let temp = {} 
    let wind = {}

    axios
      .get(url)
      .then(response => {
        const kelvin = response.data.main.temp
        const icon = response.data.weather[0].icon
        const wind = response.data.wind.speed
        const newWeather = [kelvin - 273.15, icon, wind]
        setWeather(newWeather)
      })
  } else if (matches.length !== 1 && weather.length !== 0) {
    setWeather([])
  }



  return (
    <>
      find countries <input
        onChange={handleSearchChange}
      />
      <Country countries={matches} buttonClick={showDetails} apiKey={apiKey} weather={weather} />
    </>
  )
}

export default App
