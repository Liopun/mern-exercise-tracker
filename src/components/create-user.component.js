import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      username: ''
    }
    this.state = this.initialState;

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }
    console.log(user);
    axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form>
          <div className="form-group">
            <label>Username: </label>
            <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername} required />
          </div>
          <div className="form-group">
            <input onClick={this.onSubmit} type="button" value="Create user" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
