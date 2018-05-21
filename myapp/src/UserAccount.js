import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import Item from "./page-elements.js/Item.js"
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

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
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: "",
    province: "",
    postalCode: "",
    country: ""
    };
  }

  componentDidMount () {
    this.initGetData()
  }

  initGetData = () => {

    let bod = JSON.stringify({ userID : this.props.userID });

    fetch("/getUserDetails", { method: "POST", body: bod })
    .then(x => x.text())
    .then(x => JSON.parse(x))
    .then(x => {
      this.setState ({
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
        country: x.country,
      })
    })

    fetch("/getItemsBought?userID="+this.props.userID, { method: 'GET' })
    .then(x => x.text())
    .then(x => JSON.parse(x))
    .then(x => {
      //console.log(x)
        this.setState({itemsBought: x})
    })

  }

  changePassword = () => {
    //this is probably fake
    // Strech goal
  }

  saveAccount = (event) => {
    event.preventDefault();
    let bod = this.state;
    fetch("/editUserAccount", { method: "POST", body: JSON.stringify(bod) })
      .then(e => e.text())
      .then(e => JSON.parse(e))
      .then((e) => {this.setState({ editAccount: false, editShipping: false })});
  }

  saveShipping = () => {
    //edit Shipping Info & update server
    //FETCH endpoint: updateUserShippingInfo
  }


  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  handleAddressChange = (event) => {
    this.setState({ address: event.target.value })
  }

  handleCityChange = (event) => {
    this.setState({ city: event.target.value })
  }

  handleProvinceChange = (event) => {
    this.setState({ province: event.target.value })
  }

  handlePostalCodeChange = (event) => {
    this.setState({ postalCode: event.target.value })
  }

  handleCountryChange = (event) => {
    this.setState({ country: event.target.value })
  }

  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value })
  }

  handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.value })
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handlePasswordConfChange = (event) => {
    this.setState({ confirmPassword: event.target.value })
  }
  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  

  editShippingInfo = () => {
    this.setState({editShipping: true})
  }

  editAccountInfo = () => {
    this.setState({editAccount: true})
  }

  render() {
    var cartItems = this.state.itemsBought.map(item=>{return item.cartItems})
    let cartStore = []
    for (let i=0; i<cartItems.length; i++) {
      cartStore = cartStore.concat(cartItems[i])
    }
     var itemsRendered = cartStore.map((item,id)=>{ 
          return (
            <div className="col-6 col-md-4 col-lg-3 noPad space" key={id}>
            <Item key={id} itemID = {item.itemID} name = {item.name} price = {item.price} artistName = {item.artistName} img1 ={item.img1}/>
         </div>
          )
         })
 
    let shippingInfo = (() => {
      if (this.state.editShipping === false) {
        return (<div>
        <p>Address: {this.state.address}</p>
        <p>City: {this.state.city}</p>
        <p>Province: {this.state.province}</p>
        <p>Postal Code: {this.state.postalCode}</p>
        <p>Country: {this.state.country}</p>
        <button onClick={this.editShippingInfo}>Edit Shipping Info</button>
          </div>)
      } else {return (<form>
        <input type="text" value={this.state.address} onChange={this.handleAddressChange}></input><br />
        <input type="text" value={this.state.city} onChange={this.handleCityChange}></input><br />
        <input type="text" value={this.state.province} onChange={this.handleProvinceChange}></input><br />
        <input type="text" value={this.state.postalCode} onChange={this.handlePostalCodeChange}></input><br />
        <input type="text" value={this.state.country} onChange={this.handleCountryChange}></input><br />
        <button onClick = {this.saveAccount}>Save Info</button>
      </form>)
      }
    })()

    let accountInfo = (() => {
      if (this.state.editAccount === false) {return (<div>
        <p>Name: {this.state.firstName}</p>
        <p>Last Name: {this.state.lastName}</p>
        <p>Email: {this.state.email}</p>
        <p>Password: ******</p>
        <button onClick={this.editAccountInfo}>Edit Account</button>
        </div>)
      } else {return (<form>
        <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange}></input><br />
        <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange}></input><br />
        <input type="text" value={this.state.email} onChange={this.handleEmailChange}></input><br />
        <input type="password" value={this.state.password} onChange={this.handlePasswordChange}></input><br />
        <input type="password" value={this.state.confirmPassword} onChange={this.handlePasswordConfChange}></input><br />
        <button onClick = {this.saveAccount}>Save Info</button>
      </form>)
      }
    })()

    return (
      <div className="App">
        <NavButton />
        <HomeButton/>
        {this.props.email ? <UserAccountButton userID={this.props.userID} />: null}
        {this.props.email || this.props.artistID ? <LogOutButton />: null}
        {!this.props.email && !this.props.artistID ? <ConnectButton /> : null}
        {this.props.email ? <CartButton userID = {this.props.userID} counter={this.props.counter}  /> : null}
        <h2>ACCOUNT INFO</h2>
        {accountInfo}

        <h2>SHIPPING INFO</h2>
        <div>
          {shippingInfo}
        </div>

        <h2>ITEMS BOUGHT</h2>
        <div name="items-bought" className="row">
          {itemsRendered}
        </div>

      </div>
    );
  }
}

export default Account;
