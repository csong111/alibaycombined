import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import Item from "./page-elements.js/Item.js"
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

class SearchResults extends Component {
  constructor() {
    super();
    this.state = {

    searchItems: [],
  };
  }

  componentDidMount () {
    //FETCH get searchItems by searchQuery then setState the results endpoint: searchItems
    this.getSearchResults(this.props.query);
    }

  componentWillReceiveProps(nextProps) {
    this.getSearchResults(nextProps.query);
  }

  getSearchResults = (query) => {
    let body = {
      query : query
    }
    // console.log("getResults-1", body)
    fetch("/getSearchResults",{
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(e =>e.text())
    .then(e =>JSON.parse(e))
    // .then(e=>{console.log("getResults-2",e); return e})
    .then(e =>{
      this.setState({searchItems: e})
    })
  }

  render() {

    console.log("this is the state:", this.state.searchItems)

    var itemsRendered = this.state.searchItems.map((el,id)=>{
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

          <div className="flex">
            {this.props.email ? <UserAccountButton userID={this.props.userID} />: null}
            {this.props.artistID ? <ArtistAccountButton artistID={this.props.artistID} /> : null}
            {this.props.email || this.props.artistID ? <LogOutButton />: null}
            {!this.props.email && !this.props.artistID ? <ConnectButton /> : null}
            {this.props.email ? <CartButton userID = {this.props.userID} counter={this.props.counter}  /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}
        
        <h2>Search Results</h2>
        <div name="search-results" className="row">
          {itemsRendered}
        </div>
      </div>
    );
  }
}

export default SearchResults;
