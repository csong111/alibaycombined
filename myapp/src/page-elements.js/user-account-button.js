import React, { Component } from "react";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "../App.css";

class UserAccountButton extends Component {
  bring = event => {
    event.preventDefault();
    this.props.history.push("/useraccount/" + this.props.userID);
  };
  render() {
    return (
      <div>
        <button className="noButton" onClick={this.bring}>
          {/* <img width="30px" src='../useracct.png' className="icon"/> */}
          <div className="connect">
          <span className="bold">MY ACCOUNT</span>
          </div>
        </button>
      </div>
    );
  }
}

let userAccountB = withRouter(UserAccountButton);
export default userAccountB;
