import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserAccountButton from './page-elements.js/user-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';

class CheckoutComplete extends Component {
    constructor() {
        super();
        this.state={
            checkoutItems: [
                {
                  itemID: "123458",
                  name: "Pillow",
                  price: 100,
                  artistName: "caro",
                  imageURL: "pillow.jpg",
                  cat: "Popular",
                  quantity: 1
                },
                {
                    itemID: "245679",
                    name: "Embroidery",
                    price: 100,
                    artistName: "aisha",
                    imageURL: "aisha.jpg",
                    cat: "Popular",
                    quantity: 1
                  }
              ]
        }
    }

    backHome = (event) => {
        event.preventDefault();
    }

    render() {
        return (
          <div className="App">
            <h1>Thank you for your purchase. Your order number is {this.orderID}</h1>
              <NavButton />
              {this.state.userID === "" ? null : <UserAccountButton />}
              {this.state.userID === "" ? null : <CartButton />}
            <button onClick={this.backHome}>BACK TO SHOPPING</button>
          </div>
        );
      }
    }

export default CheckoutComplete; 
