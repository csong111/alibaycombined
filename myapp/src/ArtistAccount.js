import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import Item from "./page-elements.js/Item.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

class ArtistAccount extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      artistID: "",
      artistName: "",
      artistNameInput: "",
      bio: "",
      location: "",
      profPicURL: "",
      items: [],
      showIGButton: true,
      loaded : false,
    };
  }

  componentDidMount() {
    window.localStorage.setItem("artistID", this.props.artistID);
    if (!this.props.isLoggedIn) this.props.history.push("/");
    this.initData();
    fetch("/checkArtistToken", {
      method: "POST",
      body: JSON.stringify({ artistID: this.props.artistID })
    })
      .then(res => res.text())
      .then(resB => {
        this.setState({loaded : true})
        let parsed = JSON.parse(resB);
     //   console.log("A--4", parsed);
        if (parsed.success !== false || parsed.success === undefined) {
          parsed = {
            success: parsed.success,
            ...JSON.parse(parsed.RESB)
          };
          this.setState({ showIGButton: false });
          let IGData = parsed.data;
          let imgInfo = IGData.map(item => {
            return item.images;
          });
          let imgItems = imgInfo.map(item => {
            return item.thumbnail;
          });
          let imgURLs = imgItems.map(item => {
            return item.url;
          });
          let imgLinks = IGData.map(item => {
            return item.link;
          });
          this.setState({ imgURLs: imgURLs, imgLinks: imgLinks });
        }
      });
  }

  initData = () => {

    var body = { artistID: this.props.artistID };
    fetch("/getArtistAccount", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        //console.log(parsed)
        let artistID = parsed._id;
        let artistName = parsed.artistName;
        let bio = parsed.bio;
        let location = parsed.location;
        let profPicURL = parsed.profPicURL;
        this.setState({
          artistID: artistID,
          artistName: artistName,
          bio: bio,
          location: location,
          profPicURL: profPicURL
        });
      });
    fetch("/getArtistAccountItems/?artistID=" + this.props.artistID, {
      method: "GET"
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        // console.log("parsed",parsed)
        this.setState({ items: parsed });
      });
  };

  uploadFile = (x, stateName) => {
    let filename = x.name;
    let fileExtension = filename.split(".").pop();
    this.setState({ imageInputName: x.name });
    fetch("/uploadPicProfile?ext=" + fileExtension, {
      method: "POST",
      body: x
    })
      .then(response => response.text())
      .then(response => this.setState({ [stateName]: response }))
      .then(() => this.state.imageInput);
  };

  createListing = () => {
    this.props.history.push("/createListing/" + this.props.artistID, {
      name: this.state.artistName
    });
  };
  seeOrders = () => {
    this.props.history.push("/orders/" + this.props.artistID);
  };
  editInfo = () => {
    this.setState({ edit: true });
  };

  saveInfo = event => {
    event.preventDefault();
    let bod = this.state;
    fetch("/editArtistAccount", { method: "POST", body: JSON.stringify(bod) })
      .then(e => e.text())
      .then(e => JSON.parse(e))
      // .then(e => {
      //   if (e.success)
      //     this.props.history.push("/artistaccount/" + this.state.artistID);
      // });
      .then(e => {
        this.setState({ edit: false });
      });
  };

  handleArtistNameChange = event => {
    this.setState({ artistName: event.target.value });
  };

  handleLocationChange = event => {
    this.setState({ location: event.target.value });
  };

  handleBioChange = event => {
    this.setState({ bio: event.target.value });
  };

  connectIG = (event, artistID) => {
    event.preventDefault();
    //console.log("THIS IS THE ONE", this.state)
    window.location.href =
      "https://api.instagram.com/oauth/authorize/?client_id=e3d55b1b8fe34ae9aae892e410c9f3b6&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fig-callback%2Ffoobar%2F&response_type=token";
    //fetch()
  };

  renderIGPhotos = () => {
    //console.log(this.state.imgURLs);
    if (!this.state.imgURLs) return null;
    return this.state.imgURLs.map((imgURL, id) => {
      return (<div className="col-6 col-lg-2 col-md-3 col-sm-4 col-xs-6 noPad space">
        <img
          src={imgURL}
          onClick={() => {
            this.openInNewTab(
              this.state.imgLinks[id],
              window.innerWidth / 2,
              window.innerHeight / 1.5
            );
          }}
        />
        </div>
      );
    });
  };
  openInNewTab = (url, w, h) => {
    var left = (window.screen.width - w) / 2;
    var top = (window.screen.height - h) / 4;
    var win = window.open(
      url,
      "_blank",
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
        w +
        ", height=" +
        h +
        ", top=" +
        top +
        ", left=" +
        left
    );

    win.focus();
  };

  render() {
    let itemsRendered = this.state.items.map((el, id) => {
      return (
        <div className="col-6 col-md-4 col-lg-3 noPad space" key={id}>
          <Item
            itemID={el._id}
            name={el.name}
            price={el.price}
            artistName={el.artistName}
            img1={el.img1}
          />
        </div>
      );
    });

    let accountInfo = (() => {
      if (this.state.edit === false) {
        return (
          <div>
            <h4>Name: <span className="bold">{this.state.artistName}</span></h4>
            <h4>Location: <span className="bold">{this.state.location}</span></h4>
            <h4 className="restrictWidth">{this.state.bio}</h4>

            {this.state.loaded ?
              this.state.showIGButton ? (
              <button className="button noPad connect" onClick={this.connectIG}>CONNECT WITH INSTAGRAM</button>
            ) : (
              <h4 className="bold">Instagram connected!</h4>
            ): null}

          </div>
        );
      } else {
        return (
          <form className="restrictWidth">
            <input className="formInput"
              type="text"
              value={this.state.artistName}
              onChange={this.handleArtistNameChange}
            />
            <br />
            <input className="formInput"
              type="text"
              value={this.state.location}
              onChange={this.handleLocationChange}
            />
            <div className="spaceSmaller" />
            <textarea className="textAreaInput" value={this.state.bio} onChange={this.handleBioChange} />
            <br />
            <button className="button noPad connect" onClick={this.saveInfo}>SAVE</button>
          </form>
        );
      }
    })();
    if (this.state.loaded ===true){
    return (
      <div className="ArtistProf">
        {/* NAV !!!!!!!!!!!!!!!!!!*/}
        <div className="headerElements sticky">
          <NavButton />

          <div className="logo">
            <HomeButton />
          </div>

          <div className="search">
            <SearchBar />
          </div>

          <div className="flex moveOver">
            {this.props.artistID ? (
              <ArtistAccountButton artistID={this.props.artistID} />
            ) : null}
            <span className="hideLogin">{this.props.artistID ? <LogOutButton /> : null}</span>
            {!this.props.artistID ? <ConnectButton /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}

        <h2 className="artistAccountContainer">MY ACCOUNT</h2>

        <div className="artistAccount space">
          <input
            id="changeProfile"
            style={{ display: "none" }}
            type="file"
            onChange={event =>
              this.uploadFile(event.target.files[0], "profPicURL")
            }
            placeholder="Upload Profile Pic Image"
          />
          <div className="artistFlex">
            
            <div className="center">
              <img className="profileImage" src={this.state.profPicURL} />
              <br />
              <button
                className="button noPad connect"
                onClick={() => {
                  document.getElementById("changeProfile").click();
                }}
              >
                EDIT PROFILE PICTURE
              </button>
              {/* <img
          onClick={() => {
            document.getElementById("changeProfile").click();
          }}
          src="/ui-elements/profpic.png"
          height="50px"
          width="50px"
        /> */}
            </div>
            <span className="spaceLeft accountInfo">
              {accountInfo}
              {!this.state.edit ? <button className="button noPad connect" onClick={this.editInfo}>
              EDIT INFO
            </button> : null}
              <button
                className="button noPad connect"
                onClick={this.createListing}
              >
                CREATE LISTING
              </button>
              <button className="button noPad connect" onClick={this.seeOrders}>
                SEE ORDERS
              </button>

            </span>
          </div>
        </div>

        {/* <h2>CREATE LISTING</h2>
        <button onClick={this.createListing}>Create Listing</button>
        <div className="space" />
        <h2>ORDERS</h2>
        <button onClick={this.seeOrders}>See Orders</button> */}
        <div className="space" />
        <h2>MY ITEMS</h2>
        <div className="row" name="items">
          {itemsRendered}
        </div>
       
        <div className="space" />
        {!this.state.showIGButton ? 
           <div>
            <h2>YOUR INSTAGRAM FEED</h2>
            <div className="row">
            {this.renderIGPhotos()}
            </div>
          </div>
        : null}

        
        {/* <div>Your IG Feed{this.renderIGPhotos()}</div> */}
      </div>
    );
  } else{
    return (<div></div>)
  }
}
}
let Content = withRouter(ArtistAccount);
export default Content;