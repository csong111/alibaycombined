import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserAccountButton from './page-elements.js/user-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'

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
        this.props.history.push("/")
    }

   

    render() {
      let checkoutItems = this.state.checkoutItems.map((item,id) =>{
        return (
          <li key={id}>
          Item Name: {item.name}
          Price: {item.price}
          artistName: {item.artistName}
          quantity: {item.quantity}
          </li>
        )
      })
        return (
          <div className="App">
              <NavButton />
              <h1>LOGO</h1>
              <h1>Thank you for your purchase. Your order number is {this.props.orderID}</h1>
              {this.state.userID === "" ? null : <UserAccountButton />}
              {this.state.userID === "" ? null : <CartButton />}
              <div>Order details</div>
              <ul>
                {checkoutItems}
              </ul>
            <button onClick={this.backHome}>BACK TO SHOPPING</button>
          </div>
        );
      }
    }

let Content = withRouter(CheckoutComplete)
export default Content;
