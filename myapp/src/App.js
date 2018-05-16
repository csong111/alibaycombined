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
  constructor() {
    super();
    this.state={
      aName: "aisha",
      email: ""
    }
  }
  loginArtist = (e) => {
    this.setState({aName : e})
  }
  loginUser = (e) => {
    this.setState({email : e})
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route
              exact={true}
              path="/"
              render={()=>{return(<Home aName={this.state.aName} email={this.state.email} />)}}
            />
            <Route
              exact={true}
              path="/nav"
              render={()=>{return(<Nav aName={this.state.aName} email={this.state.email} />)}}
            />
            <Route
              exact={true}
              path="/featuredcat/:cat"
              render={()=>{return(<FeaturedCat aName={this.state.aName} email={this.state.email} />)}}
            />
            <Route
              exact={true}
<<<<<<< HEAD
              path="/cart/:userID"
=======
              path="/cart/:userId"
>>>>>>> 905c0e0ea5a239058d5bbea2ace9047c701b636d
              render={()=>{return(<Cart aName={this.state.aName} email={this.state.email} />)}}
            />
            <Route
              exact={true}
              path="/searchresults/:query"
              render={()=>{return(<SearchResults aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/itemdetail/:itemID"
              render={()=>{return(<ItemDetail aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/useraccount/:userID"
              render={()=>{return(<UserAccount aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/artistprofile/:artistName"
              render={()=>{return(<ArtistProfile aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/artistaccount/:artistName"
              render={()=>{return(<ArtistAccount aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/orders/:artistName"
              render={()=>{return(<Orders aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/createlisting/:artistName"
              render={()=>{return(<CreateListing aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/editlisting/:artistName"
              render={()=>{return(<EditListing aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/connectuser"
              render={()=>{return(<ConnectUser loginUser={this.loginUser} aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/usersignupcomplete"
              render={()=>{return(<UserSignUpComplete loginUser={this.loginUser} aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/connectartist"
              render={()=>{return(<ConnectArtist loginArtist={this.loginArtist} aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/artistsignupcomplete"
              render={()=>{return(<ArtistSignUpComplete aName={this.state.aName} email={this.state.email}/>)}}
            />
            <Route
              exact={true}
              path="/checkoutcomplete:orderNumber"
              render={()=>{return(<CheckoutComplete aName={this.state.aName} email={this.state.email}/>)}}
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
