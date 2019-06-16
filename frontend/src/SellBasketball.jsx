import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SellModal from "./SellModal.jsx";
class UnconnectedSellBasketball extends Component {
  render = () => {
    let messages = this.props.threads
      .filter(ele => {
        return ele.category === "sellBasketball";
      })
      .reverse();

    let titles = messages.map(ele => {
      let linkTo = "/SellBasketball/" + ele._id;
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
    });

    if (titles.length === 0) {
      return (
        <div>
          <img
            className="thread-img"
            src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/GYx5MFB/basketball-amateur-game-boy-make-successful-throw-to-basket-net_n2skahnbe__F0000.png"
          />
          <h2 className="thread-title">Basketball Equipment</h2>
          <div className="all-threads">
            <div className="button-move">
              {this.props.loggedIn && <SellModal />}
            </div>
            <div className="thread-title-display no-games-message">
              No one is selling Basketball equipment.
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
        <h2 className="thread-title">Basketball Equipment</h2>
        <div className="all-threads">
          <div className="button-move">
            {this.props.loggedIn && <SellModal />}
          </div>
          <div>{titles}</div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { threads: state.threads, loggedIn: state.loggedIn };
};

let SellBasketball = connect(mapStateToProps)(UnconnectedSellBasketball);

export default SellBasketball;
