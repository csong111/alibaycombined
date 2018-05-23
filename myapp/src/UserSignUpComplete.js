import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import ItemDetail from "./ItemDetail.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css";

class UserSignUpComplete extends Component {
  constructor() {
    super();
    this.state = {
      counter: 5
    };
  }

  componentDidMount = () => {
    setInterval(() => this.setState({ counter: this.state.counter - 1 }), 1000);
  };

  redirect = event => {
    event.preventDefault();
    this.props.history.push("/");
  };

  timeUp = () => {
    if (this.state.counter === 0) {
    this.props.history.push("/");
    }
  };

  render() {
    return (
      <div class="outer">
        <div class="middle">
          <div class="inner">
            <Helmet
              bodyAttributes={{
                style: "background-color : #ffecdf",
                paddingTop: "0",
                padding: "0"
              }}
            />
            <div className="center">
              <h1>Thank you! You're now logged in.</h1>
              {this.timeUp()}
              <br />
              <h5>Redirecting back to home in:</h5>
              <div className="countDown">{this.state.counter}</div>
              <button className="button noPad connect" onClick={this.redirect}>
                BACK TO HOME
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
let UserComplete = withRouter(UserSignUpComplete);
export default UserComplete;
