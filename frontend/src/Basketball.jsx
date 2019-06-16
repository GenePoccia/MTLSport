import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ThreadModal from "./ThreadModal.jsx";
import FilterLocation from "./FilterLocation.jsx";
import "./main.css";
class UnconnectedBasketball extends Component {
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
        return ele.category === "basketball";
      })
      .reverse(); //takes the threads in the soccer category
    if (this.props.location !== undefined) {
      messages = messages.filter(ele => {
        return ele.location === this.props.location;
      });
    }
    let titles = messages.map(ele => {
      let linkTo = "/Basketball/" + ele._id;
      return (
        <div>
          <Link className="threadTitle" to={linkTo}>
            <div>
              <div>{ele.threadTitle} </div>
              <div className="titleofthread" style={{ display: "block" }}>
                Location: {ele.location}
              </div>
            </div>
          </Link>
        </div>
      );
    }); //returns the title

    if (titles.length === 0) {
      return (
        <div>
          <img
            className="thread-img"
            src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/GYx5MFB/basketball-amateur-game-boy-make-successful-throw-to-basket-net_n2skahnbe__F0000.png"
          />
          <h2 className="thread-title">Basketball games</h2>
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
          src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/GYx5MFB/basketball-amateur-game-boy-make-successful-throw-to-basket-net_n2skahnbe__F0000.png"
        />
        <h2 className="thread-title">Basketball games</h2>
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
let Basketball = connect(mapStateToProps)(UnconnectedBasketball);

export default Basketball;
