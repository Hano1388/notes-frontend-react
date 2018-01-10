import React, { Component }   from 'react';
import logo                   from './logo.svg';
import Request                from 'superagent';
import _                      from 'lodash';
import './App.css';

class App extends Component {

  constructor() {
    super();
    // this.addNote = this.addNote.bind(this);
    // this.removeNote = this.removeNote.bind(this);
    // this.details = this.details.bind(this);
    this.state = {
      // notes: [],
      // title: 'Simple Note Application',
      // body: 'note body',
      // date: '2018-01-01',
      // counter: 0
    }
  }

  componentWillMount() {
    // Called the first time the component is loaded right before the component is added to the page
    var url = "http://localhost:3000/api/notes";
    Request.get(url).then(response => {
      this.setState({
        notes: response.body.data
      });
    });
  }

  componentDidMount() {
    // CAlled when the props provided to the component are changed
  }

  componentWillReceiveProps(nextProps) {
    // Called when the props provided to the component are changed
  }

  componentWillUpdate(nextProps, nextState) {
    // Called when the props and/or state change
  }

  componentWillUnmount() {
    // Called when the component is removed
  }

  // handling add note
  // addNote(event) {
  //   // debugger
  //   event.preventDefault();
  //   let title = this.refs.title.value;
  //   let body = this.refs.body.value;
  //   let date = this.refs.date.value;
  //   let counter = this.state.counter;
  //
  //   let note = {
  //     title,
  //     body,
  //     date,
  //     counter
  //   };
  //   counter += 1;
  //   let notes = this.state.notes;
  //
  //   notes.push(note);
  //
  //   this.setState({
  //     notes: notes,
  //     counter: counter
  //   });
  //   this.refs.noteForm.reset();
  // }

  // handling removing note
  // removeNote(index) {
  //   // console.log(index);
  //   let notes = this.state.notes;
  //
  //   let note = notes.find(note => {
  //     return note.counter === index;
  //   });
  //   // console.log(note);
  //   notes.splice(note, 1);
  //   this.setState({
  //     notes: notes
  //   });
  // }

  // handling note details
  // details(index) {
  //   let notes = this.state.notes;
  //
  //   let note = notes.find(note => {
  //     return note.counter === index;
  //   });
  //
  //   console.log('You are clicking on ');
  //   console.log(note);
  // }

  render() {
    // var notes = _.map(this.state.notes, (note) => {
    //   return <li>{note.title} - {note.body} - {note.date}</li>;
    // });
    var notes = _.map(this.state.notes, (note) => {
      return (
        <div className="container" key={note.id}>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 pull-left">
              <h2>{note.title}</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p>
                {note.body}
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-10 col-md-8 col-sm-6"></div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <p>{note.date.substring(0, 10)}</p>
            </div>
          </div>
          <hr />
        </div>
      )
    });

    return (
      <div className="container">
         <div className="App">
          {notes}
        </div>
      </div>
    )
  }

  // render() {
  //   let title = this.state.title;
  //   let notes = this.state.notes;
  //   return (
  //     <div className="App">
  //       <h1>{title}</h1>
  //       <form ref="noteForm">
  //         <input type="text" ref="title" placeholder="note title" />
  //         <input type="text" ref="body" placeholder="what is your note about" />
  //         <input type="date" ref="date" placeholder="2018-01-01" />
  //         <button onClick={this.addNote}>Add Note</button>
  //       </form>
  //       <ul>
  //         {notes.map((note =>
  //           <li key={note.counter}>
  //             {note.title} -
  //             {note.body} -
  //             {note.date} -
  //             <button onClick={this.removeNote.bind(null, note.counter)}>Remove Note</button>
  //             <button onClick={this.details.bind(null, note.counter)}>View Details</button>
  //         </li>))}
  //       </ul>
  //     </div>
  //   );
  // }
}

export default App;
