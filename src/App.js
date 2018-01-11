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
    this.removeNote = this.removeNote.bind(this);
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
    var notes = this.state.notes;
    // NOTE: date is handled from database so whenever we create a new note we will get the current date
    // var date = this.refs.date.value;
    // console.log("date", new Date(date));
    Request.post(baseUrl)
           .send({ title: title, body: body })
           .then(res => {
             // this.setState({
             //   notes: notes.push(res.body)
             // })
             // alert('Yay you did it!' + JSON.stringify(res.body));
             this.refs.noteForm.reset();
             window.location.reload(true);
           });
  }

  // handling remove note
  removeNote(index) {
    // console.log(index);

    // let notes = this.state.notes;
    // let note = notes.find(note => {
    //   return note.id === index;
    // })
    //
    // console.log(note);
    var notes = this.state.notes;
    Request.del(baseUrl + `/${index}`)
          .send({ id: index })
          .set('Accept', 'application/json')
          .end((err, res) => {
            if(err) return console.error(err);
            // alert('Note Deleted');
            window.location.reload(true);
          });
  }

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
            <div className="col-lg-2 col-md-2 col-sm-2">
              <button type="button" onClick={this.removeNote.bind(null, note.id)}>Delete</button>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-4"></div>
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
           <div className="jumbotron">
             <p className="warn"><strong>WARNING: I should be handling change state (setState) when sending a post and delete request to API but, I am not that comfortable with superagent module yet so, I am not handling this yet but, I'll get back to that soon and change superagent to fetch to send requests to api</strong></p>
           </div>

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
}

export default App;
