import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
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
      email: "",
      password: "",
      loggedIn: false,
      incorrectData: false,

      //SIGN UP
      firstName: "",
      lastName: "",
      emailSignUp: "",
      passwordSignUp: "",
      passwordSignUpConf: "",
      accountExists: false,
    };
  }

  handleLogin = event => {
    event.preventDefault();
    let bod = JSON.stringify({
      email: this.state.email,
      password: this.state.password
    });

    fetch("/userLogin", { method: "POST", body: bod })
      .then(x => x.text())
      .then(x => JSON.parse(x))
      // .then(x => console.log(x))
      .then(x => {
        if (x.success) {
          //     console.log(x)
          this.props.loginUser(x.RESB.email, x.RESB.id, x.RESB.firstName); //fetch userID from the backend and send to app.js
          //     console.log(this.props.loginUser)
          this.setState({ loggedIn: true });
          this.props.history.push("/");
        } else {
          this.setState({ incorrectData: true });
        }
      });
  };

  handleSubmit = event => {
    event.preventDefault();

    let bod = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailSignUp: this.state.emailSignUp,
      passwordSignUp: this.state.passwordSignUp,
      passwordSignUpConf: this.state.passwordSignUpConf
    });

    fetch("/userSignUp", { method: "POST", body: bod })
      .then(x => x.text())
      .then(x => JSON.parse(x))
      // .then(x => console.log(x))
      .then(x => {
        if (x.success) {
          this.props.history.push("/usersignupcomplete");
          this.props.loginUser(x.email, x.id, x.firstName);
          // Fetch Create new User
          //this.setState({ email: this.state.emailSignUp }); //fetch userID from the backend and send to app.js
          this.setState({ loggedIn: true });
        } else {
          this.setState({ accountExists: true });
        }
      });
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
        <button className="closeButton noPad noButton" onClick={this.back}>
          <img src="/ui-elements/close.png" width="20px" />
        </button>
        <button className="userButtonClick buttonText bold">I'M A USER</button>
        <button className="artistButton buttonText bold" onClick={this.bringA}>
          I'M AN ARTIST
        </button>

        <div className="form">
          <form onSubmit={this.handleLogin}>
            {" "}
            <h3>Log in to your account</h3>

            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
                <input className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                  value={this.state.email}
                  placeholder="Email"
                  required
                />
              </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
              <input className="formInput"
                type="password"
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
                value={this.state.password}
                placeholder="Password"
                required
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
              <input className="submitButton" value="" type="submit" />
            </div>
            {this.state.incorrectData ? (
                <div className="fail">Woops - incorrect! Try again</div>
              ) : null}
            </div>
          </form>
          <hr className="connectHR"/>
          <form onSubmit={this.handleSubmit}>
            {" "}
            <h3>First time? Create an account</h3>

          <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
            <input className="formInput"
              type="text"
              onChange={e => {
                this.setState({ firstName: e.target.value });
              }}
              value={this.state.firstName}
              placeholder="First Name"
              required
            />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
            <input className="formInput"
              type="text"
              onChange={e => {
                this.setState({ lastName: e.target.value });
              }}
              value={this.state.lastName}
              placeholder="Last Name"
              required
            />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
            <input className="formInput"
              type="text"
              onChange={e => {
                this.setState({ emailSignUp: e.target.value });
              }}
              value={this.state.emailSignUp}
              placeholder="Email"
              required
            />
            </div>
          </div>

          <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
            <input className="formInput"
              type="password"
              onChange={e => {
                this.setState({ passwordSignUp: e.target.value });
              }}
              value={this.state.passwordSignUp}
              placeholder="Password"
              required
            />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
            <input className="formInput"
              type="password"
              onChange={e => {
                this.setState({ passwordSignUpConf: e.target.value });
              }}
              value={this.state.passwordSignUpConf}
              placeholder="Confirm Password"
              required
            />
            
          
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
            <input className="submitButton" value="" type="submit" />

           </div>
           {this.state.accountExists ? (
              <div className="fail">
                This email is already in use, please try another
              </div>
            ) : null}
           </div>



          </form>
        </div>
      </div>
    );
  }
}
let ConnectUserComplete = withRouter(ConnectUser);
export default ConnectUserComplete;
