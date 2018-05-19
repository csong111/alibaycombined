import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavButton from './page-elements.js/nav-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import ArtistAccount from './ArtistAccount.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'

class EditListing extends Component {
  constructor() {
    super();
    this.state={
      artistName: "",
      name: '',
      price: undefined,
      cat: "",
      blurb: "",
      quantity: undefined,
      imageURL1: '',
      imageURL2: '',
      imageURL3: '',
      itemID: undefined
    }
  }
  // seeArtistAcct = () => {
  //   return (<ArtistAccount/>)
  // }

  //fetch editListings
  handleSubmit = (event) => {
    event.preventDefault()
    let body = {
      itemID: this.state.itemID,
      artistName: this.state.artistName,
      name: this.state.name,
      price: this.state.price,
      cat: this.state.cat,
      blurb: this.state.blurb,
      quantity: this.state.quantity,
      img1: this.state.img1,
      img2: this.state.img2,
      img3: this.state.img3,
    }
    fetch("/editListing",{method:"POST",body:JSON.stringify(body)})
    .then(e=>e.text())
    .then(e=>JSON.parse(e))
    .then(e=>{
      return e 
    })  
    .then(e=>this.props.history.push("/itemdetail/"+e.itemID))    
  }

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
  
  render() {
      return (
        <div className="App">
            <NavButton />
            <HomeButton/>

            <h1>EDIT LISTING</h1>

            <form onSubmit={this.handleSubmit}>
             Item Name: <input type="text" onChange={(e)=>{this.setState({name:e.target.value})}} value={this.state.name} placeholder="Name" /><br/>
             Item Price: <input type="text" onChange={(e)=>{this.setState({price:e.target.value})}} value={this.state.price} placeholder="Price" /><br/>
             Item Description: <textarea rows="4" cols="50" onChange={(e)=>{this.setState({blurb:e.target.value})}} value={this.state.blurb} placeholder="A little blurb about the item" /><br/>
             Quantity Available: <input type="text" onChange={(e)=>{this.setState({quantity:e.target.value})}} value={this.state.quantity} placeholder="Quantity Available" /><br/>
              Category: <select onChange={(e)=>{this.setState({category:e.target.value})}} value={this.state.category} placeholder="Category" ><br/>
                <option value="Prints">Prints</option>
                <option value="Pillows">Pillows</option>
                <option value="Embroidery">Embroidery</option>
                <option value="Wallpaper">Wallpaper</option>
                <option value="Curtains">Curtains</option>
              </select><br/>
             Upload up to 3 images: <br/>
             <input id="editListingImg1" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Item Image" />
              {this.state.imageURL1 !=="" ? <img src={this.state.imageURL1}/> : <img onClick={()=>{document.getElementById("editListingImg1").click()}} src="/items/addimage.png" height="50px" width="50px"/>}
              <br/>
              <input id="editListingImg2" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Item Image" />
              {this.state.imageURL2 !=="" ? <img src={this.state.imageURL2}/> : <img onClick={()=>{document.getElementById("editListingImg2").click()}} src="/items/addimage.png" height="50px" width="50px"/>}
              <br/>
              <input id="editListingImg3" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Item Image" />
              {this.state.imageURL3 !=="" ? <img src={this.state.imageURL3}/> : <img onClick={()=>{document.getElementById("editListingImg3").click()}} src="/items/addimage.png" height="50px" width="50px"/>}
              <br/>
              <input type="submit"/>
            </form>
        </div>
      );
    }
  }
  
  let Content = withRouter(EditListing)
  export default Content;