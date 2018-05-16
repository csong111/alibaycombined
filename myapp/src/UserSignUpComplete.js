import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import ItemDetail from "./ItemDetail.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class UserSignUpComplete extends Component{
    constructor() {
        super();
        this.state={
            
        }
    }
    redirect() {
        //redirecting in 5, 4, 3, 2, 1
    }

    render() {
        return (
          <div className="ArtistComp">
          {this.redirect}
            <h1>USER SIGNUP COMPLETE</h1>
          </div>
        );
      }

}

export default UserSignUpComplete;