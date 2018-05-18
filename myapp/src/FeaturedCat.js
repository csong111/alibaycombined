import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import Item from "./page-elements.js/Item.js"
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class FeaturedCat extends Component {
    constructor() {
        super();
        this.state={
            itemsInCat: [
                { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", imageURL: '/items/45589157_095_b.jpg', cat: "Spring" },
                { itemID: '123457', name: "Awesome Emproidery", price: 100, artistName: "caro", imageURL: '/items/45513033_045_b10.jpg', cat: "Spring" },
            ],
        }
    }

    componentDidMount () {
      //FETCH get itemsInCat by cat name then setState the results endpoint: getCatItems
    }

    render() {
      var itemsRendered = this.state.itemsInCat.map((el,id)=>{
        return (
          <Item key={id} itemID = {el.itemID} name = {el.name} price = {el.price} artistName = {el.artistName} imageURL = {el.imageURL} />
        )
      })

      return (
        <div>
        <NavButton />
        <HomeButton/>
        {this.props.email !== "" ? <UserAccountButton userID={this.props.userID} /> : null}
        {this.props.artistName !== "" ? <ArtistAccountButton /> : null}
        {this.props.email !== "" || this.props.artistName !== "" ? <ConnectButton /> : null}
        {this.props.email !== "" ? <CartButton userID = {this.props.userID} /> : null}
        <SearchBar/>
        <h2>FEATURED CAT</h2>
        <div name="cat-items">
          {itemsRendered}
        </div>
        </div>
      );
    }
  }
  
  export default FeaturedCat;