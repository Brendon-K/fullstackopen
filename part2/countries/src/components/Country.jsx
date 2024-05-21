import axios from 'axios'

const Country = ({countries, buttonClick, apiKey, weather}) => {
  if (countries.length > 1) {
    return (
      <>
        {countries.map(country => <p key={country.cca2} >{country.name.common} <button type="button" onClick={() => buttonClick(country)}>show</button></p>)}
      </>
    )
  } else if (countries.length === 1) {
    // skip if data hasn't been received yet
    if (weather.length === 0) return(<></>)
    const country = countries[0]

    return (
      <>
        <h1>{country.name.common}</h1>
        capital {country.capital}<br />
        area {country.area}<br /><br />

        <b>languages:</b>
        <ul>
          {Object.keys(country.languages).map(language => <li key={language}>{country.languages[language]}</li>)}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt}/>

        <h2>Weather in {country.name.common}</h2>
        temperature {weather[0].toFixed(2)} Celsius<br/>
        <img src={`https://openweathermap.org/img/wn/${weather[1]}.png`} /><br/>
        wind {weather[2]} m/s
      </>
    )
  }
}

export default Country