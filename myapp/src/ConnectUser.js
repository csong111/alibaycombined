import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
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
      incorrectData:false,

      //SIGN UP
      firstName: "",
      lastName: "",
      emailSignUp: "",
      passwordSignUp: "",
      passwordSignUpConf: "",
      accountExists: false
    };
  }

  handleLogin = event => {
    event.preventDefault();
    let bod = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });

    fetch("/userLogin", { method: "POST", body: bod })
    .then(x => x.text())
    .then(x =>  JSON.parse(x))
    // .then(x => console.log(x))
    .then( x => {
      if (x.success) {
   //     console.log(x)
        this.props.loginUser(x.RESB.email, x.RESB.id, x.RESB.firstName); //fetch userID from the backend and send to app.js
   //     console.log(this.props.loginUser)
        this.setState({ loggedIn: true });
        this.props.history.push("/");
      } else {
        this.setState({incorrectData:true})
      }
    })
  };

  handleSubmit = event => {
    event.preventDefault();

    let bod = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailSignUp: this.state.emailSignUp,
      passwordSignUp: this.state.passwordSignUp,
      passwordSignUpConf: this.state.passwordSignUpConf,
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
        this.setState({accountExists:true})
      }
    })
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
        <HomeButton/>
        {this.props.email ? <UserAccountButton userID={this.props.userID} /> : null}
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
          />{this.state.incorrectData ? <div className="failedLogin">Woops - incorrect! Try again</div> :null}
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
          />{this.state.accountExists ? <div className="failedAccount">This email is already in use, please try another</div> :null}
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
let ConnectUserComplete = withRouter(ConnectUser);
export default ConnectUserComplete;
