import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import LogOutButton from "./page-elements.js/logout-button.js";
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
    closeNav = () => {
        window.history.back();
    }
    render () {
        return (
            <div>
            <button className="closeNav" onClick={this.closeNav}><img src="/ui-elements/close.png" width="20px" /></button>
            <div className="center navPage">
                <ul style={{listStyleType: "none"}}>
                    <li><Link className="link" to={"/featuredcat/Prints"}>PRINTS</Link></li>
                    <li><Link className="link" to={"/featuredcat/Pillows"}>PILLOWS</Link></li>
                    <li><Link className="link" to={"/featuredcat/Embroidery"}>EMBROIDERY</Link></li>
                    <li><Link className="link" to={"/featuredcat/Wallpaper"}>WALLPAPER</Link></li>
                    <li><Link className="link" to={"/featuredcat/Curtains"}>CURTAINS</Link></li>
                </ul>
            </div>
            </div>
        )
    }
}

export default Nav;