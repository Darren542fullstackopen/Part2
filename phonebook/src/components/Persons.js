import React from 'react'
import personsService from '../services/persons'

const Persons = ( { persons, setPersons } ) => {
  const deleteUser = (id) => {
    if (window.confirm('comfirm delete')) {
      personsService.deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id));
      })
    }

  }
  return (
  <>
    {persons.map(person => {
      return (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deleteUser(person.id)}>delete user</button>
        </div>
      )
    })}
  </>
)
  }

export default Persons