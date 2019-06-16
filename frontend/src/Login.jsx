import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      details: {}
    };
  }
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        let details = body.results;
        this.setState({ details });
        if (!body.success) {
          alert("Login failed");
          return;
        }
        this.props.dispatch({
          type: "login-success",
          username: this.state.username,
          firstName: this.state.details.firstName,
          lastName: this.state.details.lastName,
          age: this.state.details.age
        });
        this.props.history.push("/");
      });
  };

  render = () => {
    return (
      <div>
        <h3 className="textboth">Login</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            className="pass"
            type="text"
            onChange={this.handleUsernameChange}
            placeholder="Username"
          />
          <input
            className="pass"
            type="password"
            onChange={this.handlePasswordChange}
            placeholder="Password"
          />
          <input className="submit" type="submit" />
        </form>
      </div>
    );
  };
}

let Login = connect()(UnconnectedLogin);
export default withRouter(Login);
