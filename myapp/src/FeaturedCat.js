import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from './page-elements.js/nav-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import Item from "./page-elements.js/Item.js"
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class FeaturedCat extends Component {
    constructor() {
        super();
        this.state={
            itemsInCat: [],
        }
    }

    componentDidMount () {
      fetch("/getCatItems?cat="+this.props.cat, {
        method: 'GET'
      }).then(res=>res.text())
        .then(resB=>{
          let parsed=JSON.parse(resB)
          console.log(parsed)
          this.setState({itemsInCat: parsed})
        })
    }

    render() {
      var itemsRendered = this.state.itemsInCat.map((el,id)=>{
        return (
          <div className="col-6 col-md-4 col-lg-3 noPad space" key={id}>
          <Item itemID = {el._id} name = {el.name} price = {el.price} artistName = {el.artistName} img1 = {el.img1} />
          </div>
        )
      })

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

          <div className="flex moveOver">
            {this.props.email ? <UserAccountButton userID={this.props.userID}  /> : null}
            {this.props.artistID ? <ArtistAccountButton artistID={this.props.artistID} /> : null}
            <span className="hideLogin">{this.props.email || this.props.artistID ? <LogOutButton />: null}</span>
            {!this.props.email && !this.props.artistID ? <ConnectButton /> : null}
            {this.props.email ? <CartButton userID = {this.props.userID} counter={this.props.counter}  /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}

        <div className="catName">
          <div className="flex">
          <h2 className="">{this.props.cat.toUpperCase()}</h2>
          <div className="marginAuto"/>
          {this.props.cat === "Prints" ? <button className="button noPad connect"><Link className="noLink" to={"/viewprintsinroom"}> VIEW IN ROOM</Link></button> : null}
          {this.props.cat === "Pillows" ? <button className="button noPad connect"><Link className="noLink" to={"/viewpillowsinroom"}> VIEW IN ROOM</Link></button> : null}
          </div>
        </div>

        <div name="cat-items" className="row">
          {itemsRendered}
        </div>
        </div>
      );
    }
  }
  
  export default FeaturedCat;