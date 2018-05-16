import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import UserAccount from './UserAccount.js';
import Item from "./page-elements.js/Item.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import "./App.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      featuredCat: [
        { name: "Spring", imageURL: "collections/image1.jpg" },
        { name: "Popular", imageURL: "collections/image2.jpg" },
        { name: "Featured Items", imageURL: "collections/image3.jpg" }
      ],
      randomItems: [
      { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", imageURL: 'print.jpg', cat: "Spring", blurb: "Here's my spring print", quantity: 2 },
      { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
      { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
      { itemID: '123459', name: "Painting", price: 20, artistName: "jen", imageURL: 'painting.jpg', cat: "Prints", blurb: "This is a cool painting", quantity: 3 },
      { itemID: '123450', name: "Cool Print", price: 30, artistName: "jen", imageURL: 'print.jpg', cat: "Prints", blurb: "Great print", quantity: 4 } ],
      email: "jen@email.com",
      query: ""
    };
  }

  componentDidMount () {
    //FETCH get randomItems then setState the results
  }

  seeItemsInCat = () => {};

  render() {
    let featuredCollection = this.state.featuredCat.map((el, id) => {
      return (
        <div key={id}>
          <Link to = {"/featuredcat/" + el.name}><img src = {el.imageURL} /></Link>
          <br />
          <p>{el.name}</p>
        </div>
      );
    });

    var itemsRendered = this.state.randomItems.map((el,id)=>{
      return (
        <Item itemID = {el.itemID} name = {el.name} price = {el.price} artistName = {el.artistName} imageURL = {el.imageURL} />
      )
    })
    
    return (
      <div>
        <NavButton />
        <h1>LOGO</h1>
        {this.props.email !== "" ? <UserAccountButton /> : null}
        {this.props.aName !== "" ? <ArtistAccountButton /> : null}
        {this.props.email === "" && this.props.aName === "" ? <ConnectButton /> : null}
        {this.props.email !== "" ? <CartButton /> : null}
        <SearchBar />
        <h2>Featured collection</h2>
        <div name="categories">
            {featuredCollection}
        </div>
        <div name="items">
          {itemsRendered}
        </div>
      </div>
    );
  }
}

export default Home;
