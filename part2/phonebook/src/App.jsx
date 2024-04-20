import { useState, useEffect } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', match: true, id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', match: true, id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', match: true, id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', match: true, id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
          match: false,
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

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    console.log(persons)
    let filter = event.target.value
    // update filter box
    setNewFilter(filter)

    // only show people that have names that contain the filter text
    for (let i in persons) {
      if (persons[i].name.toLowerCase().includes(filter.toLowerCase())) {
        persons[i].match = true
      } else {
        persons[i].match = false
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
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
      {persons.map(person => person.match ? <Persons key={person.id} name={person.name} number={person.number}/> : '')}
    </div>
  )
}

export default App