import React, { useState } from 'react'
import personsService from '../services/persons'
import axios from 'axios'

const PersonForm = ( props ) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const submitName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    const found = props.persons.map(person => person.name).includes(newName);
    const found2 = props.persons.find(person => person.name === newName);
    console.log(found2);
    console.log('found2', found2);
    if (!found) {
      personsService.setNewPerson(newPerson)
            .then(response => {
              console.log(response);
              props.setPersons(props.persons.concat(response));
              props.setMessage(`Added ${newName}`)
              setTimeout(() => {
                props.setMessage(null)
              }, 4000);
            })
            .catch(error => { console.log(error) })
    } else {
      personsService.updateNumber(newPerson, found2.id)
        .then(response => {
          console.log('update response', response);
          props.setPersons(props.persons.map(person => person.name === newPerson.name ? response : person))
        })
        .catch(error => {
          console.log('update error', error);
          props.setMessage(`Information of ${newName}`)
          setTimeout(() => {
            props.setMessage(null)
          }, 4000);
        })
      alert(`${newName} is already in phonebook`);
    }

    setNewName('');
    setNewNumber('');
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <form>
    <div>name:
      <input value={newName} onChange={handleNewNameChange} />
    </div>
    <div> number:
      <input value={newNumber} onChange={handleNewNumberChange} />
    </div>
    <div>
      <button onClick={submitName} type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm;