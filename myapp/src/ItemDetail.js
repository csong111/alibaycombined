import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class ItemDetail extends Component {
  constructor() {
    super();
    this.state = {
      itemID: "",
      artistName: "",
      blurb: "",
      category: [],
      img1: "",
      img2: "",
      img3: "",
      name: "",
      price: "",
      quantity: ""
    };
  }

  //getItem details
  componentDidMount = () =>{
    fetch("/getItemDetails?itemID="+this.props.itemID, {
      method: 'GET',
    }).then(res=>res.text())
      .then(resB=>{
        let parsed=JSON.parse(resB);
        //console.log(parsed)
        let artistName=parsed.artistName;
        let blurb=parsed.blurb;
        let category=parsed.category;
        let img1=parsed.img1;
        let img2=parsed.img2;
        let img3=parsed.img3;
        let name=parsed.name;
        let price=parsed.price;
        let quantity=parsed.quantity;
        this.setState({artistName: artistName, blurb: blurb, category: category, img1: img1, img2: img2, img3: img3,
          name: name, price: price, quantity: quantity})
    })
  }
  addToCart = () => {
    let body=JSON.stringify({userID: this.props.userID, cartObj: {itemID: this.props.itemID, artistName: this.state.artistName, blurb: this.state.blurb, 
      category: this.state.category, img1: this.state.img1, img2: this.state.img2, img3: this.state.img3, name: this.state.name,
      price: this.state.price, quantity: this.state.quantity, quantityToBuy: 1} })
    fetch("/addToCart", {
      method: 'POST',
      body: body 
    }).then(res=>res.text())
    .then(res => console.log(res))
      // .then(resB=>{
      //   let parsed=JSON.parse(resB);
      //   //console.log(parsed);
      // })
  };

  render() {
      //fetch itemdetails from backend
    return (
      <div>

        <div className="headerElements">
          <NavButton />

          <div className="logo">
            <HomeButton />
          </div>
          
          <div className="search">
            <SearchBar />
          </div>

          <div>
            {this.props.email !== "" ? <UserAccountButton userID={this.props.userID}  /> : null}
            {this.props.artistName !== "" ? <ArtistAccountButton artistName={this.props.artistName} /> : null}
            {this.props.email === "" && this.props.artistName === "" ? (
              <ConnectButton />
            ) : null}
            {this.props.email !== "" ? <CartButton userID = {this.props.userID}  /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>

      <div className ="container space">
      <div className ="row">
        <div className="detailsContainer noPad">
          <div className ="space">
          <img width="300px" src={this.state.img1}/>
          </div>

          <div className ="space">
          <div className="bold">{this.state.name}</div>
          <div>{this.state.blurb}</div>
          Made by <Link to={"/artistprofile/"+this.state.artistName}>{this.state.artistName}</Link>
          <br />
          <button onClick={this.addToCart}>Add to Cart</button>
          </div>
          </div>
        </div>
      </div>
      
      </div>
    );
  }
}

export default ItemDetail;
