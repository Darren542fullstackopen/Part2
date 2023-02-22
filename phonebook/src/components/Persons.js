import React from 'react'
import personsService from '../services/persons'

const Persons = ( { persons, setPersons, setMessage, setErrorMsg } ) => {
  const deleteUser = (personObject) => {
    if (window.confirm('comfirm delete')) {
      personsService.deletePerson(personObject.id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== personObject.id));
      })
      .catch(error => {
        console.log(error);
        console.log(persons.filter(person => person.id !== personObject.id));
        setMessage(`${personObject.name} is already deleted`);
        setErrorMsg(true);
        setTimeout(() => {
          setMessage(null);
          setErrorMsg(false);
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
          <button onClick={() => deleteUser(person)}>delete user</button>
        </div>
      )
    })}
  </>
)
  }

export default Persons