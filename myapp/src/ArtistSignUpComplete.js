import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import ItemDetail from "./ItemDetail.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import {Helmet} from 'react-helmet';
import './App.css';

class ArtistSignUpComplete extends Component{
    constructor() {
        super();
    }
    redirect = () => {
      this.props.history.push("/")
    }
    render() {
        return (
          <div>
            <Helmet bodyAttributes={{style: 'background-color : #ffecdf'}}/>
            <h1>Thank you! We will review your submission &amp; get back to you shortly.</h1>
            <button className="button noPad connect" onClick={this.redirect}>BACK TO HOME</button>
          </div>
        );
      }
}
let ArtistComplete=withRouter(ArtistSignUpComplete);
export default ArtistComplete;