import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import './App.css';

class Nav extends Component {
    constructor () {
        super();
        this.state={
            allCat: ["Prints", "Pillows", "Embroidery", "Wallpaper", "Curtains", "Spring", "Popular", "Featured Items"],
        }
    }
    seeItemsInCat = () => {

    }
    closeNav = () => {
        window.history.back();
    }
    render () {
        return (
            <div>
                <h1>NAV</h1>
            </div>
        )
    }
}

export default Nav;