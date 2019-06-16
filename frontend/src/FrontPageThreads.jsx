import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedFrontPageThreads extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    if (this.props.threads.length === 0) return "loading";
    //let messages = this.props.threads.reverse();
    let messages = [];
    this.props.threads.forEach(ele => messages.unshift(ele));
    let threadTitles = [];

    let i = 0;
    while (threadTitles.length < 5 && i < messages.length) {
      //for (let i = 0; /*i < 5 &&*/ i < this.props.threads.length; i++) {
      if (
        messages[i].category === "basketball" ||
        messages[i].category === "hockey" ||
        messages[i].category === "rockclimbing" ||
        messages[i].category === "soccer" ||
        messages[i].category === "tennis" ||
        messages[i].category === "misc"
      ) {
        threadTitles.push(messages[i]);
      }

      let theTitle = messages[i].threadTitle.toString();

      if (theTitle.length > 25) {
        let newTitle = theTitle.slice(0, 25) + "...";
        messages[i].shortThreadTitle = newTitle;
      } else {
        messages[i].shortThreadTitle = messages[i].threadTitle;
      }
      i++;
      // }
    }
    //Category to upper case
    let categoryUpperCase = x => {
      if (x === "soccer") return "Soccer";
      if (x === "basketball") return "Basketball";
      if (x === "hockey") return "Hockey";
      if (x === "rockclimbing") return "Rock Climbing";
      if (x === "tennis") return "Tennis";
      if (x === "misc") return "Misc.";
    };

    let titles = threadTitles.map(ele => {
      let linkTo = "/" + ele.category + "/" + ele._id;

      return (
        <div className="singleFrontPageThread grow">
          <Link to={linkTo}>
            {ele.shortThreadTitle}
            <br /> <br />
            Sport: {categoryUpperCase(ele.category)}
            <br /> <br />
            Location: {ele.location}
          </Link>
        </div>
      );
    });

    return <div className="frontPageThreads">{titles}</div>;
  };
}

let mapStateToProps = state => {
  return {
    threads: state.threads,
    location: state.location,
    loggedIn: state.loggedIn
  };
};

let FrontPageThreads = connect(mapStateToProps)(UnconnectedFrontPageThreads);

export default FrontPageThreads;
