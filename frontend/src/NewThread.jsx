import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class UnconnectedNewThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      threadTitle: "",
      category: "",
      msg: ""
    };
  }
  handleLocation = event => {
    this.setState({ location: event.target.value });
  };
  handleThreadTitle = event => {
    this.setState({ threadTitle: event.target.value });
  };
  handleCategory = event => {
    this.setState({ category: event.target.value });
  };
  handleMessage = event => {
    this.setState({ msg: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.category === "") {
      return alert("You must select a valid category");
    }

    if (this.state.location === "") {
      return alert("You must select a valid location");
    }

    if (this.state.threadTitle === "") {
      return alert("You must put a thread title");
    }

    if (this.state.msg === "") {
      return alert("You must enter a descriptive message");
    }
    let data = new FormData();
    data.append("location", this.state.location);
    data.append("threadTitle", this.state.threadTitle);
    data.append("category", this.state.category);
    data.append("msg", this.state.msg);

    fetch("http://localhost:4000/new-thread", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(response => response.text())
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (body.success) {
          alert("New thread added");
          this.props.dispatch({
            type: "set-newThread",
            newThread: body.results
          });
          this.props.dispatch({ type: "show-form", showAddThread: false });
        }
        fetch("http://localhost:4000/thread")
          .then(x => x.text())
          .then(responseBody => {
            let body = JSON.parse(responseBody);
            this.props.dispatch({ type: "get-threads", threads: body.results });
            this.props.history.push("/");
          });
      });
  };
  render = () => {
    return (
      <div>
        <form id="new-thread" onSubmit={this.handleSubmit}>
          <div>
            <div>Select your location</div>
            <select name="Location" onChange={this.handleLocation}>
              <option value="undefined">-------</option>
              <option value="Ahuntsic">Ahuntsic</option>
              <option value="Anjou">Anjou</option>
              <option value="Cote-Des-Neiges">Cote-Des-Neiges</option>
              <option value="Central Montreal">Central Montreal</option>
              <option value="East-Montreal">East-Montreal</option>
              <option value="Lachine">Lachine</option>
              <option value="Lasalle">Lasalle</option>
              <option value="Hochelaga">Hochelaga</option>
              <option value="Mount-Royal">Mount-Royal</option>
              <option value="Verdun">Verdun</option>
              <option value="West-Island">West-Island</option>
              <option value="Westmount">Westmount</option>
            </select>
          </div>
          <div>
            <div>Select your sport</div>
            <select name="Category" onChange={this.handleCategory}>
              <option value="undefined">------</option>
              <option value="basketball">Basketball</option>
              <option value="hockey">Hockey</option>
              <option value="tennis">Tennis</option>
              <option value="soccer">Soccer</option>
              <option value="rockclimbing">RockClimbing</option>
              <option value="misc">Misc</option>
            </select>

            {/* {this.props.categories.map(category => {
              return (
                <p>
                  <input
                    type="radio"
                    value={category}
                    checked={this.state.category === category}
                    onChange={this.handleSport}
                  />
                  {category}
                </p>
              );
            })}*/}
          </div>
          <p>
            <textarea
              onChange={this.handleThreadTitle}
              placeholder="Title"
              rows="2"
              cols="30"
              form="new-thread"
            />
          </p>
          <p>
            <textarea
              onChange={this.handleMessage}
              placeholder="Message"
              rows="2"
              cols="30"
              form="new-thread"
            />
          </p>
          <input type="submit" />
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { categories: state.threadCategories };
};
let NewThread = connect(mapStateToProps)(UnconnectedNewThread);
export default withRouter(NewThread);
