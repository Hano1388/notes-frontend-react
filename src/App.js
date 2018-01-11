import React, { Component }   from 'react';
import logo                   from './logo.svg';
import Request                from 'superagent';
import _                      from 'lodash';
import './App.css';
var baseUrl = "http://localhost:3000/api/notes";

class App extends Component {

  constructor() {
    super();
    this.addNote = this.addNote.bind(this);
    // this.removeNote = this.removeNote.bind(this);
    // this.details = this.details.bind(this);
    this.state = {
      notes: []
    }
  }

  componentWillMount() {
    // Called the first time the component is loaded right before the component is added to the page
    Request.get(baseUrl).then(response => {
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

  // handle addNote
  addNote(event) {
    event.preventDefault();
    var title = this.refs.title.value;
    var body = this.refs.body.value;
    // NOTE: date is handled from database so whenever we create a new note we will get the current date
    // var date = this.refs.date.value;
    // console.log("date", new Date(date));
    Request.post(baseUrl)
           .send({ title: title, body: body })
           .then(res => {
             // this.setState({
             //   notes: notes.push(res.body)
             // })
             alert('Yay you did it!' + JSON.stringify(res.body));
             this.refs.noteForm.reset();
           });
  }

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

             <form ref="noteForm">
                 <div className="form-group row">

                 <label htmlFor="title" className="col-2 col-form-label">Title</label>
                 <div className="col-10">
                   <input type="text" className="form-control" id="title" ref="title" placeholder="Note Title" />
                 </div>

                 <label htmlFor="body" className="col-2 col-form-label">Body</label>
                 <div className="col-10">
                   <textarea type="text" className="form-control" id="body" ref="body" placeholder="Note Description" ></textarea>
                 </div>

                 {/* <label htmlFor="date" className="col-2 col-form-label">Date</label>
                 <div className="col-10">
                   <input type="date" className="form-control" id="date" ref="date" placeholder="2018-01-01" />
                 </div> */}

                 <div className="col-12">
                   <button className="btn btn-sm btn-success float-right" onClick={this.addNote}>Add Note</button>
                 </div>
               </div>
             </form>
           <hr />

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
