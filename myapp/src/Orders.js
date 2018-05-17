import React, { Component } from 'react';
import NavButton from './page-elements.js/nav-button.js';
import ArtistAccount from './ArtistAccount.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'

import './App.css';

class Orders extends Component {
    constructor() {
        super();
        this.state={
            artistName:"caro",
            orders: [
                { orderID: "#123782", buyerName: "Joe", itemID: ['123457','123458'], total: 100, date: "May 15, 2018", fulfilled: "fulfilled" },
                { orderID: "#1237866", buyerName: "Joe", itemID: ['1479','123458'], total: 600, date: "May 10, 2018", fulfilled: "unfulfilled" }
            ]
        }
    }

    //fetch getOrders. returns an array or Order objects
    //get the artist name
    componentDidMount = () =>{

    }
    

    seeArtistAcct = () => {

        this.props.history.push("/artistaccount/"+this.state.artistName)
    }

    //getItem details from the array of itemID's that were bought
    getNumberOfItems = () => {
        this.state.orders.map((order)=>{
            order.itemID.length()
        })
    }
    
    render() {

        let renderTitle = (()=>{
            return (
                <div style={{display: "flex"}}>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                Order #
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                Buyer
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                Items
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                Total
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                Date
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                Fulfilled
                    </div>
                </div>
            )
        })()

        let renderOrders = this.state.orders.map((order, id )=>{
            return (
                <div key={id} style={{display: "flex"}}>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {order.orderID}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {order.buyerName}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                 {order.itemID.length}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {order.total}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {order.date}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {order.fulfilled}
                    </div>
                </div>
            )
        })
        return (
          <div className="ArtistProf">
              <NavButton />
              <HomeButton />
              <ArtistAccountButton/>
              <h1>PREVIOUS ORDERS</h1>
              <div>{renderTitle}</div>
              <div>{renderOrders}</div>
          </div>
        );
      }
}

let Content = withRouter(Orders)
export default Content;