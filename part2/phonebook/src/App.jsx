import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    // decline if the fields are empty
    if (newName === '' || newNumber === '') {
      alert('You need to enter a value in both boxes!')
    } else {
      // check if the name already exists in the phonebook
      let isDuplicate = false
      for (let i in persons) {
        if (Object.values(persons[i]).includes(newName)) {
          isDuplicate = true
        }
      }

      if (isDuplicate) {
        alert(`${newName} is already added to the phonebook`)
      } else {
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length+1
        }

        let newPersons = persons.concat(personObject)
        setPersons(newPersons)
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input type='tel' value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Numbers key={person.id} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App