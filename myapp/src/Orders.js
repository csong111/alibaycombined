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
                { orderID: "#123782", buyerName: "Joe", itemID: ['123457','123458'], total: 100, date: "May 15, 2018", fulfilled: "fulfilled", itemNames:[] },
                { orderID: "#1237866", buyerName: "Joe", itemID: ['1479','123458'], total: 600, date: "May 10, 2018", fulfilled: "unfulfilled", itemNames:[] }
            ],
        }
    }

    //fetch getOrders. returns an array or Order objects
    //get the artist name
    componentDidMount = () =>{
        let body = {
            artistName : this.props.artistName
        }
        console.log("getOrders-1",body)
        fetch("/getOrders",{
            method:"POST",
            body : JSON.stringify(body)
        })
        .then(e =>e.text())
        .then (e =>JSON.parse(e))
        .then(e=>{console.log("getOrders-4", e);return e})
        .then(e =>{
            // this.setState({orders :e.orders})
            this.getOrderItemNames(e.orders)

        })
    }
    

    seeArtistAcct = () => {

        this.props.history.push("/artistaccount/"+this.state.artistName)
    }

    getItemNames = async order=>{  
        let itemNames = await Promise.all(
                 order.itemID.map(id => 
                 fetch("/getItemDetails?itemID=" + id, { method: "GET" })
                 .then(e => e.text())
                 .then(e =>JSON.parse(e))
                 .then(e=>{
                    return e.name
                 })
             ));
        console.log(itemNames)
        return itemNames
       }

    getOrderItemNames = async orders=>{  
        console.log(orders)  
        let ordersWithName = await Promise.all(orders.map(async order => {
            let itemNames = await this.getItemNames(order)
            return {...order, itemNames}
        }))
        console.log(ordersWithName)
        this.setState({orders: ordersWithName})
       }
    
    render() {
    
        let renderTitle = (
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
                 {order.itemNames.map((itemName,id) => <li key={id}>{itemName}</li>)}
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
              <h1>Your order history</h1>
              <div>{renderTitle}</div>
              <div>{renderOrders}</div>
          </div>
        );
      }
}

let Content = withRouter(Orders)
export default Content;