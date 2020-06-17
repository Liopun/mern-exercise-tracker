import React, { Component } from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {

  constructor(props) {
    super(props);
    this.initialState = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
    this.state = this.initialState;

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
        .then(response => {
          this.setState({
            username: response.data.username,
            description: response.data.description,
            duration: response.data.duration,
            date: new Date(response.data.date)
          })
        })
        .catch(function(err) {
          console.log(err);
        })
    
    axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value })
  }
  onChangeDescription(e) {
    this.setState({ description: e.target.value })
  }
  onChangeDuration(e) {
    console.log(e)
    this.setState({ duration: e.target.value })
  }
  onChangeDate(date) {
    this.setState({ date: date })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }


  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput" className="form-control" value={this.state.username} onChange={this.onChangeUsername} required>
              {
                this.state.users.map(function(user) {
                  return <option key={user} value={user}> {user} </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription} required />
          </div>
          <div className="form-group">
            <label>Duration (minutes): </label>
            <input type="text" className="form-control" value={this.state.duration} onChange={this.onChangeDuration} required />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
