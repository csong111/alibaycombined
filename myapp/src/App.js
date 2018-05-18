import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
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
import ItemsBought from './ItemsBought.js';

class App extends Component {
  constructor() {
    super();
    this.state={

      artistName: "jen",
      email: "",
      userID: "",
    }
  }


  loginArtist = (e) => {
    this.setState({artistName : e})
  }
  loginUser = (e, id, name) => {
    this.setState({email: e, userID: id, firstName: name})
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
              render={()=>{return(<Home artistName={this.state.artistName} email={this.state.email} userID={this.state.userID} />)}}
            />
            <Route
              exact={true}
              path="/nav"
              render={()=>{return(<Nav artistName={this.state.artistName} email={this.state.email} />)}}
            />
            <Route
              exact={true}
              path="/featuredcat/:cat"
              render={()=>{return(<FeaturedCat artistName={this.state.artistName} email={this.state.email} />)}}
            />
            <Route
              exact={true}
              path="/cart/:userID"
              render={(routerData)=>{return(<Cart artistName={this.state.artistName} email={this.state.email} userID={routerData.match.params.userID}/>)}}
            />
            <Route
              exact={true}
              path="/itemsbought/:userID"
              render={(routerData)=>{return(<ItemsBought artistName={this.state.artistName} email={this.state.email} userID={routerData.match.params.userID}/>)}}
            />
            <Route
<<<<<<< HEAD
             exact={true}
             path="/searchresults/:query"
             render={(routerData)=>{return(<SearchResults query={routerData.match.params.query} artistName={this.state.artistName} email={this.state.email}/>)}}
           />
=======
              exact={true}
              path="/searchresults/:query"
              render={(routerData)=>{return(<SearchResults query={routerData.match.params.query} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
>>>>>>> aae9380e6c6296c756cb004de482040347de74eb
            <Route
              exact={true}
              path="/itemdetail/:itemID"
              render={(routerData)=>{return(<ItemDetail artistName={this.state.artistName} userID={this.state.userID} email={this.state.email} itemID={routerData.match.params.itemID}/>)}}
            />
            <Route
              exact={true}
              path="/useraccount/:userID"
              render={(routerData)=>{return(<UserAccount artistName={this.state.artistName} email={this.state.email} userID={routerData.match.params.userID}/>)}}
            />
            <Route
              exact={true}
              path="/artistprofile/:artistName"
              render={(routerData)=>{return(<ArtistProfile artistName={routerData.match.params.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/artistaccount/:artistName"
              render={(routerData)=>{return(<ArtistAccount artistName={routerData.match.params.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/orders/:artistName"
              render={()=>{return(<Orders artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/createlisting/"
              render={()=>{return(<CreateListing artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/editlisting/:itemID"
              render={()=>{return(<EditListing artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/connectuser"
              render={()=>{return(<ConnectUser loginUser={this.loginUser} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/usersignupcomplete"
              render={()=>{return(<UserSignUpComplete loginUser={this.loginUser} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/connectartist"
              render={()=>{return(<ConnectArtist loginArtist={this.loginArtist} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/artistsignupcomplete"
              render={()=>{return(<ArtistSignUpComplete artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/checkoutcomplete/:orderNumber"
              render={(routerData)=>{return(<CheckoutComplete cartItems={routerData.location.state}transactionID={routerData.match.params.orderNumber} artistName={this.state.artistName} email={this.state.email}/>)}}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
