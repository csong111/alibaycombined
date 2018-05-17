import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import Item from "./page-elements.js/Item.js"
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class ArtistAccount extends Component {
    constructor() {
      super();
      this.state= {
        edit: false,
        artistName: "caro",
        artistNameInput: "",
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
      this.initData()
    }

    initData = () => {
      //FETCH get artist info endpoint: getArtistDetails
    }

    // JACQUES'S CODE UPLOAD PICTURE
      //FETCH change profile endpoint: uploadProfilePic

    uploadFile = x => {
        // let filename = x.name;
        // let fileExtension = filename.split(".").pop();
        // this.setState({ imageInputName: x.name });
        // fetch("/uploadPic?ext=" + fileExtension, {
        //   method: "POST",
        //   body: x
        // })
        //   .then(response => response.text())
        //   .then(response => this.setState({ imageInput: response }))
        //   .then(() => this.state.imageInput);
    };


    createListing = (artistName) => {
      this.props.history.push("/createListing/")
    }
    seeOrders = () => {
      this.props.history.push("/orders/" + this.state.artistName)
    }
    editInfo = () => {
      this.setState({edit: true})
    }

    saveInfo = (event) => {
      //FETCH endpoint: updateArtistAccount then =>
        this.initData()
    }

    handleArtistNameChange = (event) => {
      this.setState({ artistName: event.target.value })
    }

    handleLocationChange = (event) => {
      this.setState({ location: event.target.value })
    }

    handleBioChange = (event) => {
      this.setState({ bio: event.target.value })
    }

    render() {
      let itemsRendered = this.state.items.map((el,id)=>{
        return (
          <Item key={id} itemID = {el.itemID} name = {el.name} price = {el.price} artistName = {el.artistName} imageURL = {el.imageURL} />
        )
      })

      let accountInfo = (() => {
        if (this.state.edit === false) {
          return (<div>
            <p>Name: {this.state.artistName}</p>
            <p>Location: {this.state.location}</p>
            <p>{this.state.bio}</p>
            <button onClick = {this.editInfo}>Edit Info</button>
            </div>)
        } else {return (<form>
          <input type="text" value={this.state.artistName} onChange={this.handleArtistNameChange}></input><br />
          <input type="text" value={this.state.location} onChange={this.handleLocationChange}></input><br />
          <textarea value={this.state.bio} onChange={this.handleBioChange}></textarea><br />
          <button onClick = {this.saveInfo}>Save Info</button>
        </form>)
        }
      })()
      
        return (
          <div className="ArtistProf">
              <NavButton />
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
