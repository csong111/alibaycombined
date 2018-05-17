import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import Stripe from "./Stripe.js";
import "./App.css";

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
          imageURL: "items/pillow.jpg",
          cat: "Popular",
          quantity: 2,
          quantityToBuy: 1,
          orderNumber: 333,
          showCheckout: false,
          firstName: "Jen",
          lastName: "O",
          email: "jen@email.com",
          address: "123 Blah St.",
          city: "Montreal",
          province: "Quebec",
          postalCode: "H13 1Y8",
          country: "Canada"
        }
      ]
    };
  }

  //do a fetch to getCart  and  then setState with the items.
  //getUser details to prepopulate the shipping info.
  componentDidMount() {
    var self = this
    window.paypal.Button.render(
      {
        env: "sandbox",

        client: {
          sandbox:
            "AUd8sqBl5MJa4CHKQOjvkxQWN06fIRRPFO11uVRvTauWae6TSP4w2ERfDhUa_KUJmPaqGLF48zIDrbBZ"
        },

        commit: true, // Show a 'Pay Now' button

        payment: (data, actions) => {
          console.log(this.state.sum);
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: '1.00', currency: "CAD" }
                }
              ]
            }
          });
        },

        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
            // The payment is complete!
            // You can now show a confirmation message to the customer
            console.log(payment)
            self.buy();
          });
        }
      },
      "#paypal-button"
    );
  }
  buy = (itemID, artistName, userID) => {
    //fetch from backend, will return orderID and pass it as props to checkout complete.
    //When you buy, you use the putItemsBought and putOrder endpoints.
    //send shipping info...putUserShippingInfo    
    this.props.history.push("/checkoutcomplete/" + this.state.orderNumber);
  };

  //fetch to remove the item from cart
  removeItem = itemID => {};
  updateQuantity = qty => {};

  render() {
    console.log(window.paypal);
    let total = 0;
    let cartItems = this.state.cartItems.map((item, id) => {
      total += item.price * item.quantityToBuy;
      return (
        <div key={id}>
          <img src={"/" + item.imageURL} />
          <br />
          {item.name}
          <br />
          {item.artistName}
          <br />
          Price: {item.price}
          <br />
          <input
            type="text"
            onChange={e => {
              if (e.target.value <= item.quantity) {
                var temp = JSON.parse(JSON.stringify(this.state.cartItems));
                temp[id].quantityToBuy = e.target.value;
                this.setState({ cartItems: temp });
              }
            }}
            value={item.quantityToBuy}
            placeholder={item.quantity + " in stock"}
          />
          <button onClick={this.updateQuantity}>Update Quantity</button>
          <button onClick={this.removeItem}>Remove Item</button>
        </div>
      );
    });
    return (
      <div className="App">
        <NavButton />
        {this.props.email !== "" ? <UserAccountButton /> : null}
        {this.props.aName !== "" ? <ArtistAccountButton /> : null}
        {this.props.email == "" || this.props.aName == "" ? (
          <ConnectButton />
        ) : null}
        {this.props.email !== "" ? <CartButton /> : null}
        <h1>CART</h1>
        <div>{cartItems}</div>
        <div>Total: ${total}</div>
        <button
          onClick={e => {
            this.setState({ showCheckout: true });
          }}
        >
          Checkout Now
        </button>
        
          <div style={this.state.showCheckout ? {display:"inline"} : {display:"none"}}>
            <div>Enter Shipping Info</div>
            <form>
              First Name:{" "}
              <input
                type="text"
                onChange={e => {
                  this.setState({ firstName: e.target.value });
                }}
                value={this.state.firstName}
                placeholder="First Name"
                required
              />
              <br />
              Last Name:{" "}
              <input
                type="text"
                onChange={e => {
                  this.setState({ lastName: e.target.value });
                }}
                value={this.state.lastName}
                placeholder="Last Name"
                required
              />
              <br />
              Email:{" "}
              <input
                type="text"
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
                value={this.state.email}
                placeholder="Email"
                required
              />
              <br />
              Address:{" "}
              <input
                type="text"
                onChange={e => {
                  this.setState({ address: e.target.value });
                }}
                value={this.state.email}
                placeholder="Address"
                required
              />
              <br />
              City:{" "}
              <input
                type="text"
                onChange={e => {
                  this.setState({ city: e.target.value });
                }}
                value={this.state.city}
                placeholder="City"
                required
              />
              <br />
              Province:{" "}
              <input
                type="text"
                onChange={e => {
                  this.setState({ province: e.target.value });
                }}
                value={this.state.province}
                placeholder="Province"
                required
              />
              <br />
              Postal Code:{" "}
              <input
                type="text"
                onChange={e => {
                  this.setState({ postalCode: e.target.value });
                }}
                value={this.state.postalCode}
                placeholder="Postal Code"
                required
              />
              <br />
              Country:{" "}
              <input
                type="text"
                onChange={e => {
                  this.setState({ country: e.target.value });
                }}
                value={this.state.country}
                placeholder="Country"
                required
              />
              <br />
              <div id="paypal-button" />
              <Stripe />
              <button onClick={this.buy}/>
            </form>
            <button className="noButton" onClick={this.buy} />
          </div>
        
      </div>
    );
  }
}

let Content = withRouter(Cart);
export default Content;
