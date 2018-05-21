import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
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
    //console.log(this.props.userID)
    var body = {
      artistName: this.props.artistName
    };
    //console.log("getArtistProfile-1",body)
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
          <h4>Name: {this.state.artistName}</h4>
          <h4>Location: {this.state.location}</h4>
          <h4>{this.state.bio}</h4>
        </div>
      );
    };
    console.log(this.state.items)
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
    return (
      <div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}
        <div className="headerElements sticky">
          <NavButton />

          <div className="logo">
            <HomeButton />
          </div>

          <div className="search">
            <SearchBar />
          </div>

          <div className="flex">
            {this.props.email  ? <UserAccountButton userID={this.props.userID} /> : null}
            {this.props.artistID ? <ArtistAccountButton artistID={this.props.artistID} />: null}
            {this.props.email || this.props.artistID ? <LogOutButton />: null}
            {!this.props.email && !this.props.artistID ? <ConnectButton /> : null}
            {this.props.email ? <CartButton userID={this.props.userID} counter={this.props.counter} /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}

        <div className="artistProfile space">
          <img className="profileImage" src={this.state.profPicURL} />
          <span className="spaceLeft accountInfo">{accountInfo()}</span>
        </div>
        <div className="space" />
        <div className="space" />
        <h4>Other items by this artist:</h4>
        <div className="row">{itemsRendered}</div>
      </div>
    );
  }
}

export default ArtistProfile;
