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

  componentDidMount = () => {
    console.log(this.props.itemID)
    fetch("/getItemDetails?itemID="+this.props.itemID, {
      method: 'GET',
    }).then(res=>res.text())
      .then(resB=>{
        let parsed=JSON.parse(resB);
        //console.log(parsed)
        let itemID=parsed._id;
        let artistName=parsed.artistName;
        let blurb=parsed.blurb;
        let category=parsed.category;
        let img1=parsed.img1;
        let img2=parsed.img2;
        let img3=parsed.img3;
        let name=parsed.name;
        let price=parsed.price;
        let quantity=parsed.quantity;
        this.setState({itemID: itemID, artistName: artistName, blurb: blurb, category: category, img1: img1, img2: img2, img3: img3,
          name: name, price: price, quantity: quantity})
    })
  }


  //fetch editListings
  handleSubmit = (event) => {
    event.preventDefault()

    let bod = JSON.stringify(this.state)

    fetch("/editListing",{ method:"POST", body : bod})
    .then(e=>e.text())
    .then(e=>JSON.parse(e))
    .then(e=> {
      if(e.success) this.props.history.push("/itemdetail/"+ this.state.itemID)
    });
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
              Category: <select onChange={(e)=>{this.setState({category:e.target.value})}} value={this.state.category} placeholder="Category" >
                <option value="Prints">Prints</option>
                <option value="Pillows">Pillows</option>
                <option value="Embroidery">Embroidery</option>
                <option value="Wallpaper">Wallpaper</option>
                <option value="Curtains">Curtains</option>
              </select>
              Upload up to 3 images:
              <br/>
              <input id="createListingImg1" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0],"img1")} placeholder="Upload Item Image" />
              {this.state.img1 !=="" ? <img src={this.state.img1}/> : null}
              <img onClick={()=>{document.getElementById("createListingImg1").click()}} src="/items/addimage.png" height="50px" width="50px"/>
              <br/>
              <input id="createListingImg2" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0],"img2")} placeholder="Upload Item Image" />
              {this.state.img2 !=="" ? <img src={this.state.img2}/> : null}
              <img onClick={()=>{document.getElementById("createListingImg2").click()}} src="/items/addimage.png" height="50px" width="50px"/>
              <br/>
              <input id="createListingImg3" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0],"img3")} placeholder="Upload Item Image" />
              {this.state.img3 !=="" ? <img src={this.state.img3}/> : null}
              <img onClick={()=>{document.getElementById("createListingImg3").click()}} src="/items/addimage.png" height="50px" width="50px"/>
              <br/>
              <input type="submit"/>
            </form>
        </div>
      );
    }
  }
  
  let Content = withRouter(EditListing)
  export default Content;