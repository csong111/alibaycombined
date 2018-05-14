import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Cart from "./Cart.js";
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
  onToken = (token) => { 
    console.log(token)
  /*onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });*/
  }
  /*
  onToken = (token) => {
    alert("ASD")
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    })
    .then(e => e.text())
    .then(e => console.log(e))}*/
//    .then(e => JSON.parse(e))



      /*
      console.log("ASD");
      return response.json()}).then(data => {
        alert(`We are in business, ${data.email}`);
      });*/
    
  

  // ...

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