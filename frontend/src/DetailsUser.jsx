import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
export default class UnconnectedDetailsUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [{ user: "", firstName: "", lastName: "", age: "", image: "" }]
    };
  }
  componentDidMount = () => {
    fetch("http://localhost:4000/detailsUser")
      .then(x => x.text())
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        let details = body.results.filter(ele => {
          return ele.user === this.props.username;
        });
        this.setState({ details });
      });
  };
  render = () => {
    return (
      <div className="userdetails">
        <img
          className="userimg"
          src="http://simpleicon.com/wp-content/uploads/account.png"
        />
        <div>{this.state.details[0].user}</div>
        {/* <div>Name:{this.state.details[0].firstName}</div> */}
        <div>{this.state.details[0].age} years old</div>
      </div>
    );
  };
}
