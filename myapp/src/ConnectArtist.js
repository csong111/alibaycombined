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

class ConnectArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //ARTIST LOGIN
      artistName: "",
      aPassword: "",
      loggedIn: false,
      incorrectData: false,

      //ARTIST SIGN UP
      sName: "",
      sEmail: "",
      sPassword: "",
      sPasswordConf: "",
      sDescription: "",
      sLocation: "",
      sProfPicURL: "",
      sImageURL1: "",
      sImageURL2: "",
      sImageURL3: "",
      accountExists: false
    };
  }

  uploadProfile = (x, stateName) => {
    let filename = x.name;
    let fileExtension = filename.split(".").pop();
    this.setState({ imageInputName: x.name });
    fetch("/uploadProfilePic?ext=" + fileExtension, {
      method: "POST",
      body: x
    })
      .then(response => response.text())
      .then(response => this.setState({ [stateName]: response }))
      .then(() => this.state.imageInput);
  };

  uploadFile = (x, stateName) => {
    let filename = x.name;
    let fileExtension = filename.split(".").pop();
    this.setState({ imageInputName: x.name });
    fetch("/uploadSubmission?ext=" + fileExtension, {
      method: "POST",
      body: x
    })
      .then(response => response.text())
      .then(response => this.setState({ [stateName]: filename }))
      .then(() => this.state.imageInput);
  };

  bringU = event => {
    this.props.history.push("/connectuser");
  };

  // handleLogin = (event) => {
  //     event.preventDefault();
  //     this.props.loginArtist("aisha") //change to artistName from backend
  //     this.setState({loggedIn: true});
  //     // Fetch login in
  //     this.props.history.push("/")
  // }

  handleLogin = event => {
    event.preventDefault();

    let bod = JSON.stringify({
      artistName: this.state.artistName,
      aPassword: this.state.aPassword
    });

    fetch("/artistLogin", { method: "POST", body: bod })
      .then(x => x.text())
      .then(x => JSON.parse(x))
      .then(x => {
        console.log(x);
        if (x.success) {
          console.log("this should be the name", x.RESB.artistName);
          this.props.loginArtist(x.RESB.artistName); //change to artistName from backend
          this.setState({ loggedIn: true });
          // Fetch login in
          this.props.history.push("/");
        } else {
          console.log("something went wrong");
        }
      });
  };

  handleSubmit = event => {
    event.preventDefault();

    let bod = JSON.stringify({
      sName: this.state.sName,
      sEmail: this.state.sEmail,
      sPassword: this.state.sPassword,
      sPasswordConf: this.state.sPasswordConf,
      sDescription: this.state.sDescription,
      sLocation: this.state.sLocation,
      sProfPicURL: this.state.sProfPicURL,
      sImageURL1: this.state.sImageURL1,
      sImageURL2: this.state.sImageURL2,
      sImageURL3: this.state.sImageURL3
    });

    fetch("/artistSignUp", { method: "POST", body: bod })
      .then(x => x.text())
      .then(x => JSON.parse(x))
      .then(x => {
        if (x.success) {
          this.props.history.push("/artistsignupcomplete");
        } else {
          this.setState({ accountExists: true });
          console.log("something went wrong");
        }
      });

    // Fetch add new Artist
  };

  back = event => {
    event.preventDefault();
    window.history.go(-2);
  };

  render() {
    return (
      <div>
        <button onClick={this.back}>X</button>
        <button onClick={this.bringU}>I'm a user</button>
        <button>I'm an artist</button>

        <div className="border">
          <h1>CONNECT ARTIST</h1>

          <hr />
          <form onSubmit={this.handleLogin}>
            {" "}
            LOG IN TO YOUR ARTIST ACCOUNT
            <input
              type="text"
              onChange={e => {
                this.setState({ artistName: e.target.value });
              }}
              value={this.state.artistName}
              placeholder="name@email.com"
              required
            />
            <input
              type="password"
              onChange={e => {
                this.setState({ aPassword: e.target.value });
              }}
              value={this.state.aPassword}
              placeholder="Password"
              required
            />
            {this.state.incorrectData ? (
              <div className="failedLogin">Woops - incorrect! Try again</div>
            ) : null}
            <input type="submit" />
          </form>
          <hr />
          <form onSubmit={this.handleSubmit}>
            {" "}
            FIRST TIME? CREATE AN ARTIST ACCOUNT
            <input
              type="text"
              onChange={e => {
                this.setState({ sName: e.target.value });
              }}
              value={this.state.sName}
              placeholder="Name"
              required
            />
            <input
              type="text"
              onChange={e => {
                this.setState({ sEmail: e.target.value });
              }}
              value={this.state.sEmail}
              placeholder="name@email.com"
              required
            />
            <input
              type="password"
              onChange={e => {
                this.setState({ sPassword: e.target.value });
              }}
              value={this.state.sPassword}
              placeholder="Password"
              required
            />
            <input
              type="password"
              onChange={e => {
                this.setState({ sPasswordConf: e.target.value });
              }}
              value={this.state.sPasswordConf}
              placeholder="Confirm Password"
              required
            />
            <input
              type="text"
              onChange={e => {
                this.setState({ sDescription: e.target.value });
              }}
              value={this.state.sDescription}
              placeholder="Artist Description"
              required
            />
            <input
              type="text"
              onChange={e => {
                this.setState({ sLocation: e.target.value });
              }}
              value={this.state.sLocation}
              placeholder="Montreal, QC"
              required
            />
            <br />
            Upload Profile Pic
            <input
              id="profilePic"
              style={{ display: "none" }}
              type="file"
              onChange={event =>
                this.uploadProfile(event.target.files[0], "sProfPicURL")
              }
              placeholder="Upload Profile Picture"
              required
            />
            {this.state.sProfPicURL !== "" ? (
              <img src={this.state.sProfPicURL} />
            ) : (
              <img
                onClick={() => {
                  document.getElementById("profilePic").click();
                }}
                src="/items/addimage.png"
                height="50px"
                width="50px"
              />
            )}
            {/* <p>{this.state.sProfPicURL}</p>
                    <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Proflile Picture" required/> */}
            <p>{this.state.sImageURL1}</p>
            <input
              type="file"
              onChange={event =>
                this.uploadFile(event.target.files[0], "sImageURL1")
              }
              placeholder="Upload Art"
            />
            <p>{this.state.sImageURL2}</p>
            <input
              type="file"
              onChange={event =>
                this.uploadFile(event.target.files[0], "sImageURL2")
              }
              placeholder="Upload Art"
            />
            <p>{this.state.sImageURL3}</p>
            <input
              type="file"
              onChange={event =>
                this.uploadFile(event.target.files[0], "sImageURL3")
              }
              placeholder="Upload Art"
            />
            {this.state.accountExists ? (
              <div className="failedAccount">
                This email is already in use, please try another
              </div>
            ) : null}
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
let ConnectComplete = withRouter(ConnectArtist);

export default ConnectComplete;
