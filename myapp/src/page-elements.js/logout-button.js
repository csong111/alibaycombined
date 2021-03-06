import React, { Component } from "react";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "../App.css";

class LogOutButton extends Component {
  logout = () => {
    window.location.reload(true);
  };
  render() {
    return (
      <div>
        <button className="noButton" onClick={this.logout}>
          <div className="connect">
          <span className="accountMobile bold">LOG OUT</span>
          </div>
        </button>
      </div>
    );
  }
}

export default LogOutButton;