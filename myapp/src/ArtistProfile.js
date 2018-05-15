import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import ItemDetail from "./ItemDetail.js";
import './App.css';

class ArtistProfile extends Component {
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

  seeItemDetails = () => {

  }
    render() {
      return (
        <div className="ArtistProf">
          <h1>ARTIST PROFILE</h1>
            <NavButton />
            {this.state.userID === "" ? null : <UserAccountButton />}
            {this.state.userID === "" ? null : <CartButton />}
        </div>
      );
    }
  }
  
  export default ArtistProfile;