import { useState, useEffect } from 'react';
import Note from './components/Note.js';
import axios from 'axios';
import noteService from './services/notes.js'
import Notification from './components/Notification.js';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = ( props ) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happended')

  const hook = () => {
    console.log('effect')
    noteService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response)
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  useEffect(hook, []);
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    noteService
      .create(noteObject)
      .then(response => {
        console.log('res', response)
        setNotes(notes.concat(response));
        setNewNote('');
      })
      .catch(error => {
        console.log('error', error);
      })


  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(n => n.id !== id ? n : response))
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      });
    console.log('importance of ' + id + ' needs to be toggled')
  }

  function Example() {
    const [count, setCount] = useState(0);
  
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
      document.title = `You clicked ${count} times`;
    });
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      {Example()}
      <Footer />
    </div>
  )

}

export default App;
