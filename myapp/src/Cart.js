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
          imageURL: "items/pillow.jpg",
          cat: "Popular",
          quantity: 2,
          quantityToBuy : 1,
          orderNumber: 333
        }
      ]
    };
  }
  //fetch from backend, will return orderID and pass it as props to checkout complete.
  buy = (itemID, artistName, userID) => {
    this.props.history.push('/checkoutcomplete/'+this.state.orderNumber)
  };
  
  removeItem = itemID => {};
  updateQuantity = qty => {

  };


  render() {
    let total=0;
    let cartItems = this.state.cartItems.map((item,id)=>{
      total +=item.price*item.quantityToBuy
      return (
        <div key={id}>
        <img src={"/"+item.imageURL} /><br/>
          {item.name}<br/>
          {item.artistName}<br/>
          Price: {item.price}<br/>
          <input type="text" onChange={(e)=>{
              if(e.target.value <= item.quantity){
                var temp = JSON.parse(JSON.stringify(this.state.cartItems))
                temp[id].quantityToBuy = e.target.value
                this.setState({cartItems: temp})
              }
            }} value={item.quantityToBuy} placeholder={item.quantity+" in stock"}/>
          <button onClick={this.updateQuanity}>Update Quantity</button>
          <button onClick={this.removeItem}>Remove Item</button>
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
      <div>{cartItems}</div>
      <div>Total: ${total}</div>
      <button onClick={this.buy}>Pay with Paypal</button>
      </div>
    );
  }
}

let Content = withRouter(Cart)
export default Content;
