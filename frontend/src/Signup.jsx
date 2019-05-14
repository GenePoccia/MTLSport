import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };
  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("first name", this.state.firstName);
    data.append("last name", this.state.lastName);
    fetch("http://localhost:4000/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (!body.success) {
          alert("Username already used");
          return;
        }
        this.props.dispatch({ type: "login-success" });
        this.props.history.push("/myAccount");
      });
  };

  render = () => {
    return (
      <div className="signup">
        <h3>Sign-up</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            className="pass"
            type="text"
            onChange={this.handlePasswordChange}
            placeholder="First name"
          />
          <input
            className="pass"
            type="text"
            onChange={this.handlePasswordChange}
            placeholder="Last name"
          />
          <input
            className="pass"
            type="text"
            onChange={this.handleUsernameChange}
            placeholder="Username"
          />
          <input
            className="pass"
            type="text"
            onChange={this.handlePasswordChange}
            placeholder="Password"
          />
          <input className="submit" type="submit" />
        </form>
      </div>
    );
  };
}
let Signup = connect()(UnconnectedSignup);
export default withRouter(Signup);
