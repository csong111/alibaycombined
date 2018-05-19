import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import ItemDetail from "./ItemDetail.js";
import Item from "./page-elements.js/Item.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class ArtistProfile extends Component {
  constructor() {
    super();
    this.state={
    
        artistName: "caro",
        bio: "I'm a cool artist",
        location: "Montreal, Canada",
        profPicURL: "/items/aisha.jpg",
        items: [
            { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
            { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb:"Best pillow ever!", quantity: 2 },
        ],
    }
  }
  componentDidMount() {
    var body = {
      artistName : this.props.artistName
    }
 // console.log("getArtistProfile-1",body)
  fetch("/getArtistProfile", {
    method: "POST",
    body : JSON.stringify(body)
  })
  .then(e =>e.text())
  .then(e =>JSON.parse(e))
 // .then(e =>{console.log("getAristProfile-4",e); return e})
  .then(e =>{
    console.log(e[0])
    this.setState({
      bio: e[0].bio,
      location: e[0].location,
      profPicURL: e[0].profPicURL,
      items: e[0].items
    })
  })
console.log(this.state)
  this.viewArtistItems(this.state.items)

}
viewArtistItems = async items => {
  let responses = await Promise.all(
    items.map(item =>
    fetch("/getItemDetails?itemID=" + item.itemID, { method: "GET" }).then(res => res.text())
    .then(resB=> {
      console.log(resB)
      return JSON.parse(resB)
    })
));
this.setState({items: responses})
};


  seeItemDetails = () => {
    this.props.history.push("/itemdetail/"+this.state.itemId)
  }
    render() {
      let accountInfo = (()=>{
        return (
          <div>
            <p>Name: {this.state.artistName}</p>
            <p>Location: {this.state.location}</p>
            <p>{this.state.bio}</p>
            </div>
        )
      })
      let itemsRendered = this.state.items.map((el)=>{
        return (
          <Item itemID = {el.itemID} name = {el.name} price = {el.price} artistName = {el.artistName} imageURL = {el.imageURL} />
        )
      })
      return (
        <div className="ArtistProf">
        <NavButton />
        <HomeButton />
        {this.props.email !== "" ? <UserAccountButton userID={this.props.userID} /> : null}
        {this.props.email !== "" ? <ConnectButton /> : null}
        {this.props.email !== "" ? <CartButton userID = {this.props.userID} /> : null}
        <div>{this.state.profPicURL}</div>
        <div>{this.state.artistName}</div>
        <div>{this.state.location}</div>
        <div>{this.state.bio}</div>
        <div>Other items by this artist:</div>
          {itemsRendered}
        </div>
      );
    }
  }
  
  export default ArtistProfile;