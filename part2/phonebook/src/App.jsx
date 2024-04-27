import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const baseUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

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
        // confirm if replace number
        if (window.confirm(`${newName} is already added to the phonebook.\nReplace the old number with a new one?`)) {
          console.log('yes')
          // find id for the given name
          let id
          persons.forEach(person => {
            if (person.name === newName) {
              id = person.id
            }
          })
          
          personService
            .update(id, personObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== id ? person : response.data))
              setNewName('')
              setNewNumber('')
            })
        }

      } else {
        personService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  // remove a person from the list
  const removePerson = (id) => {
    personService
      .get(id)
      .then(response => {
        if (window.confirm(`Delete ${response.data.name}?`)) {
          personService
            .remove(id)
            .then(response => {
              setPersons(persons.filter(person => person.id !== id))
            })
        }
      })
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
  }

  // Create a list of people who match the current search filter
  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={newFilter} 
        onChange={handleFilterChange} 
      />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        onNameChange={handleNameChange} 
        numberValue={newNumber} 
        onNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <div>
        {peopleToShow.map(person => 
          <Persons 
            key={person.id} 
            name={person.name} 
            number={person.number}
            remove={() => removePerson(person.id)}
          />
        )}
      </div>
    </div>
  )
}

export default App