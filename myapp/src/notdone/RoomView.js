import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';

class RoomView extends Component {
    render() {
      return (
        <div className="App">
            <NavButton />
            {this.state.userID === "" ? null : <UserAccountButton userID={this.props.userID} />}
            {this.state.userID === "" ? null : <CartButton userID = {this.props.userID} />}
        </div>
      );
    }
  }
  
  export default RoomView;