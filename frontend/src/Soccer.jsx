import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FilterLocation from "./FilterLocation.jsx";
import ThreadModal from "./ThreadModal.jsx";
import "./main.css";
class UnconnectedSoccer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    if (this.props.location !== undefined) {
      this.props.dispatch({ type: "location-change", value: undefined });
    }
  };
  render = () => {
    let messages = this.props.threads
      .filter(ele => {
        return ele.category === "soccer";
      })
      .reverse(); //takes the threads in the soccer category
    if (this.props.location !== undefined) {
      messages = messages.filter(ele => {
        return ele.location === this.props.location;
      });
    }
    let titles = messages.map(ele => {
      let linkTo = "/Soccer/" + ele._id;
      return (
        <Link className="threadTitle" to={linkTo}>
          {ele.threadTitle} | Location: {ele.location}
        </Link>
      );
    }); //returns the title

    if (titles.length === 0) {
      return (
        <div>
          <img
            className="thread-img"
            src="https://bloximages.chicago2.vip.townnews.com/emissourian.com/content/tncms/assets/v3/editorial/d/1a/d1acf7a6-070d-11e6-9014-4baa087a48e1/5717a367d8c80.preview.jpg"
          />
          <h2 className="thread-title">Soccer</h2>
          <div className="all-threads">
            <div className="move-location">
              <FilterLocation />
            </div>
            <div className="button-move">
              {this.props.loggedIn && <ThreadModal />}
            </div>
            <div className="thread-title-display no-games-message">
              No one is looking for games in your area, start one!
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <img
          className="thread-img"
          src="https://bloximages.chicago2.vip.townnews.com/emissourian.com/content/tncms/assets/v3/editorial/d/1a/d1acf7a6-070d-11e6-9014-4baa087a48e1/5717a367d8c80.preview.jpg"
        />
        <h2 className="thread-title"> Soccer games</h2>
        <div className="all-threads">
          <div className="move-location">
            <FilterLocation />
          </div>
          <div className="button-move">
            {this.props.loggedIn && <ThreadModal />}
          </div>
          <div>{titles}</div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    threads: state.threads,
    location: state.location,
    loggedIn: state.loggedIn
  };
};

let Soccer = connect(mapStateToProps)(UnconnectedSoccer);
export default Soccer;
