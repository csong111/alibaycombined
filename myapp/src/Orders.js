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
                { orderID: "#123782", buyerName: "Joe", itemID: ['123457','123458'], total: 100, date: "May 15, 2018", fulfilled: "fulfilled" },
                { orderID: "#1237866", buyerName: "Joe", itemID: ['1479','123458'], total: 600, date: "May 10, 2018", fulfilled: "unfulfilled" }
            ]
        }
    }

    

    seeArtistAcct = (artistName) => {
    return (<ArtistAccount/>);
    }

    //getItem details from teh items that were bought
    getItemDetails = () => {

    }
    
    render() {

        let renderOrders = this.state.orders.map((order, id )=>{
            return (
                <li key={id}>
                Order #: {order.orderID}<br/>
                Buyer: {order.buyerName}<br/>
                Items: {this.getItemDetails}<br/>
                Total: {order.total}<br/>
                Date: {order.date}<br/>
                Fulfilled: {order.fulfilled}<br/>
                </li>
            )
        })
        return (
          <div className="ArtistProf">
              <NavButton />
              <button onClick={this.seeArtistAcct}>Your artist account</button>
              <h1>PREVIOUS ORDERS</h1>
              <ul>{renderOrders}</ul>
          </div>
        );
      }
}

export default Orders;