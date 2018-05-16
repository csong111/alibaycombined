import React, { Component } from 'react';
import NavButton from './page-elements.js/nav-button.js';
import ArtistAccount from './ArtistAccount.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'

import './App.css';

class Orders extends Component {
    constructor() {
        super();
        this.state={
            orders: [
                { orderID: "#123782", buyerName: "Joe", itemID: ['123457','123458'], total: 100, date: "May 15, 2018", fulfilled: false },
            ]
        }
    }

    seeArtistAcct = (artistName) => {
    return (<ArtistAccount/>);
    }
    
    render() {
        return (
          <div className="ArtistProf">
            <h1>ORDERS</h1>
              <NavButton />
              <button onClick={this.seeArtistAcct}>Your artist account</button>
          </div>
        );
      }
}

export default Orders;