import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import UserAccountButton from './page-elements.js/user-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';

class Item extends Component {
  render() {
    return (
      <div className="card">
        <NavButton />
        {this.state.userID === "" ? null : <UserAccountButton />}
        {this.state.userID === "" ? null : <CartButton />}
      </div>
          )
        }
      }
      
export default Item;