import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
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
        <div className="flex" key={id}>
        <div>
        <img width="150px" src={item.img1} />
        <div className="spaceSmaller" />
        </div>
        <div className="space" />
        <div>
          <p>Item Name: {item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Artist: {item.artistName}</p>
          <p>Quantity: {item.quantityToBuy}</p>
        </div>
        </div>
      );
    });
    return (
      <div className="App">
        {/* NAV !!!!!!!!!!!!!!!!!!*/}
        <div className="headerElements sticky">
          <NavButton />

          <div className="logo">
            <HomeButton />
          </div>

          <div className="search">
            <SearchBar />
          </div>

          <div className="flex moveOver">
            {this.props.email ? (
              <UserAccountButton userID={this.props.userID} />
            ) : null}
            {/* {this.props.artistID ? <ArtistAccountButton artistID={this.props.artistID} /> : null} */}
            <span className="hideLogin">
              {this.props.email || this.props.artistID ? (
                <LogOutButton />
              ) : null}
            </span>
            {!this.props.email && !this.props.artistID ? (
              <ConnectButton />
            ) : null}
            {this.props.email ? (
              <CartButton
                userID={this.props.userID}
                counter={this.props.counter}
              />
            ) : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}

        <h1 className="catName">
          Thank you for your purchase. Your order number is {this.props.transactionID}
        </h1>
        <div className="space" />
        {/* {this.state.userID ? <UserAccountButton userID={this.props.userID}/> : null}
        {this.props.userID ? <LogOutButton />: null}
        {this.state.userID ? <CartButton userID = {this.props.userID} counter={this.props.counter} /> : null}  */}
        <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 noPad space">
        <h7>Order details:</h7>
        <div className="spaceSmaller" />
        <div>{checkoutItems}</div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad space">
        <h7>Total: <div className="bold">${total}</div></h7>
        <div className="spaceSmaller" />
        <button className="button noPad connect"
        onClick={this.backHome}>BACK TO SHOPPING</button>
        </div>
        </div>
      </div>
    );
  }
}

let Content = withRouter(CheckoutComplete);
export default Content;
