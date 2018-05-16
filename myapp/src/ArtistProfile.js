import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import ItemDetail from "./ItemDetail.js";
import Item from "./page-elements.js/Item.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
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
    this.props.history.push("/itemdetail/"+this.state.itemId)
  }
    render() {
      //fetch artist's details from backend
      let itemsRendered = this.state.artistProfile.items.map((el)=>{
        return (
          <Item itemID = {el.itemID} name = {el.name} price = {el.price} artistName = {el.artistName} imageURL = {el.imageURL} />
        )
      })
      return (
        <div className="ArtistProf">
        <NavButton />
        {this.props.email !== "" ? <UserAccountButton /> : null}
        {this.props.email !== "" ? <ConnectButton /> : null}
        {this.props.email !== "" ? <CartButton /> : null}
          <h1>LOGO</h1>
          <h2>MEET CLARA</h2>
          <div>PROFILEPIC</div>
          <div>MONTREAL, QC</div>
          <div>I AM A COOL ARTIST, THIS IS MY ARTIST DESCRIPTION AND YOU LOVE IT</div>
          <br/>
          <h2>SHOP CLARA'S ART</h2>
          <div>RENDERED ITEMS</div>
          {itemsRendered}
        </div>
      );
    }
  }
  
  export default ArtistProfile;