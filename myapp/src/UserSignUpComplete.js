import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import ItemDetail from "./ItemDetail.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import {Helmet} from 'react-helmet';
import './App.css';

class UserSignUpComplete extends Component{
    constructor() {
        super();
        this.state={
            
        }
    }
    redirect = (event) => {
        event.preventDefault();
        this.props.history.push("/")

    }

    render() {
        return (
          <div>
            <Helmet bodyAttributes={{style: 'background-color : #ffecdf'}}/>
           <h1>Thank you! You're now logged in.</h1>
            <button className="button noPad connect"onClick={this.redirect}>BACK TO HOME</button>
          </div>
        );
      }

}
let UserComplete=withRouter(UserSignUpComplete)
export default UserComplete;