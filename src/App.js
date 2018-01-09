import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.addNote = this.addNote.bind(this);
    this.state = {
      notes: [],
      title: 'Simple Note Application',
      body: 'note body',
      date: '2018-01-01'
    }
  }

  addNote(event) {
    debugger
    event.preventDefault();
    let title = this.refs.title.value;
    let body = this.refs.body.value;
    let date = this.refs.date.value;

    let note = {
      title,
      body,
      date
    };
    let notes = this.state.notes;

    notes.push(note);

    this.setState({
      notes: notes
    })
  }

  render() {
    let title = this.state.title;
    let notes = this.state.notes;
    return (
      <div className="App">
        <h1>{title}</h1>
        <form>
          <input type="text" ref="title" placeholder="note title" />
          <input type="text" ref="body" placeholder="what is your note about" />
          <input type="date" ref="date" placeholder="2018-01-01" />
          <button onClick={this.addNote}>Add Note</button>
        </form>
        <pre>
          {JSON.stringify(notes)}
        </pre>
      </div>
    );
  }
}

export default App;
