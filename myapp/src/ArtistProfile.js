import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import ItemDetail from "./ItemDetail.js";
import Item from "./page-elements.js/Item.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

class ArtistProfile extends Component {
  constructor() {
    super();
    this.state = {
      artistName: "",
      bio: "",
      location: "",
      profPicURL: "",
      items: []
    };
  }
  componentDidMount() {
    var body = {
      artistName: this.props.artistName
    };
    // console.log("getArtistProfile-1",body)
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
        //console.log(parsed)
        this.setState({ items: parsed });
      });
  }

  render() {
    let accountInfo = () => {
      return (
        <div>
          <p>Name: {this.state.artistName}</p>
          <p>Location: {this.state.location}</p>
          <p>{this.state.bio}</p>
        </div>
      );
    };
    let itemsRendered = this.state.items.map(el => {
      return (
        <Item
          itemID={el._id}
          name={el.name}
          price={el.price}
          artistName={el.artistName}
          img1={el.img1}
        />
      );
    });
    return (
      <div className="ArtistProf">
        <NavButton />
        <HomeButton />
        {this.props.email !== "" ? (
          <UserAccountButton userID={this.props.userID} />
        ) : null}
        {this.props.email !== "" ? <ConnectButton /> : null}
        {this.props.email !== "" ? (
          <CartButton userID={this.props.userID} />
        ) : null}
        <img src={this.state.profPicURL} />
        <div>{this.state.artistName}</div>
        <div>{this.state.location}</div>
        <div>{this.state.bio}</div>
        <div>Other items by this artist:</div>
        {itemsRendered}
      </div>
    );
  }
}

export default ArtistProfile;
