import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

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
  componentDidMount = () => {
    console.log(this.state.artistID)
    fetch("/getItemDetails?itemID=" + this.props.itemID, {
      method: "GET"
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        //console.log(parsed)
        let artistName = parsed.artistName;
        let blurb = parsed.blurb;
        let category = parsed.category;
        let img1 = parsed.img1;
        let img2 = parsed.img2;
        let img3 = parsed.img3;
        let name = parsed.name;
        let price = parsed.price;
        let quantity = parsed.quantity;
        this.setState({
          artistName: artistName,
          blurb: blurb,
          category: category,
          img1: img1,
          img2: img2,
          img3: img3,
          name: name,
          price: price,
          quantity: quantity
        });
      });
  };
  addToCart = () => {
    let body = JSON.stringify({
      userID: this.props.userID,
      cartObj: {
        itemID: this.props.itemID,
        artistName: this.state.artistName,
        blurb: this.state.blurb,
        category: this.state.category,
        img1: this.state.img1,
        img2: this.state.img2,
        img3: this.state.img3,
        name: this.state.name,
        price: this.state.price,
        quantity: this.state.quantity,
        quantityToBuy: 1
      }
    });
    fetch("/addToCart", {
      method: "POST",
      body: body
    })
      .then(res => res.text())
      .then(res => console.log(res));
    // .then(resB=>{
    //   let parsed=JSON.parse(resB);
    //   //console.log(parsed);
    // })
  };

  render() {
    //fetch itemdetails from backend

    let details = () => {
          return (<div className="space">
              <div className="bold">
                <h5 className="bold">{this.state.name}</h5>
              </div>
              <h5>${this.state.price}</h5>
              <h4 className="blurb">{this.state.blurb}</h4>
              <h4>
                Made by{" "}
                <Link to={"/artistprofile/" + this.state.artistName}>
                  {this.state.artistName}
                </Link>
              </h4>
              <button
                className="button noPad connect"
                onClick={this.addToCart}
              >
                ADD TO CART
              </button>
            </div>)
    }

    return (
      <div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}
        <div className="headerElements sticky">
          <NavButton />

          <div className="logo">
            <HomeButton />
          </div>

          <div className="search">
            <SearchBar />
          </div>

          <div className="flex">
            {this.props.email  ? (
              <UserAccountButton userID={this.props.userID} />
            ) : null}
<<<<<<< HEAD
            {/* {this.props.artistName == "" ? (
              <ArtistAccountButton artistName={this.props.artistName} />
            ) : null} */}
            {this.props.email === "" && this.props.artistName === "" ? (
=======
            {this.props.artistID ? (
              <ArtistAccountButton artistID={this.props.artistID} />
            ) : null}
            {!this.props.email && !this.props.artistID ? (
>>>>>>> fda694230824f6b02de81e5aef734b4bb9edff18
              <ConnectButton />
            ) : null}
            {this.props.email ? (
              <CartButton userID={this.props.userID} />
            ) : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}

        {/* <div className="detailsMobile">{details()}</div> */}

        <div className="row">
          <div className="detailsContainer noPad">
          <div className="detailsMobile">{details()}</div>
            <div className="space">
              <div>
                <img
                  className="detailImage"
                  width="350px"
                  src={this.state.img1}
                />
              </div>
              <div>
                <img
                  className="detailImage"
                  width="350px"
                  src={this.state.img2}
                />
              </div>
              <div>
                <img width="350px" src={this.state.img3} />
              </div>
            </div>

            <div className="details">{details()}</div>

          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;
