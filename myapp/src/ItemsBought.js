import React, { Component } from "react";
import "./App.css";
import Item from "./page-elements.js/Item.js";
import NavButton from './page-elements.js/nav-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import LogOutButton from "./page-elements.js/logout-button.js";
import UserAccountButton from './page-elements.js/user-account-button.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'

class ItemsBought extends Component {
    constructor() {
    super();
    this.state = {itemsBought:[]};
  }
 
  componentDidMount = () => {
    //fetch itemsbought from transactions database
    fetch("/getItemsBought?userID="+this.props.userID, {
      method: 'GET'
    }).then(res=>res.text())
      .then(resB=>{
        let parsed=JSON.parse(resB);
        console.log(parsed)
        let itemsBought=parsed.itemsBought;
        console.log(itemsBought)
      })
  }

  render() {
    return (
      <div>
        <NavButton />
        <HomeButton />
        {this.props.email ? <UserAccountButton userID={this.props.userID} /> : null}
        {this.props.email ? <LogOutButton /> : null}
        {this.props.email ? <CartButton userID = {this.props.userID} counter={this.props.counter}  /> : null}
      </div>
    );
  }
}

export default ItemsBought;