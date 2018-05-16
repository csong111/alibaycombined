import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavButton from './page-elements.js/nav-button.js';
import ArtistAccount from './ArtistAccount.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'

class EditListing extends Component {
  constructor() {
    super();
    this.state={
      artistName: "aisha",
      name: 'print',
      price: 100,
      cat: "Prints",
      blurb: "cool print",
      quantity: 1,
      imageURL: 'image.jpg',
      itemID: 1333
    }
  }
  seeArtistAcct = () => {
    return (<ArtistAccount/>)
  }

  handleSubmit = () => {
    this.props.history.push("/itemdetails/"+this.state.itemID)

  }
  render() {
      return (
        <div className="App">
            <NavButton />
            <h1>LOGO</h1>
            <h1>EDIT LISTING</h1>
            <button onClick={this.seeArtistAcct}>Your artist account</button>
            <form onSubmit={this.handleSubmit}>
              <input type="text" onChange={(e)=>{this.setState({name:e.target.value})}} value={this.state.name} placeholder="Name" required/>
              <input type="text" onChange={(e)=>{this.setState({price:e.target.value})}} value={this.state.price} placeholder="Price" required/>
              <input type="text" onChange={(e)=>{this.setState({blurb:e.target.value})}} value={this.state.blurb} placeholder="A little blurb about the item" required/>
              <input type="text" onChange={(e)=>{this.setState({quantity:e.target.value})}} value={this.state.quantity} placeholder="Name" required/>
              <select onChange={(e)=>{this.setState({category:e.target.value})}} value={this.state.category} placeholder="Category" required>
                <option value="Prints">Prints</option>
                <option value="Pillows">Pillows</option>
                <option value="Embroidery">Embroidery</option>
                <option value="Wallpaper">Wallpaper</option>
                <option value="Curtains">Curtains</option>
              </select>
              <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Item Image" />
                    <p>{this.state.imageURL1}</p>
              <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Item Image" />
                    <p>{this.state.imageURL2}</p>
              <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Item Image" />
                    <p>{this.state.imageURL3}</p>
              <input type="submit"/>
            </form>
        </div>
      );
    }
  }
  
  let Content = withRouter(EditListing)
  export default Content;