import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import './App.css';

class ConnectUser extends Component {
    constructor () {
        super();
        this.state={
            //LOGIN
            emailLogin: 'jen@email.com',
            passwordLogin: '123456',

            //SIGN UP
            firstName: 'jen',
            lastName: 'o',
            emailSignUp: 'jen@email.com',
            passwordSignUp: '123456',
            passwordSignUpConf: '123456'
        }
    }
   
    
    render () {
        return (
            <div>
                <h1>CONNECT USER</h1>
            </div>
        )
    }
}

export default ConnectUser;