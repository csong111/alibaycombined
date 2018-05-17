import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavButton from './page-elements.js/nav-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import ArtistAccount from './ArtistAccount.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'

class CreateListing extends Component {
  constructor() {
    super();
    this.state={
      artistName: "aisha",
      name: 'print',
      price: 100,
      cat: "Prints",
      blurb: "cool print",
      quantity: 1,
      imageURL1: '/items/aisha.jpg',
      imageURL2: '/items/pillow.jpg',
      imageURL3: '',
    }
  }

  seeArtistAcct = () => {
    return (<ArtistAccount/>)
  }
  
  //Fetch create listing. 
  handleSubmit = (event) => {
    event.preventDefault()
    let body = {
      artistName: this.state.artistName,
      name: this.state.name,
      price: this.state.price,
      cat: this.state.cat,
      blurb: this.state.blurb,
      quantity: this.state.quantity,
      imageURL1: this.state.imageURL1,
      imageURL2: this.state.imageURL2,
      imageURL3: this.state.imageURL3,
    }
    console.log("createListing-1",body)
    fetch("/createListing",{method:"POST",body:JSON.stringify(body)})
    .then(e=>e.text())
    .then(e=>JSON.parse(e))
    .then(e=>{
      console.log("createListing-4",e);
      return e 
    })  
    .then(e=>this.props.history.push("/itemdetail/"+e.itemID))    
  }

  uploadFile = (x,stateName) => {
    let filename = x.name;
    let fileExtension = filename.split(".").pop();
    this.setState({ imageInputName: x.name });
    fetch("/uploadPicItem?ext=" + fileExtension, {
      method: "POST",
      body: x
    })
    .then(response => response.text())
    .then(response => this.setState({ [stateName]: response }))
    .then(() => this.state.imageInput);
  };

  render() {
    console.log(this.state)
      return (
        <div className="App">
            <NavButton />
            <HomeButton/>
            <h1>Create Listing</h1>
            <button onClick={this.seeArtistAcct}>Your artist account</button>
            <form onSubmit={this.handleSubmit}>
            Item Name: <input type="text" onChange={(e)=>{this.setState({name:e.target.value})}} value={this.state.name} placeholder="Name" required/><br/>
            Item Price: <input type="text" onChange={(e)=>{this.setState({price:e.target.value})}} value={this.state.price} placeholder="Price" required/><br/>
            Item Description: <textarea rows="4" cols="50" onChange={(e)=>{this.setState({blurb:e.target.value})}} value={this.state.blurb} placeholder="A little blurb about the item" required/><br/>
            Quantity Available: <input type="text" onChange={(e)=>{this.setState({quantity:e.target.value})}} value={this.state.quantity} placeholder="Quantity Available" required/><br/>
            Category: <select onChange={(e)=>{this.setState({category:e.target.value})}} value={this.state.category} placeholder="Category" required>
                <option value="Prints">Prints</option>
                <option value="Pillows">Pillows</option>
                <option value="Embroidery">Embroidery</option>
                <option value="Wallpaper">Wallpaper</option>
                <option value="Curtains">Curtains</option>
              </select><br/>
             Upload up to 3 images: <br/>
              <input id="createListingImg1" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0],"imageURL1")} placeholder="Upload Item Image" />
              {this.state.imageURL1 !=="" ? <img src={this.state.imageURL1}/> : <img onClick={()=>{document.getElementById("createListingImg1").click()}} src="/items/addimage.png" height="50px" width="50px"/>}
              <br/>
              <input id="createListingImg2" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0],"imageURL2")} placeholder="Upload Item Image" />
              {this.state.imageURL2 !=="" ? <img src={this.state.imageURL2}/> : <img onClick={()=>{document.getElementById("createListingImg2").click()}} src="/items/addimage.png" height="50px" width="50px"/>}
              <br/>
              <input id="createListingImg3" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0],"imageURL3")} placeholder="Upload Item Image" />
              {this.state.imageURL3 !=="" ? <img src={this.state.imageURL3}/> : <img onClick={()=>{document.getElementById("createListingImg3").click()}} src="/items/addimage.png" height="50px" width="50px"/>}
              <br/>
              <input type="submit"/>
            </form>
        </div>
      );
    }
  }
  
  let Content = withRouter(CreateListing)
  export default Content;