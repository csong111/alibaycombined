import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Cart from "./Cart.js";
import StripeCheckout from 'react-stripe-checkout';

export default class Stripe extends React.Component {
  onToken = (token) => { 
    console.log(token)
  }
  
  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_worrUeYzGQeY1wmpIgxohWx6"
      />
    )
  }
}
