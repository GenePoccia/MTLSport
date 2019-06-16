import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FilterLocation from "./FilterLocation.jsx";
import ThreadModal from "./ThreadModal.jsx";
class UnconnectedTennis extends Component {
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
        return ele.category === "tennis";
      })
      .reverse(); //takes the threads in the soccer category

    if (this.props.location !== undefined) {
      messages = messages.filter(ele => {
        return ele.location === this.props.location;
      });
    }

    let titles = messages.map(ele => {
      let linkTo = "/Tennis/" + ele._id;
      return (
        <Link className="threadTitle" to={linkTo}>
          <div>
            <div>{ele.threadTitle} </div>
            <div className="titleofthread" style={{ display: "block" }}>
              Location: {ele.location}
            </div>
          </div>
        </Link>
      );
    }); //returns the title

    /*let replies = messages[0].replies.map(ele => {
      return (
        <div>
          <div>
            {ele.user} | {ele.msg}
          </div>
        </div>
      );
    });*/

    if (titles.length === 0) {
      return (
        <div>
          <img
            className="thread-img"
            src="https://media.timeout.com/images/102789069/image.jpg"
          />
          <h2 className="thread-title">Tennis games</h2>
          <div className="all-threads">
            <div className="move">
              <div className="move-location">
                <FilterLocation />
              </div>
              <div className="button-move">
                {this.props.loggedIn && <ThreadModal />}
              </div>
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
          src="https://media.timeout.com/images/102789069/image.jpg"
        />
        <h2 className="thread-title"> Tennis games</h2>
        <div className="all-threads">
          <div className="move">
            <div className="move-location">
              <FilterLocation />
            </div>
            <div className="button-move">
              {this.props.loggedIn && <ThreadModal />}
            </div>
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
let Tennis = connect(mapStateToProps)(UnconnectedTennis);
export default Tennis;
