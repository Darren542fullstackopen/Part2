import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PersonFilter from './components/PersonFilter'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterString, setFilterString] = useState('')
  const [message, setMessage] = useState(null)

  const hook = () => {
    personsService.getAllPeople()
      .then(response => {
          setPersons(response);
      })
      .catch(error => {
        console.log(error)
      });
  }

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setFilterString(event.target.value);
  }

  const matchingNumbers = persons.filter(person => person.name.toUpperCase().includes(filterString.toUpperCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <PersonFilter
        filterString={filterString}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add New</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h2>Numbers</h2>
      <Persons persons={matchingNumbers} setPersons={setPersons} setMessage={setMessage} />
    </div>
  )
}

export default App