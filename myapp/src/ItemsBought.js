import React, { Component } from "react";
import "./App.css";
import Item from "./page-elements.js/Item.js";
import NavButton from './page-elements.js/nav-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import UserAccountButton from './page-elements.js/user-account-button.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'

class ItemsBought extends Component {
    constructor() {
    super();
    this.state = {itemsBought:[]};
  }
 
  componentDidMount = () => {
    //fetch itemsbought from transactions database
  }

  render() {
    return (
      <div>
        <NavButton />
        <HomeButton />
        {this.state.userID === "" ? null : <UserAccountButton />}
        {this.state.userID === "" ? null : <CartButton userID = {this.props.userID} />}
      </div>
    );
  }
}

export default ItemsBought;