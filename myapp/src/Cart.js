import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
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
      // Inner
      showCheckout: false,

      // UserDetails
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",

      // Cart
      cartItems: [
        {
          itemID: "",
          artistName: "",
          blurb: "",
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

  getCart = () => {
    var body = {
      userID: this.props.userID
    };
    //console.log("getCart-1",body)
    fetch("/getCart", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(e => e.text())
      .then(e => {
        //console.log("HEY JORDAN", e)
        let parsed = JSON.parse(e);
        this.setState({ cartItems: parsed });
        this.props.setCartItems(parsed);
        //console.log(this.state.cartItems)
        this.getUserDetails();
      });
  }

  //do a fetch to getCart  and  then setState with the items.
  //getUser details to prepopulate the shipping info.
  componentDidMount() {
    this.getCart()


    var self = this;
    window.paypal.Button.render(
      {
        env: "sandbox",

        client: {
          sandbox:
            "ARwoGJ_sUwvA4yVX-fyaodG5lm0U1JqrsAhz5tk43xTgeL7C-kUgaAg1yFfZEJWi3o0qUq2Y__He2lTi"
        },

        commit: true, // Show a 'Pay Now' button

        payment: (data, actions) => {
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: this.state.total, currency: "CAD" }
                }
              ]
            }
          });
        },

        onAuthorize: (data, actions) => {
          return actions.payment.execute().then(function(payment) {
            // The payment is complete!
            // You can now show a confirmation message to the customer
            //console.log(payment);
            self.buy();
          });
        }
      },
      "#paypal-button"
    );
  }

  getUserDetails = () => {
    var body = {
      userID: this.props.userID
    };
    //console.log("getUserDetails-1",body)
    fetch("/getUserDetails", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(e => e.text())
      .then(e => JSON.parse(e))
      //.then(e=>{console.log("getUserDetails-4",e);return e})
      .then(e => {
        this.setState({
          // firstName: e.firstName,
          // lastName: e.lastName,
          // email: e.email,
          // address: e.address,
          // city: e.city,
          // province: e.province,
          // postalCode: e.postalCode,
          // country: e.country,
          ...e
        });
      });
  };

  buy = () => {
    // addTransaction
    let date = new Date();
    var body = ({
      // Shipping Infos
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      province: this.state.province,
      postalCode: this.state.postalCode,
      country: this.state.country,
      // userID
      userID: this.props.userID,
      // transactions
      cartItems: this.state.cartItems,
      date: date
    });
    console.log("checkout-1",body)
    fetch("/checkout", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => res.text())
      .then(res => {
        console.log("checkout-4",res);
        let parsed = JSON.parse(res);
        var postCartItems = JSON.parse(JSON.stringify(this.state.cartItems))
        this.getCart()
        this.props.history.push("/checkoutcomplete/" + parsed, {
          cartItems: postCartItems
        });
      });
  };

  //fetch to remove the item from cart
  removeItem = tempCartItems => {
    // // 1)
    // Go through cartItems array and remove the object that contains the itemID we want to remove
    //
    // resetFront State ()
    var body = {
      // userID
      userID: this.props.userID,
      // transactions
      cartItems: tempCartItems
    };
    //console.log("removeItem-1",body)
    fetch("/removeItem", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(e => e.text())
      .then(e => JSON.parse(e))
      //.then(e=>{console.log("removeItem-4",e);return e})
      .then(res => {
        if (res.success) {
          console.log(this.state.cartItems, tempCartItems);
          this.setState({
            cartItems: tempCartItems
          });
        }
      });
  };

  render() {
    console.log("cartItems", this.state.cartItems);
    let total = 0;
    let cartItems = this.state.cartItems.map((item, id) => {
      total += Number(item.price) * Number(item.quantityToBuy);
      return (
        <div className="flex" key={id}>
        {/* <button onClick={this.buy}>Temp</button> */}
          <div>
            <img width="150px" src={item.img1} />
            <div className="spaceSmaller" />
          </div>
          <div className="space" />
          <div>
            <p>{item.name}</p>
            <p>{item.artistName}</p>
            <p>Price: ${item.price}</p>
            <input
              className="quantityInput"
              type="text"
              onChange={e => {
                if (e.target.value <= Number(item.quantity)) {
                  var temp = JSON.parse(JSON.stringify(this.state.cartItems));
                  temp[id].quantityToBuy = e.target.value;
                  this.setState({ cartItems: temp });
                }
              }}
              value={item.quantityToBuy}
              placeholder={item.quantity + " in stock"}
            />
            <div className="space" />
            <button
              className="button noPad connect"
              onClick={() => {
                var temp = JSON.parse(JSON.stringify(this.state.cartItems));
                temp = temp.filter((EL, ID) => ID !== id);
                this.removeItem(temp);
              }}
            >
              REMOVE ITEM
            </button>
          </div>
        </div>
      );
    });
    return (
      <div className="App">
        {/* <HomeButton />
        <NavButton />
        {this.props.email ? <UserAccountButton userID={this.props.userID} /> : null}
        {this.props.email ? <LogOutButton />: null}
        {!this.props.email ? <ConnectButton /> : null}
        {this.props.email ? <CartButton userID = {this.props.userID} counter ={this.props.counter} /> : null} */}

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
        <div className="row">
          {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad space"> */}
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 noPad space">
            <h2 className="catName">MY SHOPPING CART</h2>
            <div className="spaceSmaller" />
            <div>{cartItems}</div>
            {/* <div>Total: ${total}</div> */}
          </div>

          {/* CHECK OUT INFO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad space"> */}
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 noPad space">
            <h2 className="catName">CHECKOUT</h2>
            <div className="spaceSmaller" />

            <div className="inputText">
              Total: <div className="bold">${total}</div>
            </div>

            <button
              className="button noPad connect"
              onClick={e => {
                this.setState({ showCheckout: true, total: total });
              }}
            >
              CHECK OUT NOW
            </button>

            <div
              style={
                this.state.showCheckout
                  ? { display: "inline" }
                  : { display: "none" }
              }
            />

            <div
              style={
                this.state.showCheckout
                  ? { display: "inline" }
                  : { display: "none" }
              }
            />

            {this.state.showCheckout ? (
              <div>
                <div className="space" />
                <hr />
                <div className="space" />

                <div className="inputText">Enter Shipping Info</div>
                <div className="spaceSmaller" />
              </div>
             ) : null} 

            {this.state.showCheckout ? (
              <form onSubmit={e => e.preventDefault()}>
                <p>First Name: </p>
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ firstName: e.target.value });
                  }}
                  value={this.state.firstName}
                  placeholder="First Name"
                  required
                />
                <div className="spaceSmaller" />
                <p>Last Name: </p>
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ lastName: e.target.value });
                  }}
                  value={this.state.lastName}
                  placeholder="Last Name"
                  required
                />
                <div className="spaceSmaller" />
                <p>Email: </p>
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                  value={this.state.email}
                  placeholder="Email"
                  required
                />
                <div className="spaceSmaller" />
                <p>Address: </p>
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ address: e.target.value });
                  }}
                  value={this.state.address}
                  placeholder="Address"
                  required
                />
                <div className="spaceSmaller" />
                <p>City: </p>
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ city: e.target.value });
                  }}
                  value={this.state.city}
                  placeholder="City"
                  required
                />
                <div className="spaceSmaller" />
                <p>Province: </p>
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ province: e.target.value });
                  }}
                  value={this.state.province}
                  placeholder="Province"
                  required
                />
                <div className="spaceSmaller" />
                <p>Postal Code: </p>
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ postalCode: e.target.value });
                  }}
                  value={this.state.postalCode}
                  placeholder="Postal Code"
                  required
                />
                <div className="spaceSmaller" />
                <p>Country: </p>
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ country: e.target.value });
                  }}
                  value={this.state.country}
                  placeholder="Country"
                  required
                />
                {/* <div className="space" />
                <div id="paypal-button" />
                <Stripe /> */}
              </form>
            ) : null}
            <div className="space" />
                <div id="paypal-button" />
                <Stripe />
          </div>
        </div>
      </div>
    );
  }
}

let Content = withRouter(Cart);
export default Content;
