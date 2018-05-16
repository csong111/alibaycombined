import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class ArtistAccount extends Component {
    constructor() {
      super();
      this.state={
        artistProfile: {
          artistName: "caro",
          bio: "I'm a cool artist",
          location: "Montreal, Canada",
          imageURL: "mypic.jpg",
          items: [
              { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
              { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb:"Best pillow ever!", quantity: 2 },
          ],
      }
      }
    }
    createListing = (artistName) => {

    }
    editListing = (artistName, itemID) => {

    }
    seeOrders = (artistName) => {

    }
    editInfo = (artistName) => {

    }
    render() {
        return (
          <div className="ArtistProf">
            <h1>ARTIST ACCOUNT</h1>
              <NavButton />
              {this.state.userID === "" ? null : <UserAccountButton />}
              {this.state.userID === "" ? null : <CartButton />}
          </div>
        );
      }
    }
    
    export default ArtistAccount;