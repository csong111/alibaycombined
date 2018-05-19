import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import Item from "./page-elements.js/Item.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

class ArtistAccount extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      artistName: "",
      artistNameInput: "",
      bio: "",
      location: "",
      profPicURL: "",
      items: []
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    var body = { artistName: this.props.artistName };
    fetch("/getArtistProfile", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        let artistName = parsed.artistName;
        let bio = parsed.bio;
        let location = parsed.location;
        let profPicURL = parsed.profPicURL;
        this.setState({
          artistName: artistName,
          bio: bio,
          location: location,
          profPicURL: profPicURL
        });
      });

    fetch("/getArtistItems?artistName=" + this.props.artistName, {
      method: "GET"
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
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

  createListing = artistName => {
    this.props.history.push("/createListing/");
  };
  seeOrders = () => {
    this.props.history.push("/orders/" + this.state.artistName);
  };
  editInfo = () => {
    this.setState({ edit: true });
  };

  saveInfo = event => {
    //FETCH endpoint: updateArtistAccount then =>
    this.initData();
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

  render() {
    let itemsRendered = this.state.items.map((el, id) => {
      return (
        <div key={id}>
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
            <p>Name: {this.state.artistName}</p>
            <p>Location: {this.state.location}</p>
            <p>{this.state.bio}</p>
            <button onClick={this.editInfo}>Edit Info</button>
          </div>
        );
      } else {
        return (
          <form>
            <input
              type="text"
              value={this.state.artistName}
              onChange={this.handleArtistNameChange}
            />
            <br />
            <input
              type="text"
              value={this.state.location}
              onChange={this.handleLocationChange}
            />
            <br />
            <textarea value={this.state.bio} onChange={this.handleBioChange} />
            <br />
            <button onClick={this.saveInfo}>Save Info</button>
          </form>
        );
      }
    })();

    return (
      <div className="ArtistProf">
        <NavButton />
        <HomeButton />

        {this.props.artistName === "" ? null : (
          <ArtistAccountButton artistName={this.props.artistName} />
        )}

        <h2>MY ACCOUNT</h2>

        <input
          id="changeProfile"
          style={{ display: "none" }}
          type="file"
          onChange={event =>
            this.uploadFile(event.target.files[0], "profPicURL")
          }
          placeholder="Upload Profile Pic Image"
        />
        {this.state.profPicURL !== "" ? (
          <img src={this.state.profPicURL} />
        ) : (
          <img
            onClick={() => {
              document.getElementById("changeProfile").click();
            }}
            src="/items/addimage.png"
            height="50px"
            width="50px"
          />
        )}

        <div>{accountInfo}</div>

        <h2>ORDERS</h2>
        <button onClick={this.seeOrders}>See Orders</button>

        <h2>MY ITEMS</h2>
        <div name="items">{itemsRendered}</div>
        <button onClick={this.createListing}>Create Listing</button>
      </div>
    );
  }
}

let Content = withRouter(ArtistAccount);
export default Content;
