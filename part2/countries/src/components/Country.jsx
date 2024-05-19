const Country = ({countries, buttonClick}) => {
  console.log(countries)


  if (countries.length > 1) {
    return (
      <>
        {countries.map(country => <p>{country.name.common} <button type="button" onClick={() => buttonClick(country)}>show</button></p>)}
      </>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <>
        <h1>{country.name.common}</h1>
        capital {country.capital}<br />
        area {country.area}<br /><br />

        <b>languages:</b>
        <ul>
          {Object.values(country.languages).map(language => <li>{language}</li>)}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt}/>
      </>
    )
  }
}

export default Country