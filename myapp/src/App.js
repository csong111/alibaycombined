import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';
// import Account from './Account.js';
// import SignIn from './SignIn.js';
// import SignUp from './SignUp.js';
//import ItemsBought from './ItemsBought.js';
// import ArtistSignUp from './ArtistSignUp.js';
// import ArtistProfile from './ArtistProfile.js';
// import CreateListing from './CreateListing.js'; 
// import RoomView from './RoomView.js'; 
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
      email: "jen@asd.com",
      userID: "jen",
    }
  }
  loginArtist = (e) => {
    this.setState({artistName : e})
  }
  loginUser = (e, id) => {
    this.setState({email: e, userID: id})
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
             exact={true}
             path="/searchresults/:query"
             render={(routerData)=>{return(<SearchResults query={routerData.match.params.query} artistName={this.state.artistName} email={this.state.email}/>)}}
           />
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
              render={()=>{return(<ArtistProfile artistName={this.state.artistName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/artistaccount/:artistName"
              render={()=>{return(<ArtistAccount artistName={this.state.artistName} email={this.state.email}/>)}}
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

/*
            <Route
              exact={true}
              path="/"
              render={()=>{return(<Cart />)}}
            />
            <Route
              exact={true}
              path="/"
              render={()=>{return(<ArtistProfile />)}}
            />
            <Route
              exact={true}
              path="/"
              render={()=>{return(<ArtistSignUp />)}}
            />
            <Route
              exact={true}
              path="/"
              render={()=>{return(<CreateListing />)}}
            />
            <Route
              exact={true}
              path="/"
              render={()=>{return(<Item />)}}
            />
            <Route
              exact={true}
              path="/"
              render={()=>{return(<ItemDetail />)}}
            />

            <Route
              exact={true}
              path="/"
              render={()=>{return(<RoomView />)}}
            />
            <Route
              exact={true}
              path="/"
              render={()=>{return(<Search />)}}
            />
            <Route
              exact={true}
              path="/"
              render={()=>{return(<SignIn />)}}
            />
            <Route
              exact={true}
              path="/"
              render={()=>{return(<SignUp />)}}
            />
             <Route
              exact={true}
              path="/"
              render={()=>{return(<ItemsBought />)}}
            /> 


            */

export default App;
