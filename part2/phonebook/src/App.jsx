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
          match: matching
        }

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
    console.log(
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
    )
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

  // Create a list of people who match the current search filter
  const peopleToShow = persons.filter(person => person.match === true)

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