import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
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
    itemsBought: [ 
        // { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
        // { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
     ],

     // infos from back end
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",

    // info that we are changing
    ifirstName: "Jen",
    ilastName: "o",
    iemail: 'jen@email.com',
    iaddress: '123 Blah St.',
    icity: "Montreal",
    iprovince: "Quebec",
    ipostalCode: "H13 1Y8",
    icountry: "Canada"
    };
  }


  componentDidMount () {
    this.initGetData()
  }

  initGetData = () => {

    //FETCH get user info endpoint: getUserDetails
      // Copy the data to idata

    let bod = JSON.stringify({
      firstName: this.state.ifirstName,
      lastName: this.state.ilastName,
      email: this.state.iemail,
      address: this.state.iaddress,
      city: this.state.icity,
      province: this.state.iprovince,
      postalCode: this.state.ipostalCode,
      country: this.state.icountry,
    });

    fetch("/getUserDetails", { method: "POST", body: bod })
    .then(x => x.text())
    .then(x => JSON.parse(x))
    .then(x => {
      this.setState ({
        firstName: x.firstName,
        lastName: x.lastName,
        email: x.email,
        address: x.address,
        city: x.city,
        province: x.province,
        postalCode: x.postalCode,
        country: x.country,
      })
    })

    //FETCH get account info endpoint: getUserShippingInfo
    //FETCH get itemsBought then setState the results endpoint: getItemsBought


    fetch("/getItemsBought?userID="+this.props.userID, { method: 'GET' })
    .then(x => x.text())
    .then(x => JSON.parse(x))
    .then(x => {
        this.setState({itemsBought: x.itemsBought})
    })

  }

  changePassword = () => {
    //this is probably fake
    // Strech goal
  }

  saveAccount = () => {
    //edit account & update server
    //FETCH endpoint: updateUserAccount
  }

  saveShipping = () => {
    //edit Shipping Info & update server
    //FETCH endpoint: updateUserShippingInfo
  }


  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////
  handleAddressChange = (event) => {
    this.setState({ iaddress: event.target.value })
  }

  handleCityChange = (event) => {
    this.setState({ icity: event.target.value })
  }

  handleProvinceChange = (event) => {
    this.setState({ iprovince: event.target.value })
  }

  handlePostalCodeChange = (event) => {
    this.setState({ ipostalCode: event.target.value })
  }

  handleCountryChange = (event) => {
    this.setState({ icountry: event.target.value })
  }

  handleFirstNameChange = (event) => {
    this.setState({ ifirstName: event.target.value })
  }

  handleLastNameChange = (event) => {
    this.setState({ ilastName: event.target.value })
  }

  handleEmailChange = (event) => {
    this.setState({ iemail: event.target.value })
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
    var itemsRendered = this.state.itemsBought.map((el,id)=>{
      return (
        <Item key={id} itemID = {el.itemID} name = {el.name} price = {el.price} artistName = {el.artistName} imageURL = {el.imageURL} />
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
        <input type="text" value={this.state.iaddress} onChange={this.handleAddressChange}></input><br />
        <input type="text" value={this.state.icity} onChange={this.handleCityChange}></input><br />
        <input type="text" value={this.state.iprovince} onChange={this.handleProvinceChange}></input><br />
        <input type="text" value={this.state.ipostalCode} onChange={this.handlePostalCodeChange}></input><br />
        <input type="text" value={this.state.icountry} onChange={this.handleCountryChange}></input><br />
        <button onClick = {this.saveShipping}>Save Info</button>
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
        <input type="text" value={this.state.ifirstName} onChange={this.handleFirstNameChange}></input><br />
        <input type="text" value={this.state.ilastName} onChange={this.handleLastNameChange}></input><br />
        <input type="text" value={this.state.iemail} onChange={this.handleEmailChange}></input><br />
        <p>Password: ******</p>
        <button onClick = {this.saveAccount}>Save Info</button>
      </form>)
      }
    })()

    return (
      <div className="App">
        <NavButton />
        <HomeButton/>
        {this.state.userID === "" ? null : <UserAccountButton userID={this.props.userID} />}
        {this.state.userID === "" ? null : <CartButton userID = {this.props.userID} />}
        <h2>ACCOUNT INFO</h2>
        {accountInfo}

        <h2>SHIPPING INFO</h2>
        <div>
          {shippingInfo}
        </div>

        <h2>ITEMS BOUGHT</h2>
        <div name="items-bought">
          {itemsRendered}
        </div>

      </div>
    );
  }
}

export default Account;
