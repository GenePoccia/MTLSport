import React, { Component } from "react";
import { connect } from "react-redux";
import Replies from "./Replies.jsx";
import DetailsUser from "./DetailsUser.jsx";
import { withRouter } from "react-router-dom";
import "./main.css";
class UnconnectedThread extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }
  showReplySubmission = () => {
    this.props.dispatch({
      type: "show-form2",
      showAddReply: !this.props.showAddReply
    });
  };
  flipToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  deleteMessage = () => {
    let data = new FormData();
    data.append("threadId", this.props.path);
    fetch("http://localhost:4000/delete-message", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(response => response.text())
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        if (body.success) {
          alert("Last message deleted");
        } else {
          alert("You don't have any message to delete.");
        }
        fetch("http://localhost:4000/thread")
          .then(x => x.text())
          .then(responseBody => {
            let body = JSON.parse(responseBody);
            this.props.dispatch({
              type: "get-threads",
              threads: body.results
            });
          });
      });
  };

  render = () => {
    if (this.props.threads.length === 0) {
      return "loading...";
    }
    let path = this.props.path;
    let threads = this.props.threads.filter(ele => {
      return ele._id === path;
    });
    let replies2 = threads[0].replies.map(ele => {
      return (
        <div className="replies">
          {<DetailsUser username={ele.user} />}{" "}
          <p className="message">{ele.msg}</p>
        </div>
      );
    });
    let s = {
      height: "100px",
      width: "100px",
      padding: "2%"
    };
    if (this.state.toggle) {
      s = {
        height: "300px",
        width: "300px",
        zIndex: "1"
      };
    }

    return (
      <div className="style-replies">
        <h2 className="thread-title-display">
          {threads[0].threadTitle.toUpperCase()}
        </h2>
        <div>
          <div className="thread">
            <div className="thread-user">
              {<DetailsUser username={threads[0].user} />}
            </div>
            <p className="message">{threads[0].msg}</p>
            {threads[0].image && (
              <img src={threads[0].image} style={s} onClick={this.flipToggle} />
            )}
            {/* test */}
            {/* <div>
              {threads[0].msg} <br />
              <div>
                {threads[0].image && (
                  <img
                    className="seller-item-image"
                    src={threads[0].image}
                    style={s}
                    onClick={this.flipToggle}
                  />
                )}
              </div>
            </div> */}
            {/* test */}
          </div>
        </div>
        {replies2}
        <div className="delete">
          {this.props.loggedIn && (
            <button onClick={this.deleteMessage}>Delete latest message</button>
          )}
        </div>
        <div>{this.props.loggedIn && <Replies thread={threads[0]} />}</div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    threads: state.threads,
    loggedIn: state.loggedIn,
    showAddReply: state.showAddReply
  };
};

let Thread = connect(mapStateToProps)(UnconnectedThread);

export default withRouter(Thread);
