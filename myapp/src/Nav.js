import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class Nav extends Component {
    constructor () {
        super();
        this.state={
            allCat: ["Prints", "Pillows", "Embroidery", "Wallpaper", "Curtains", "Spring", "Popular", "Featured Items"],
        }
    }
    seeItemsInCat = () => {
    //fetch items in categories
    }
    closeNav = () => {
        window.history.back();
    }
    render () {
        return (
            <div>
                <button onClick={this.closeNav}>X</button>
                <ul style={{listStyleType: "none"}}>
                    <li>PRINTS</li>
                    <li>PILLOWS</li>
                    <li>EMBROIDERY</li>
                    <li>WALLPAPER</li>
                    <li>CURTAINS</li>
                </ul>
            </div>
        )
    }
}

export default Nav;