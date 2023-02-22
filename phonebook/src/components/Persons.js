import React from 'react'
import personsService from '../services/persons'

const Persons = ( { persons, setPersons, setMessage } ) => {
  const deleteUser = (id) => {
    if (window.confirm('comfirm delete')) {
      personsService.deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        console.log(error);
        setMessage(`${error.name} is already deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 4000);
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