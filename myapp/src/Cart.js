import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [
        {
          itemID: "123458",
          name: "Pillow",
          price: 100,
          artistName: "caro",
          imageURL: "pillow.jpg",
          cat: "Popular",
          quantity: 2
        }
      ]
    };
  }
  //fetch from backend, will return orderID and pass it as props to checkout complete.
  buy = (itemID, artistName, userID) => {};
  
  
  removeItem = itemID => {};
  updateQuantity = qty => {};
  renderCartItems = () => {};

  render() {
    let cartItems = this.state.cartItems.map((item,id)=>{
      return (
        <div key={id}>
          {item.name}
          {item.artistName}
          {item.price}
          {item.imageURL}
        </div>
      )
    })
    return (
      <div className="App">
        <NavButton />
       {this.props.email !== "" ? <UserAccountButton /> : null}
       {this.props.aName !== "" ? <ArtistAccountButton /> : null}
       {this.props.email !== "" || this.props.aName !== "" ? <ConnectButton /> : null}
       {this.props.email !== "" ? <CartButton /> : null}
       <h1>CART</h1>
      <div>cartItems</div>
      </div>
    );
  }
}

export default Cart;
