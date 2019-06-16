import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Link } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import MainForum from "./MainForum.jsx";
import Myaccount from "./Myaccount.jsx";
import UserDetails from "./UserDetails.jsx";
import Basketball from "./Basketball.jsx";
import Hockey from "./Hockey.jsx";
import Soccer from "./Soccer.jsx";
import RockClimbing from "./RockClimbing.jsx";
import Tennis from "./Tennis.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Thread from "./Thread.jsx";
import Misc from "./Misc.jsx";
import ThreadModal from "./ThreadModal.jsx";
import SellForum from "./SellForum.jsx";
import SellBasketball from "./SellBasketball.jsx";
import SellHockey from "./SellHockey.jsx";
import SellRockClimbing from "./SellRockClimbing.jsx";
import SellSoccer from "./SellSoccer.jsx";
import SellTennis from "./SellTennis.jsx";
import SellMisc from "./SellMisc.jsx";
import SellModal from "./SellModal.jsx";
import FrontPageThreads from "./FrontPageThreads.jsx";
import FrontPageItems from "./FrontPageItems.jsx";

class UnconnectedApp extends Component {
  componentDidMount = () => {
    fetch("http://localhost:4000/thread")
      .then(x => {
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        this.props.dispatch({
          type: "get-threads",
          threads: body.results
        });
      });
    fetch("http://localhost:4000/check-login", { credentials: "include" })
      .then(x => x.text())
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (body.success) {
          this.props.dispatch({
            type: "login-success",
            username: body.results.username,
            firstName: body.results.firstName,
            lastName: body.results.lastName,
            age: body.results.age
          });
          this.props.history.push("/");
        }
      });
  };
  renderRoot = () => {
    return (
      <div>
        <div className="description center-flex">
          <img className="imageResize" src="/montreal-flag.png" />
          <div className="title">
            MTLSport is a site dedicated to finding friendly local sports games
          </div>
          <img className="imageResize" src="/montreal-flag.png" />
        </div>
        <div>
          <div className="findSportBar">
            <MainForum />
            <SellForum />
          </div>

          <div>
            <div>
              <div>
                <h2 className="proxima-nova-font bigger-font ">
                  Most Recent Games
                </h2>
                <div>
                  <FrontPageThreads />
                </div>
              </div>
            </div>

            <div>
              <h2 className="proxima-nova-font bigger-font ">
                Most Recent Items For Sale
              </h2>
              <div>
                <FrontPageItems />
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    );
  };

  renderAccount = () => {
    return (
      <div>
        <Myaccount />
      </div>
    );
  };

  renderUserDetails = () => {
    return (
      <div>
        <UserDetails />
      </div>
    );
  };

  both = () => {
    return (
      <div>
        <div className="signup">
          <Signup />
        </div>
        <div className="signup">
          <Login />
        </div>
      </div>
    );
  };
  renderSport = routerData => {
    if (routerData.match.params.sport === "Basketball")
      return (
        <div>
          <Basketball />
        </div>
      );
    if (routerData.match.params.sport === "Hockey")
      return (
        <div>
          <Hockey />
        </div>
      );
    if (routerData.match.params.sport === "RockClimbing")
      return (
        <div>
          <RockClimbing />
        </div>
      );
    if (routerData.match.params.sport === "Soccer")
      return (
        <div>
          <Soccer />
        </div>
      );
    if (routerData.match.params.sport === "Tennis")
      return (
        <div>
          <Tennis />
        </div>
      );
    if (routerData.match.params.sport === "Misc")
      return (
        <div>
          <Misc />
        </div>
      );
    if (routerData.match.params.sport === "SellBasketball")
      return (
        <div>
          <SellBasketball />
        </div>
      );

    if (routerData.match.params.sport === "SellHockey")
      return (
        <div>
          <SellHockey />{" "}
        </div>
      );
    if (routerData.match.params.sport === "SellRockClimbing")
      return (
        <div>
          <SellRockClimbing />
        </div>
      );
    if (routerData.match.params.sport === "SellSoccer")
      return (
        <div>
          <SellSoccer />
        </div>
      );
    if (routerData.match.params.sport === "SellTennis")
      return (
        <div>
          <SellTennis />
        </div>
      );
    if (routerData.match.params.sport === "SellMisc")
      return (
        <div>
          <SellMisc />
        </div>
      );
  };

  renderThread = routerData => {
    let path = routerData.match.params.id;

    return <Thread path={path} />;
  };

  showSubmission = () => {
    this.props.dispatch({
      type: "show-form",
      showAddThread: !this.props.showAddThread
    });
  };
  showAddItem = () => {
    this.props.dispatch({
      type: "show-sell",
      showSellItem: !this.props.showSellItem
    });
  };
  render = () => {
    return (
      <div>
        <div>
          <TopBar />
          <Route exact={true} path="/both" render={this.both} />
        </div>
        <div>
          <Route exact={true} path="/" render={this.renderRoot} />
          <Route exact={true} path="/myAccount" render={this.renderAccount} />
          <Route
            exact={true}
            path="/UserDetails"
            render={this.renderUserDetails}
          />
          <Route exact={true} path="/:sport" render={this.renderSport} />
          <Route exact={true} path="/:sport/:id" render={this.renderThread} />
          {/*<Route exact={true} path="/:sell" render={this.renderSell} />*/}
          {/*<Route
            exact={true}
            path="/:sell/:sellId"
            render={this.renderSellThread}
          />*/}
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    threads: state.threads,
    showAddThread: state.showAddThread,
    loggedIn: state.loggedIn,
    showSellItem: state.showSellItem
  };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default withRouter(App);
