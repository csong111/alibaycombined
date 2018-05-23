import React, { Component } from 'react';
import NavButton from './page-elements.js/nav-button.js';
import ArtistAccount from './ArtistAccount.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import LogOutButton from "./page-elements.js/logout-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
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

    componentDidMount = () =>{
        console.log("artist name" ,this.props.artistName)
        let body = {
            artistName : this.props.artistName
        }
//console.log("getOrders-1",body)
        fetch("/getOrders",{
            method:"POST",
            body : JSON.stringify(body)
        })
        .then(e =>e.text())
        .then (e =>JSON.parse(e))
        // .then(e=>{console.log("getOrders-4", e);return e})
        .then(e =>{
            
            this.setState({orders :e})

            if(e.length>=1){
                this.setState({  previousOrders:true})
            }
            else this.setState({previousOrders:false})
        })
    }
    
    seeArtistAcct = () => {

        this.props.history.push("/artistaccount/"+this.state.artistName)
    }
    
    render() {
    
        let renderTitle = (
            <div className="row">
                    <div className = " col-2 col-md-6 col-lg-2 noPad space">
                Order #
                    </div>
                    <div className = "col-2 col-md-6 col-lg-2 noPad space">
                Buyer
                    </div>
                    <div className = "col-2 col-md-6 col-lg-2 noPad space">
                Items
                    </div>
                    <div className = "col-2 col-md-6 col-lg-2 noPad space">
                Date
                    </div>
                    <div className = "col-2 col-md-6 col-lg-2 noPad space">
                Fulfilled
                    </div>
                    {/* </div> */}
                </div>
            )
      
    let renderOrders = this.state.orders.map((order, id )=>{
        return (

            <div className="row">
            <div className = " ordersTableData col-2 col-md-6 col-lg-2 noPad space">
            {order._id}<br/>
                </div>
                <div className = "col-2 col-md-6 col-lg-2 noPad space">
            {order.firstName}<br/>
                </div>
                <div className = "col-2 col-md-6 col-lg-2 noPad space">
             {order.cartItems.map((item,id) => <li key={id} className="ordersTableItemNames">{item.name}<br/></li>)}
                </div>
                <div className = "col-2 col-md-6 col-lg-2 noPad space">
            {order.date}<br/>
                </div>
                <div className = "col-2 col-md-6 col-lg-2 noPad space">
            fulfilled<br/>
                </div>
            </div>
        )
    })

        return (
          <div className="ArtistProf">\

{/*           
              <NavButton />
              <HomeButton />
              <ArtistAccountButton/>
              <LogOutButton/> */}

        {/* NAV !!!!!!!!!!!!!!!!!!*/}
        <div className="headerElements sticky">
          <NavButton />

          <div className="logo">
            <HomeButton />
          </div>

          <div className="search">
            <SearchBar />
          </div>

          <div className="flex moveOver">
            {this.props.artistID ? (
              <ArtistAccountButton artistID={this.props.artistID} />
            ) : null}
            <span className="hideLogin">{this.props.artistID ? <LogOutButton /> : null}</span>
            {!this.props.artistID ? <ConnectButton /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}



              <h2 className="catName">ITEMS SOLD</h2>
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