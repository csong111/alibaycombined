import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import Item from "./page-elements.js/Item.js"
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class Account extends Component {
  constructor() {
    super();
    this.state = {
      itemsBought: [ 
        { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
        { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
     ],
    firstName: "Jen",
    email: 'jen@email.com',
    address: '123 Blah St.',
    city: "Montreal",
    province: "Quebec",
    postalCode: "H13 1Y8",
    country: "Canada"
    };
  }

  componentDidMount () {
    //FETCH get itemsBought then setState the results
  }

  changePassword = () => {
    //this is probably fake
  }

  editAccount = () => {
    //edit account & update server
  }

  render() {
    var itemsRendered = this.state.itemsBought.map((el,id)=>{
      return (
        <Item itemID = {el.itemID} name = {el.name} price = {el.price} artistName = {el.artistName} imageURL = {el.imageURL} />
      )
    })

    return (
      <div className="App">
        <NavButton />
        {this.state.userID === "" ? null : <UserAccountButton />}
        {this.state.userID === "" ? null : <CartButton />}

        <h2>ACCOUNT INFO</h2>
        <p>Name: {this.state.firstName}</p>
        <p>Email: {this.state.email}</p>
        <p>Password: ******</p>
        <button onClick={this.changePassword}>Change Password</button>

        <h2>SHIPPING INFO</h2>
        <p>Address: {this.state.address}</p>
        <p>City: {this.state.city}</p>
        <p>Province: {this.state.province}</p>
        <p>Postal Code: {this.state.postalCode}</p>
        <p>Country: {this.state.country}</p>
        <button onClick={this.editAccount}>Edit Account</button>

        <h2>ITEMS BOUGHT</h2>
        <div name="items-bought">
          {itemsRendered}
        </div>

      </div>
    );
  }
}

export default Account;
