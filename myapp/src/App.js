import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Account from './Account.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import ArtistSignUp from './ArtistSignUp.js';
import ArtistProfile from './ArtistProfile.js';
import Cart from './Cart.js';
import ItemDetail from './ItemDetail.js';
import CreateListing from './CreateListing.js'; 
import RoomView from './RoomView.js'; 


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
