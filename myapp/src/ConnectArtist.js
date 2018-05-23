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
      .then(response => this.setState({ [stateName]: response }))
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
      //  console.log(x);
        if (x.success) {
          //       console.log("this should be the name", x.RESB.artistName);
          this.props.loginArtist(x.RESB.artistID); //change to artistName from backend
          this.setState({ loggedIn: true });
          // Fetch login in
          this.props.history.push("/");
        } else {
          this.setState({ incorrectData: true });
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
        }
      });
  };

  back = event => {
    event.preventDefault();
    window.history.go(-2);
  };

  render() {
    return (
      <div>
        <button className="closeButton noPad noButton" onClick={this.back}>
          <img src="/ui-elements/close.png" width="20px" />
        </button>
        <button className="userButton buttonText bold" onClick={this.bringU}>
          I'M A USER
        </button>
        <button className="artistButtonClick buttonText bold">
          I'M AN ARTIST
        </button>

        <div className="form">
          <form onSubmit={this.handleLogin}>
            {" "}
            <h3>Log in to your artist account</h3>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ artistName: e.target.value });
                  }}
                  value={this.state.artistName}
                  placeholder="Artist Name"
                  required
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
                <input
                  className="formInput"
                  type="password"
                  onChange={e => {
                    this.setState({ aPassword: e.target.value });
                  }}
                  value={this.state.aPassword}
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

          <hr className="connectHR" />

          <form onSubmit={this.handleSubmit}>
            {" "}
            <h3>First time? Sign up to become an artist</h3>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ sName: e.target.value });
                  }}
                  value={this.state.sName}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ sEmail: e.target.value });
                  }}
                  value={this.state.sEmail}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ sLocation: e.target.value });
                  }}
                  value={this.state.sLocation}
                  placeholder="Location"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad formSpace">
                <textarea
                  className="textAreaInput"
                  rows="4"
                  cols="50"
                  // className="formInput"
                  // type="text"
                  onChange={e => {
                    this.setState({ sDescription: e.target.value });
                  }}
                  value={this.state.sDescription}
                  placeholder="Artist Description"
                  required
                />
              </div>
              {this.state.accountExists ? (
                <div className="fail">
                  This email is already in use, please try another
                </div>
              ) : null}
            </div>
            {/* DO WE NEED PASSWORDS? ////////////////////// */}
            {/* <input
              className="formInput"
              type="password"
              onChange={e => {
                this.setState({ sPassword: e.target.value });
              }}
              value={this.state.sPassword}
              placeholder="Password"
              required
            />
            <input
              className="formInput"
              type="password"
              onChange={e => {
                this.setState({ sPasswordConf: e.target.value });
              }}
              value={this.state.sPasswordConf}
              placeholder="Confirm Password"
              required
            /> */}
            <div>

            {/* <br /> */}
            <div className ="space" />
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
              {/* {this.state.sProfPicURL !== "" ? ( */}
                <div className="inputText">Upload Profile Pic</div>
                <div><img width="100px " src={this.state.sProfPicURL} /></div>
                {/* <br /> */}
              {/* // ) : ( */}
                <button className="button noPad connect"
                  onClick={() => {
                    document.getElementById("profilePic").click();
                  }}
                  // src="/ui-elements/profpic.png"
                  // height="50px"
                  // width="50px"
                >
                CHOOSE FILE
                </button>
              {/* )} */}
              <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                this.setState({sProfPicURL: ""})
              }}
            >
              REMOVE
            </button>
            </div>
            {/* <p>{this.state.sProfPicURL}</p>
                    <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Proflile Picture" required/> */}
            <div className="space" />
            <div className="inputText">Please upload 3 art submissions:</div>
            <input
              // className="inputText"
              id="sImageURL1"
              style={{ display: "none" }}
              type="file"
              onChange={event =>
                this.uploadFile(event.target.files[0], "sImageURL1")
              }
              placeholder="Upload Art"
            />
            <img width="100px" src={this.state.sImageURL1} />
            <br />
            <button
              className="button noPad connect"
              onClick={() => {
                document.getElementById("sImageURL1").click();
              }}
              // src="/items/addimage.png"
              // height="50px"
              // width="50px"
            >
              SUBMISSION 1
            </button>
            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                this.setState({sImageURL1: ""})
              }}
            >
              REMOVE
            </button>
            <br />
            <input
              id="sImageURL2"
              style={{ display: "none" }}
              type="file"
              onChange={event =>
                this.uploadFile(event.target.files[0], "sImageURL2")
              }
              placeholder="Upload Art"
            />
            <img width="100px" src={this.state.sImageURL2} />
            <br />
            <button
              className="button noPad connect"
              onClick={() => {
                document.getElementById("sImageURL2").click();
              }}
              // src="/items/addimage.png"
              // height="50px"
              // width="50px"
            >
              SUBMISSION 2
            </button>
            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                this.setState({sImageURL2: ""})
              }}
            >
              REMOVE
            </button>
            <br />
            <input
              id="sImageURL3"
              style={{ display: "none" }}
              type="file"
              onChange={event =>
                this.uploadFile(event.target.files[0], "sImageURL3")
              }
              placeholder="Upload Art"
            />
            <img width="100px" src={this.state.sImageURL3} />
            <br />
            <button
              className="button noPad connect"
              onClick={() => {
                document.getElementById("sImageURL3").click();
              }}
              // src="/items/addimage.png"
              // height="50px"
              // width="50px"
            >
              SUBMISSION 3
            </button>
            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                this.setState({sImageURL3: ""})
              }}
            >
              REMOVE
            </button>
            <div className="space" />
            <input className="submitButton" value="" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
let ConnectComplete = withRouter(ConnectArtist);

export default ConnectComplete;
