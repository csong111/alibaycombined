import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import Home from './Home.js'; 
import Nav from './Nav.js'; 
import FeaturedCat from './FeaturedCat.js';  
import SearchResults from './SearchResults.js';  
import Cart from './Cart.js';
import ItemDetail from './ItemDetail.js';
import UserAccount from './UserAccount.js';
import ArtistProfile from './ArtistProfile.js';
import ArtistAccount from './ArtistAccount.js';
import Orders from './Orders.js';
import CreateListing from './CreateListing.js';
import ConnectUser from './ConnectUser.js';
import ConnectArtist from './ConnectArtist.js';
import ArtistSignUpComplete from './ArtistSignUpComplete.js';
import UserSignUpComplete from './UserSignUpComplete.js';
import EditListing from './EditListing.js';
import CheckoutComplete from './CheckoutComplete.js';
// import ItemsBought from './ItemsBought.js';
import ViewPrintsInRoom from './ViewPrintsInRoom.js';
import ViewPillowsInRoom from './ViewPillowsInRoom.js';
import IgCallback from './IgCallback.js';

class App extends Component {
  constructor() {
    super();
    this.state={
      artistID:"",
      artistName: "",
      email: "",
      userID: "",
      firstName: "",
      cartItems: []
    }
  }
  getCart = () => {
    var body = {
      userID : this.state.userID
    }
    fetch("/getCart", {
      method: "POST",
      body : JSON.stringify(body)
    })
    .then(e => e.text())
    .then(e => {
      //console.log("HEY JORDAN", e)
      let parsed=JSON.parse(e)
      //this.setState({cartItems: parsed});
      this.setCartItems(parsed)
      //console.log(this.state.cartItems)  
    })
  }
  loginArtist = (e, n) => {
  //  console.log(e)
    this.setState({artistID : e, artistName: n})
  }
  loginUser = (e, id, name) => {
    this.setState({email: e, userID: id, firstName: name})
    this.getCart();
  }
  setCartItems = (items) => {
    //console.log(items)
    this.setState({cartItems: items})
    //console.log(this.state.cartItems)
  }

  renderIgCallback = (routeProps) => {
    //window.localStorage.setItem("artistID", this.state.artistID)
    //console.log("ROUTEPROPS", routeProps)
    const token = routeProps.location.hash;
    //console.log("ARTIST ID", this.state.artistID)
    //console.log(token)
    return <IgCallback setLoggedIn={this.setLoggedIn} history={routeProps.history} artistID={this.state.artistID} token={token} isLoggedIn={!!this.state.artistID} />; 
  }

  setLoggedIn = (artistID) => {
    this.setState({artistID: artistID})
  }


  render() {
    //console.log(this.state)
    return (
      
      <div className="App">
        <BrowserRouter>
          <div>
            <Route
              exact={true}
              path="/"
              render={()=>{return(<Home counter={this.state.cartItems.length} artistID={this.state.artistID} email={this.state.email} userID={this.state.userID} />)}}
            />
            <Route
              exact={true}
              path="/nav"
              render={()=>{return(<Nav artistName={this.state.artistName} email={this.state.email} />)}}
            />
            <Route
              exact={true}
              path="/featuredcat/:cat"
              render={(routerData)=>{return(<FeaturedCat counter={this.state.cartItems.length} cat={routerData.match.params.cat} artistID={this.state.artistID} artistName={this.state.artistName} email={this.state.email} />)}}
            />
            <Route
              exact={true}
              path="/cart/:userID"
              render={(routerData)=>{return(<Cart counter={this.state.cartItems.length} setCartItems ={this.setCartItems} artistName={this.state.artistName} email={this.state.email} userID={routerData.match.params.userID}/>)}}
            />
            <Route
              exact={true}
              path="/searchresults/:query"
              render={(routerData)=>{return(<SearchResults artistID={this.state.artistID} userID={this.state.userID} counter={this.state.cartItems.length} query={routerData.match.params.query} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/itemdetail/:itemID"
              render={(routerData)=>{return(<ItemDetail getCart={this.getCart} counter={this.state.cartItems.length} artistName={this.state.artistName} artistID={this.state.artistID} userID={this.state.userID} email={this.state.email} itemID={routerData.match.params.itemID}/>)}}
            />
            <Route
              exact={true}
              path="/useraccount/:userID"
              render={(routerData)=>{return(<UserAccount history={routerData.history} isLoggedIn={!!this.state.userID} counter={this.state.cartItems.length} email={this.state.email} userID={routerData.match.params.userID}/>)}}
            />
            <Route
              exact={true}
              path="/artistprofile/:artistName"
              render={(routerData)=>{return(<ArtistProfile counter={this.state.cartItems.length} artistName={routerData.match.params.artistName} artistID={this.state.artistID} userID={this.state.userID} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/artistaccount/:artistID"
              render={(routerData)=>{return(<ArtistAccount history={routerData.history} isLoggedIn={!!this.state.artistID} artistName={this.state.artistName} artistID={routerData.match.params.artistID} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/orders/:artistID"
              render={(routerData)=>{return(<Orders counter={this.state.cartItems.length} artistID={routerData.match.params.artistID} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/createlisting/:artistID"
              render={(routerData)=>{return(<CreateListing counter={this.state.cartItems.length} artistID = {routerData.match.params.artistID} artistName={routerData.location.state} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/editlisting/:itemID"
              render={(routerData)=>{return(<EditListing counter={this.state.cartItems.length} itemID={routerData.match.params.itemID} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/connectuser"
              render={()=>{return(<ConnectUser counter={this.state.cartItems.length} loginUser={this.loginUser} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/usersignupcomplete"
              render={()=>{return(<UserSignUpComplete counter={this.state.cartItems.length} loginUser={this.loginUser} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/connectartist"
              render={()=>{return(<ConnectArtist counter={this.state.cartItems.length} loginArtist={this.loginArtist} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/artistsignupcomplete"
              render={()=>{return(<ArtistSignUpComplete counter={this.state.cartItems.length} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/checkoutcomplete/:orderNumber"
              render={(routerData)=>{return(<CheckoutComplete counter={this.state.cartItems.length} cartItems={routerData.location.state} transactionID={routerData.match.params.orderNumber} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/viewprintsinroom/"
              render={()=>{return(<ViewPrintsInRoom artistID={this.state.artistID} userID={this.state.userID}/>)}}
            />
            <Route
              exact={true}
              path="/viewpillowsinroom/"
              render={()=>{return(<ViewPillowsInRoom artistID={this.state.artistID} userID={this.state.userID}/>)}}
            />
            <Route
              exact={false}
              path="/ig-callback/foobar/"
              render={this.renderIgCallback}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
