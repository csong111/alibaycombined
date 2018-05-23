import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import Item from "./page-elements.js/Item.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      editAccount: false,
      editShipping: false,
      itemsBought: [],

      // info that we are changing
      userID: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      country: ""
    };
  }


  componentDidMount () {
    //check if there is a userID 
    if (!this.props.isLoggedIn) this.props.history.push("/")
    this.initGetData()
  }

  initGetData = () => {
    let bod = JSON.stringify({ userID: this.props.userID });

    fetch("/getUserDetails", { method: "POST", body: bod })
      .then(x => x.text())
      .then(x => JSON.parse(x))
      .then(x => {
        this.setState({
          userID: x._id,
          firstName: x.firstName,
          lastName: x.lastName,
          email: x.email,
          password: x.password,
          confirmPassword: x.confirmPassword,
          address: x.address,
          city: x.city,
          province: x.province,
          postalCode: x.postalCode,
          country: x.country
        });
      });

    fetch("/getItemsBought?userID=" + this.props.userID, { method: "GET" })
      .then(x => x.text())
      .then(x => JSON.parse(x))
      .then(x => {
        //console.log(x)
        this.setState({ itemsBought: x });
      });
  };

  changePassword = () => {
    //this is probably fake
    // Strech goal
  };

  saveAccount = event => {
    event.preventDefault();
    let bod = this.state;
    fetch("/editUserAccount", { method: "POST", body: JSON.stringify(bod) })
      .then(e => e.text())
      .then(e => JSON.parse(e))
      .then(e => {
        this.setState({ editAccount: false, editShipping: false });
      });
  };

  saveShipping = () => {
    //edit Shipping Info & update server
    //FETCH endpoint: updateUserShippingInfo
  };

  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  handleAddressChange = event => {
    this.setState({ address: event.target.value });
  };

  handleCityChange = event => {
    this.setState({ city: event.target.value });
  };

  handleProvinceChange = event => {
    this.setState({ province: event.target.value });
  };

  handlePostalCodeChange = event => {
    this.setState({ postalCode: event.target.value });
  };

  handleCountryChange = event => {
    this.setState({ country: event.target.value });
  };

  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };

  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handlePasswordConfChange = event => {
    this.setState({ confirmPassword: event.target.value });
  };
  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////

  editShippingInfo = () => {
    this.setState({ editShipping: true });
  };

  editAccountInfo = () => {
    this.setState({ editAccount: true });
  };

  logout = () => {
    window.location.reload(true);
  };

  render() {
    var cartItems = this.state.itemsBought.map(item => {
      return item.cartItems;
    });
    let cartStore = [];
    for (let i = 0; i < cartItems.length; i++) {
      cartStore = cartStore.concat(cartItems[i]);
    }
    var itemsRendered = cartStore.map((item, id) => {
      return (
        <div className="col-6 col-md-4 col-lg-3 noPad space" key={id}>
          <Item
            key={id}
            itemID={item.itemID}
            name={item.name}
            price={item.price}
            artistName={item.artistName}
            img1={item.img1}
          />
        </div>
      );
    });

    let shippingInfo = (() => {
      if (this.state.editShipping === false) {
        return (
          <div>
            <h4>Address: {this.state.address}</h4>
            <h4>City: {this.state.city}</h4>
            <h4>Province: {this.state.province}</h4>
            <h4>Postal Code: {this.state.postalCode}</h4>
            <h4>Country: {this.state.country}</h4>
            <button
              className="button noPad connect"
              onClick={this.editShippingInfo}
            >
              EDIT SHIPPING INFO
            </button>
          </div>
        );
      } else {
        return (
          <form>
            <input className="editInput"
              placeholder="Address"
              type="text" 
              value={this.state.address}
              onChange={this.handleAddressChange}
            />
            <br />
            <input className="editInput"
              placeholder="City"
              type="text" 
              value={this.state.city}
              onChange={this.handleCityChange}
            />
            <br />
            <input className="editInput"
              placeholder="Province"
              type="text" 
              value={this.state.province}
              onChange={this.handleProvinceChange}
            />
            <br />
            <input className="editInput"
              placeholder="Postal Code"
              type="text"
              value={this.state.postalCode}
              onChange={this.handlePostalCodeChange}
            />
            <br />
            <input className="editInput"
              placeholder="Country"
              type="text"
              value={this.state.country}
              onChange={this.handleCountryChange}
            />
            <br />
            <button className="button noPad connect" onClick={this.saveAccount}>SAVE</button>
          </form>
        );
      }
    })();

    let accountInfo = (() => {
      if (this.state.editAccount === false) {
        return (
          <div>
            <h4>Name: {this.state.firstName}</h4>
            <h4>Last Name: {this.state.lastName}</h4>
            <h4>Email: {this.state.email}</h4>
            <h4>Password: ******</h4>
            <button
              className="button noPad connect"
              onClick={this.editAccountInfo}
            >
              EDIT ACCOUNT
            </button>
            <br />
            <button
              className="button noPad connect"
              onClick={this.logout}
            >
              LOG OUT
            </button>
          </div>
        );
      } else {
        return (
          <form>
            <input className="editInput"
              placeholder='First Name'
              type="text"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
            <br />
            <input className="editInput"
              placeholder='Last Name'
              type="text"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
            <br />
            <input className="editInput"
              placeholder="Email"
              type="text"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <br />
            <input className="editInput"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <br />
            <input className="editInput"
              placeholder="Confirm Password"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handlePasswordConfChange}
            />
            <br />
            <button className="button noPad connect" onClick={this.saveAccount}>SAVE</button>
          </form>
        );
      }
    })();

    return (
      <div className="App">
        {/* <NavButton />
        <HomeButton/>
        {this.props.email ? <UserAccountButton userID={this.props.userID} />: null}
        {this.props.email || this.props.artistID ? <LogOutButton />: null}
        {!this.props.email && !this.props.artistID ? <ConnectButton /> : null}
        {this.props.email ? <CartButton userID = {this.props.userID} counter={this.props.counter}  /> : null} */}

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
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad space">
            <h2 className="catName">ACCOUNT INFO</h2>
            {accountInfo}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noPad space">
            <h2 className="catName">SHIPPING INFO</h2>
            {shippingInfo}
          </div>
        </div>

        <div className="row">
        <div className="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad space">
        <h2>ITEMS BOUGHT</h2>
        </div>
        </div>


        <div name="items-bought" className="row">
          {itemsRendered}
        </div>
      </div>
    );
  }
}

export default Account;
