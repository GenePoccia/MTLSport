import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FilterLocation from "./FilterLocation.jsx";
import ThreadModal from "./ThreadModal.jsx";
class UnconnectedHockey extends Component {
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
        return ele.category === "hockey";
      })
      .reverse(); //takes the threads in the soccer category

    if (this.props.location !== undefined) {
      messages = messages.filter(ele => {
        return ele.location === this.props.location;
      });
    }

    let titles = messages.map(ele => {
      let linkTo = "/Hockey/" + ele._id;
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
            className="thread-img "
            src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/VDOJV13Oeijqkbkz5/ice-hockey-the-game-of-regional-amateur-teams_sa74_cpx__F0000.png"
          />
          <h2 className="thread-title background-color-hockey">Hockey games</h2>
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
          className="thread-img "
          src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/VDOJV13Oeijqkbkz5/ice-hockey-the-game-of-regional-amateur-teams_sa74_cpx__F0000.png"
        />
        <h2 className="thread-title background-color-hockey"> Hockey games</h2>
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
let Hockey = connect(mapStateToProps)(UnconnectedHockey);

export default Hockey;
