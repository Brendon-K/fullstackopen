import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
        // check visibility according to active filter
        let matching = false;
        if (newName.toLowerCase().includes(newFilter)) {
          matching = true
        }

        const personObject = {
          name: newName,
          number: newNumber,
          match: matching,
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
      <Filter filter={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange} numberValue={newNumber} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        {persons.map(person => person.match ? <Persons key={person.id} name={person.name} number={person.number}/> : '')}
      </div>
    </div>
  )
}

export default App