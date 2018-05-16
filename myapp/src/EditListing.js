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
      imageURL: 'image.jpg'
    }
  }
  
  handleSubmit = () => {

  }
  render() {
      return (
        <div className="App">
          <h1>EDIT LISTING</h1>
            <NavButton />
            <ArtistAccountButton/>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Name"/>
              <input type="text" placeholder="Price"/>
              <input type="text" placeholder="A little blurb about the art"/>
              <input type="text" placeholder="Quantity"/>
              <select>
                <option value="Prints">Prints</option>
                <option value="Pillows">Pillows</option>
                <option value="Embroidery">Embroidery</option>
                <option value="Wallpaper">Wallpaper</option>
                <option value="Curtains">Curtains</option>
              </select>
              <input type="file"/>
            </form>
        </div>
      );
    }
  }
  
  export default EditListing;