import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import Item from "./page-elements.js/Item.js"
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class ArtistAccount extends Component {
    constructor() {
      super();
      this.state= {
        edit: false,
        artistName: "caro",
        bio: "I'm a cool artist",
        location: "Montreal, Canada",
        imageURL: "mypic.jpg",
        items: [
              { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
              { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb:"Best pillow ever!", quantity: 2 },
          ]

    }
  }

    componentDidMount () {
      //FETCH get artist info endpoint: getArtistDetails
      //FETCH change profile endpoint: uploadProfilePic
    }

    createListing = (artistName) => {
      this.props.history.push("/createListing/")
    }
    seeOrders = () => {
      this.props.history.push("/orders/" + this.state.artistName)
    }
    editInfo = () => {
      //FETCH endpoint: updateArtistAccount
    }


    handleArtistNameChange = (event) => {
      this.setState({ artistName: event.target.value })
    }

    render() {
      let itemsRendered = this.state.items.map((el,id)=>{
        return (
          <Item itemID = {el.itemID} name = {el.name} price = {el.price} artistName = {el.artistName} imageURL = {el.imageURL} />
        )
      })

      let accountInfo = (() => {
        if (this.state.edit === false) {
          return (<div>
            <p>Name: {this.state.artistName}</p>
            <p>Location: {this.state.location}</p>
            <p>{this.state.bio}</p>
            </div>)
        } else {return (<form>
          <input type="text" value={this.state.artistName} onChange={this.handleArtistNameChange}></input>
        </form>)
        }
      })()
      
        return (
          <div className="ArtistProf">
              <NavButton />
              <HomeButton />

              {this.props.aName === "" ? null : <ArtistAccountButton />}

              <h2>MY ACCOUNT</h2>
              <input id="changeProfile" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0])} />
              {this.state.imageURL !== "" ? <img src={this.state.imageURL}/> : 
              <img src="/items/addimage.png" height="50px" width="50px"/>
              }
              <br/>
              <input value="Change Profile Pic" type="submit" onClick={()=>{document.getElementById("changeProfile").click()}}/>

              <div>
              {accountInfo}
              </div>

              <button onClick = {this.editInfo}>Edit Info</button>

              <h2>ORDERS</h2>
              <button onClick = {this.seeOrders}>See Orders</button>

              <h2>MY ITEMS</h2>
              <div name="items">
              {itemsRendered}
              </div>
              <button onClick = {this.createListing}>Create Listing</button>
              
          </div>
        );
      }
    }
    

let Content = withRouter(ArtistAccount)
export default Content;
