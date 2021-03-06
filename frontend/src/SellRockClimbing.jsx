import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SellModal from "./SellModal.jsx";
class UnconnectedSellRockClimbing extends Component {
  render = () => {
    let messages = this.props.threads
      .filter(ele => {
        return ele.category === "sellRockClimbing";
      })
      .reverse();

    let titles = messages.map(ele => {
      let linkTo = "/SellRockClimbing/" + ele._id;

      return (
        <div className="threadTitle">
          <Link to={linkTo}>
            <div>
              <div>{ele.threadTitle} </div>
              <div className="titleofthread" style={{ display: "block" }}>
                Location: {ele.location}
              </div>
            </div>
          </Link>
        </div>
      );
    });

    if (titles.length === 0) {
      return (
        <div>
          <img
            className="thread-img"
            src="https://mec.imgix.net/medias/sys_master/images/images/h0b/hb5/9001026158622/18-CM-61-Diversity-Explore-Hero-5x2-Climbing.jpg?w=1100&h=441&auto=format&q=30&bg=FFF"
          />
          <h2 className="thread-title">Rock Climbing Equipment</h2>
          <div className="all-threads">
            <div className="button-move">
              {this.props.loggedIn && <SellModal />}
            </div>
            <div className="thread-title-display no-games-message">
              No one is selling rock climbing equipment.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <img
          className="thread-img"
          src="https://mec.imgix.net/medias/sys_master/images/images/h0b/hb5/9001026158622/18-CM-61-Diversity-Explore-Hero-5x2-Climbing.jpg?w=1100&h=441&auto=format&q=30&bg=FFF"
        />
        <h2 className="thread-title">Rock Climbing Equipment</h2>
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

let SellRockClimbing = connect(mapStateToProps)(UnconnectedSellRockClimbing);

export default SellRockClimbing;
