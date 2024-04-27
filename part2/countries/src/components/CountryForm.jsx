const CountryForm = ({countryValue, onCountryChange}) => {
  return (
    <form>
      <div>
        find countries <input value={countryValue} onChange={onCountryChange} />
      </div>
    </form>
  )
}

export default CountryForm