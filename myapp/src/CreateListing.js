import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import ArtistAccount from "./ArtistAccount.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";

class CreateListing extends Component {
  constructor() {
    super();
    this.state={
      artistID: "",
      artistName: "",
      name: "",
      price: undefined,
      category: "",
      blurb: "",
      quantity: undefined,
      img1: "",
      img2: "",
      img3: ""
    };
  }

  componentDidMount = () => {
    console.log(this.props)
    this.setState({artistID: this.props.artistID, artistName: this.props.artistName.name})
  }

  seeArtistAcct = () => {
    return <ArtistAccount />;
  };

  //Fetch create listing.
  handleSubmit = event => {
    event.preventDefault();
    let body = {
      artistID: this.state.artistID,
      artistName: this.state.artistName,
      name: this.state.name,
      price: this.state.price,
      category: this.state.category,
      blurb: this.state.blurb,
      quantity: this.state.quantity,
      img1: this.state.img1,
      img2: this.state.img2,
      img3: this.state.img3,
    }
    //console.log("createListing-1",body)
    fetch("/createListing",{method:"POST",body:JSON.stringify(body)})
    .then(e=>e.text())
    .then(e=>JSON.parse(e))
    .then(e=>{
   //   console.log("createListing-4",e);
      return e 
    })  
    .then(e=>this.props.history.push("/itemdetail/"+e.itemID))    
  }

  uploadFile = (x, stateName) => {
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

  back = event => {
    event.preventDefault();
    window.history.back();
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <button className="closeButton noPad noButton" onClick={this.back}>
          <img src="/ui-elements/close.png" width="20px" />
        </button>
        <button className="userButtonClick buttonText bold">CREATE LISTING</button>
        {/* <div className="space" />
        <h2>CREATE LISTING</h2> */}
        <div className="form">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
              <input
                className="formInput"
                type="text"
                onChange={e => {
                  this.setState({ name: e.target.value });
                }}
                value={this.state.name}
                placeholder="Item Name"
                required
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
              <input
                className="formInput"
                type="text"
                onChange={e => {
                  this.setState({ price: e.target.value });
                }}
                value={this.state.price}
                placeholder="Price"
                required
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
              <input
                className="formInput"
                type="text"
                onChange={e => {
                  this.setState({ quantity: e.target.value });
                }}
                value={this.state.quantity}
                placeholder="Quantity Available"
                required
              />
            </div>
          </div>
          <br />
          <textarea
            className="textAreaInput"
            rows="4"
            cols="50"
            onChange={e => {
              this.setState({ blurb: e.target.value });
            }}
            value={this.state.blurb}
            placeholder="A little blurb about the item"
            required
          />
          <div className="space" />
          <span className="inputText">Category:{" "}</span>
          <select
            className="selectpicker inputText"
            onChange={e => {
              console.log(e.target.value)
              this.setState({ category: e.target.value });
            }}
            value={this.state.category}
            placeholder="Category"
            required
          >
            <option className="option">Prints</option>
            <option>Pillows</option>
            <option>Embroidery</option>
            <option>Wallpaper</option>
            <option>Curtains</option>
          </select>
          <div className="space" />
          <span className="inputText">Upload up to 3 images:</span>
             <br />

          <input
            id="createListingImg1"
            style={{ display: "none" }}
            type="file"
            onChange={event => this.uploadFile(event.target.files[0], "img1")}
            placeholder="Upload Item Image"
          />
          <img width="100px" src={this.state.img1} />
          <br />
          <button
            type="button"
            className="button noPad connect"
            onClick={() => {
              document.getElementById("createListingImg1").click();
            }}
            // src="/items/addimage.png"
            // height="50px"
            // width="50px"
          >
            UPLOAD ITEM IMAGE 1
          </button>
          
          <br />
          <input
            id="createListingImg2"
            style={{ display: "none" }}
            type="file"
            onChange={event => this.uploadFile(event.target.files[0], "img2")}
            placeholder="Upload Item Image"
          />
          <img width="100px" src={this.state.img2} />
          <br />
          <button
            type="button"
            className="button noPad connect"
            onClick={() => {
              document.getElementById("createListingImg2").click();
            }}
            // src="/items/addimage.png"
            // height="50px"
            // width="50px"
          >
          UPLOAD ITEM IMAGE 2
          </button>
          <br />
          <input
            id="createListingImg3"
            style={{ display: "none" }}
            type="file"
            onChange={event => this.uploadFile(event.target.files[0], "img3")}
            placeholder="Upload Item Image"
          />
            <img width="100px" src={this.state.img3} />
            <br />
            <button
            type="button"
            className="button noPad connect"
              onClick={() => {
                document.getElementById("createListingImg3").click();
              }}
              // src="/items/addimage.png"
              // height="50px"
              // width="50px"
            >
            UPLOAD ITEM IMAGE 3
            </button>
          <div className="space" />
          <input className="submitButton" type="submit" value="" />
        </form>
      </div>
      </div>
    );
  }
}

let Content = withRouter(CreateListing);
export default Content;
