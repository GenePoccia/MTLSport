import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FilterLocation from "./FilterLocation.jsx";
import ThreadModal from "./ThreadModal.jsx";
class UnconnectedMisc extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    if (this.props.location !== undefined) {
      this.props.dispatch({ type: "location-change", value: undefined });
    }
  };
  render = () => {
    console.log("your are here", this.props.threads);
    let messages = this.props.threads
      .filter(ele => {
        return ele.category === "misc";
      })
      .reverse(); //takes the threads in the soccer category

    if (this.props.location !== undefined) {
      messages = messages.filter(ele => {
        return ele.location === this.props.location;
      });
    }

    let titles = messages.map(ele => {
      let linkTo = "/Misc/" + ele._id;
      return (
        <Link className="threadTitle" to={linkTo}>
          {ele.threadTitle}
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
            src="http://gamerlimit.com/wp-content/uploads/2016/04/original.jpg"
          />
          <h2 className="thread-title">Miscellaneous Sports</h2>
          <div className="all-threads">
            <FilterLocation />
            {this.props.loggedIn && <ThreadModal />}
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
          src="http://gamerlimit.com/wp-content/uploads/2016/04/original.jpg"
        />
        <h2 className="thread-title">Miscellaneous Sports</h2>
        <div className="all-threads">
          <FilterLocation />
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
let Misc = connect(mapStateToProps)(UnconnectedMisc);

export default Misc;
