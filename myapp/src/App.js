import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';
// import Account from './Account.js';
// import SignIn from './SignIn.js';
// import SignUp from './SignUp.js';
// import ItemsBought from './ItemsBought.js';
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route
              exact={true}
              path="/"
              render={()=>{return(<Home />)}}
            />
            <Route
              exact={true}
              path="/nav"
              render={()=>{return(<Nav />)}}
            />
            <Route
              exact={true}
              path="/featuredcat/:cat"
              render={()=>{return(<FeaturedCat />)}}
            />
            <Route
              exact={true}
              path="/cart/:userId"
              render={()=>{return(<SearchResults />)}}
            />
            <Route
              exact={true}
              path="/searchresults/:query"
              render={()=>{return(<SearchResults />)}}
            />
            <Route
              exact={true}
              path="/itemdetail/:itemId"
              render={()=>{return(<ItemDetail />)}}
            />
            <Route
              exact={true}
              path="/useraccount/:userId"
              render={()=>{return(<UserAccount />)}}
            />
            <Route
              exact={true}
              path="/artistprofile/:artistName"
              render={()=>{return(<ArtistProfile />)}}
            />
            <Route
              exact={true}
              path="/artistaccount/:artistName"
              render={()=>{return(<ArtistAccount />)}}
            />
            <Route
              exact={true}
              path="/orders/:artistName"
              render={()=>{return(<Orders />)}}
            />
            <Route
              exact={true}
              path="/createlisting/:artistName"
              render={()=>{return(<CreateListing />)}}
            />
            <Route
              exact={true}
              path="/editlisting/:artistName"
              render={()=>{return(<EditListing />)}}
            />
            <Route
              exact={true}
              path="/connectuser"
              render={()=>{return(<ConnectUser />)}}
            />
            <Route
              exact={true}
              path="/connectartist"
              render={()=>{return(<ConnectArtist />)}}
            />
            <Route
              exact={true}
              path="/artistsignupcomplete"
              render={()=>{return(<ArtistSignUpComplete />)}}
            />
            <Route
              exact={true}
              path="/checkoutcomplete"
              render={()=>{return(<CheckoutComplete />)}}
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
