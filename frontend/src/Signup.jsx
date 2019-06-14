import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      age: ""
    };
  }
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handleEmailChange = event => {
    this.setState({ email: event.target.value });
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
  handleAgeChange = event => {
    this.setState({ age: event.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("email", this.state.email);
    console.log("email", this.state.email);
    data.append("password", this.state.password);
    data.append("firstName", this.state.firstName);
    data.append("lastName", this.state.lastName);
    data.append("age", this.state.age);
    if (this.state.firstName === "") {
      alert("please enter your first name");
      return;
    }
    if (this.state.email === "") {
      alert("please enter your email address");
      return;
    }
    if (this.state.lastName === "") {
      alert("please enter your last name");
      return;
    }
    if (this.state.password === "") {
      alert("please enter your password");
      return;
    }
    if (this.state.username === "") {
      alert("please enter your username");
      return;
    }
    if (this.state.age === "") {
      alert("please enter your age");
      return;
    }
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
        this.props.dispatch({
          type: "login-success",
          username: this.state.username,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          age: this.state.age
        });
        this.props.history.push("/myAccount");
      });
  };

  render = () => {
    return (
      <div>
        <h3 className="textboth">Sign-up</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            className="pass"
            type="text"
            onChange={this.handleFirstNameChange}
            placeholder="First name"
          />
          <input
            className="pass"
            type="text"
            onChange={this.handleLastNameChange}
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
            onChange={this.handleEmailChange}
            placeholder="Email"
          />
          <input
            className="pass"
            type="password"
            onChange={this.handlePasswordChange}
            placeholder="Password"
          />
          <input
            className="pass"
            type="number"
            onChange={this.handleAgeChange}
            placeholder="How old are you?"
          />
          <input className="submit" type="submit" />
        </form>
      </div>
    );
  };
}

let Signup = connect()(UnconnectedSignup);
export default withRouter(Signup);
