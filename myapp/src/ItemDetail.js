import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class ItemDetail extends Component {
  constructor() {
    super();
    this.state = {
      itemID: "",
      name: "A pillow",
      imageURL: "items/pillow.jpg",
      blurb: "",
      artistName: "clara",
      price: ""
    };
  }

  //getItem details
  componentDidMount = () =>{

  }
  addToCart = itemID => {};
  seeArtistInfo = artistName => {};

  render() {
      //fetch itemdetails from backend
    return (
      <div className="">
      <h1>LOGO</h1>
        <h1>ITEM DETAILS</h1>
        <NavButton />
        {this.props.email === "" ? null : <UserAccountButton />}
        {this.props.email === "" ? null : <CartButton />}
        {this.props.email === "" ? <ConnectButton /> : null}
        <SearchBar />
        <img src={"/"+this.state.imageURL}/>
        <div>{this.state.name}</div>
        <div>{this.state.blurb}</div>
        Made by <Link to={"/artistprofile/"+this.state.artistName}>{this.state.artistName}</Link>
        <button onClick={this.addToCart}>Add to Cart</button>
      </div>      
    );
  }
}

export default ItemDetail;
