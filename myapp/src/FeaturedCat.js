import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class FeaturedCat extends Component {
    constructor() {
        super();
        this.state={
            itemsInCat: [
                { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", imageURL: 'print.jpg', cat: "Spring" },
                { itemID: '123457', name: "Awesome Emproidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring" },
            ],
        }
    }
    seeItemDetails = () => {
    
    }
    render() {
      return (
        <div>
          <h1>FEATURED CAT</h1>
        <NavButton />
        {this.state.userID === "" ? null : <UserAccountButton />}
        {this.state.userID === "" ? null : <CartButton />}
        {this.state.userID === "" ?<ConnectButton /> :null}
        <SearchBar/>
        </div>
      );
    }
  }
  
  export default FeaturedCat;