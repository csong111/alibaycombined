import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

class ConnectUser extends Component {
  constructor() {
    super();
    this.state = {
      //LOGIN
      email: "jen@email.com",
      password: "123456",
      loggedIn: false,

      //SIGN UP
      firstName: "jen",
      lastName: "o",
      emailSignUp: "jen@email.com",
      passwordSignUp: "123456",
      passwordSignUpConf: "123456"
    };
  }
  handleLogin = event => {
    event.preventDefault();
    // Fetch login, if success ...
        this.props.loginUser("jen@email.com"); //fetch userID from the backend and send to app.js
    this.setState({ loggedIn: true });
    this.props.history.push("/");
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push("/usersignupcomplete");
    this.props.loginUser("jen@email.com");
    // Fetch Create new User
    this.setState({ email: this.state.emailSignUp }); //fetch userID from the backend and send to app.js
  };

  bringA = event => {
    event.preventDefault();
    this.props.history.push("/connectartist");
  };
  back = event => {
    event.preventDefault();
    window.history.back();
  };
  render() {
    return (
      <div>
        <button onClick={this.back}>X</button>
        <button>I'm a user</button>
        <button onClick={this.bringA}>I'm an artist</button>
        <h1>CONNECT USER</h1>
        <NavButton />
        {this.props.email ? <UserAccountButton /> : null}
        <hr />
        <form onSubmit={this.handleLogin}>
          {" "}
          LOG IN TO YOUR ACCOUNT
          <input
            type="text"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
            value={this.state.email}
            placeholder="name@email.com"
            required
          />
          <input
            type="password"
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
            value={this.state.password}
            placeholder="Password"
            required
          />
          <input type="submit" />
        </form>
        <hr />
        <form onSubmit={this.handleSubmit}>
          {" "}
          FIRST TIME? CREATE AN ACCOUNT
          <input
            type="text"
            onChange={e => {
              this.setState({ firstName: e.target.value });
            }}
            value={this.state.firstName}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            onChange={e => {
              this.setState({ lastName: e.target.value });
            }}
            value={this.state.lastName}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            onChange={e => {
              this.setState({ emailSignUp: e.target.value });
            }}
            value={this.state.emailSignUp}
            placeholder="name@email.com"
            required
          />
          <input
            type="password"
            onChange={e => {
              this.setState({ passwordSignUp: e.target.value });
            }}
            value={this.state.passwordSignUp}
            placeholder="Password"
            required
          />
          <input
            type="password"
            onChange={e => {
              this.setState({ passwordSignUpConf: e.target.value });
            }}
            value={this.state.passwordSignUpConf}
            placeholder="Confirm Password"
            required
          />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
let ConnectUserComplete = withRouter(ConnectUser);
export default ConnectUserComplete;
