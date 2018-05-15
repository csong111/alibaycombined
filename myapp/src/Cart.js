import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
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

  buy = (itemID, artistName, userID) => {};
  removeItem = itemID => {};
  updateQuantity = qty => {};
  renderCartItems = () => {};

  render() {
    return (
      <div className="App">
        <h1>CART</h1>
        <NavButton />
        {this.state.userID === "" ? null : <UserAccountButton />}
        {this.state.userID === "" ? null : <CartButton />}
      </div>
    );
  }
}

export default Cart;
