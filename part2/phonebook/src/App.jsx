import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , id: 1}
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    //let exists = Object.values(obj).includes("test1");

    // check if the name already exists in the phonebook
    let isDuplicate = false
    for (i in persons) {
      if (Object.values(persons[i]).includes(newName)) {
        isDuplicate = true
      }
    }

    if (isDuplicate) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const personObject = {
        name: newName,
        id: persons.length+1
      }

      let newPersons = persons.concat(personObject)
      setPersons(newPersons)
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Numbers key={person.id} name={person.name}/>)}
    </div>
  )
}

export default App