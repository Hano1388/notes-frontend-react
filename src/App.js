import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.details = this.details.bind(this);
    this.state = {
      notes: [],
      title: 'Simple Note Application',
      body: 'note body',
      date: '2018-01-01',
      counter: 0
    }
  }

  // handling add note
  addNote(event) {
    // debugger
    event.preventDefault();
    let title = this.refs.title.value;
    let body = this.refs.body.value;
    let date = this.refs.date.value;
    let counter = this.state.counter;

    let note = {
      title,
      body,
      date,
      counter
    };
    counter += 1;
    let notes = this.state.notes;

    notes.push(note);

    this.setState({
      notes: notes,
      counter: counter
    });
    this.refs.noteForm.reset();
  }

  // handling removing note
  removeNote(index) {
    // console.log(index);
    let notes = this.state.notes;

    let note = notes.find(note => {
      return note.counter === index;
    });
    // console.log(note);
    notes.splice(note, 1);
    this.setState({
      notes: notes
    });
  }

  // handling note details
  details(index) {
    let notes = this.state.notes;

    let note = notes.find(note => {
      return note.counter === index;
    });

    console.log('You are clicking on ');
    console.log(note);
  }

  render() {
    let title = this.state.title;
    let notes = this.state.notes;
    return (
      <div className="App">
        <h1>{title}</h1>
        <form ref="noteForm">
          <input type="text" ref="title" placeholder="note title" />
          <input type="text" ref="body" placeholder="what is your note about" />
          <input type="date" ref="date" placeholder="2018-01-01" />
          <button onClick={this.addNote}>Add Note</button>
        </form>
        <ul>
          {notes.map((note =>
            <li key={note.counter}>
              {note.title} -
              {note.body} -
              {note.date} -
              <button onClick={this.removeNote.bind(null, note.counter)}>Remove Note</button>
              <button onClick={this.details.bind(null, note.counter)}>View Details</button>
          </li>))}
        </ul>
      </div>
    );
  }
}

export default App;
