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
            artistName:"",
            orders: [],
            previousOrders: false
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
            console.log("E",e)
            
            this.setState({orders :e})

            if(e.cartItems.length>=1){
        //        let itemIDs = e.cartItems.map(item=>{return item.itemID})
       //         this.getOrderItemNames(itemIDs)
                this.setState({  previousOrders:true})
            }
            else this.setState({previousOrders:false})
        })
    }
    
    seeArtistAcct = () => {

        this.props.history.push("/artistaccount/"+this.state.artistName)
    }

    // getOrderItemNames = async orders=>{  
    //   //  console.log(orders)  
    //     let ordersWithName = await Promise.all(orders.map(async order => {
    //         let itemNames = await this.getItemNames(order)
    //         return {...order, itemNames}
    //     }))
    //  //   console.log(ordersWithName)
    //     this.setState({orders: ordersWithName})
    //    }
    
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
            console.log("STATE ORDERS",this.state.orders.cartItems)

            let renderOrders = (
         //   }
       //let renderOrders = this.state.orders.map((order, id )=>{
                <div  style={{display: "flex"}}>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {this.state.orders._id}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {this.state.orders.firstName}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                    {this.state.orders.map((item, id)=><li key={id}>{item.name}</li>)}
                 {/* {order.name.map((itemName,id) => <li key={id}>{itemName}</li>)} */}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {this.state.orders.total}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {this.state.orders.date}
                    </div>
                    <div style={{width:"100px",height:"50px", border:"1px solid black"}}>
                {this.state.orders.fulfilled}
                    </div>
                </div>
            )
        
        return (
          <div className="ArtistProf">
              <NavButton />
              <HomeButton />
              <ArtistAccountButton/>
              <h1>Your order history</h1>
              {!this.state.previousOrders ?
               <div className="failedAccount">No previous orders</div> :
              <div><div>{renderTitle}</div>
              <div>{renderOrders}</div></div>}
          </div>
        );
      }
}

let Content = withRouter(Orders)
export default Content;