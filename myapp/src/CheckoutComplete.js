import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserAccountButton from "./page-elements.js/user-account-button.js";
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
          itemID: "123458",
          name: "Pillow",
          price: 100,
          artistName: "caro",
          imageURL: "items/pillow.jpg",
          cat: "Popular",
          quantity: 1
        },
        {
          itemID: "245679",
          name: "Embroidery",
          price: 120,
          artistName: "aisha",
          imageURL: "items/aisha.jpg",
          cat: "Popular",
          quantity: 1
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
      total +=item.price
      return (
        <li key={id}>
        <img src={"/"+item.imageURL} />
          Item Name: {item.name}
          Price: {item.price}
          artistName: {item.artistName}
          quantity: {item.quantity}
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
        {this.state.userID === "" ? null : <UserAccountButton userID={this.props.userID} />}
        {this.state.userID === "" ? null : <CartButton userID = {this.props.userID} />}
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
