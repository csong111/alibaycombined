import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";


class CheckoutComplete extends Component {
  constructor() {
    super();
    this.state = {
      checkoutItems: [
        {
          itemID: "",
          artistName: "",
          category: [],
          img1: "",
          img2: "",
          img3: "",
          name: "",
          price: null,
          quantity: null,
          quantityToBuy: null
        }
      ]
    };
  }

  backHome = event => {
    event.preventDefault();
    this.props.history.push("/");
  };

  componentDidMount() {
    this.setState({checkoutItems: this.props.cartItems.cartItems})
  }

  render() {
    let total =0;
    let checkoutItems = this.state.checkoutItems.map((item, id) => {
      total += Number(item.price) * Number(item.quantityToBuy);
      return (
        <li key={id}>
        <img src={item.img1} />
          <div>Item Name: {item.name}</div>
          <div>Price: ${item.price}</div>
          <div>Artist: {item.artistName}</div>
          <div>Quantity: {item.quantityToBuy}</div>
        </li>
      );
    });
    return (
      <div className="App">
        <NavButton />
        <HomeButton />
        <h1>
          Thank you for your purchase. Your order number is {this.props.transactionID}
        </h1>
        {this.state.userID ? <UserAccountButton userID={this.props.userID}/> : null}
        {this.props.userID ? <LogOutButton />: null}
        {this.state.userID ? <CartButton userID = {this.props.userID} counter={this.props.counter} /> : null} 
        <div>Order details</div>
        <ul>{checkoutItems}</ul>
        <div>Total: ${total}</div>
        <button onClick={this.backHome}>BACK TO SHOPPING</button>
      </div>
    );
  }
}

let Content = withRouter(CheckoutComplete);
export default Content;
