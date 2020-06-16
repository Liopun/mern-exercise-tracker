import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
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
    // this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      users: ['test users'],
      username: 'test user'
    })
  }

  onChangeUsername(e) {
    this.setState = ({ username: e.target.value })
  }
  onChangeDescription(e) {
    this.state.description = e.target.value;
    this.setState = ({ description: e.target.value })
  }
  onChangeDuration(e) {
    console.log("Changedddd")
    this.setState = ({
      duration: e.target.value
    })
  }
  onChangeDate(date) {
    this.setState = ({ date: date })
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
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select className="form-control" value={this.state.username} onChange={this.onChangeUsername} required>
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
            <label>Duration (minitues): </label>
            <input type="text" className="form-control" defaultValue={this.state.duration} onChange={this.onChangeDuration.bind(this)} required />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
