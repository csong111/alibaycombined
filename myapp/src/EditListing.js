import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import ArtistAccount from "./ArtistAccount.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import {Helmet} from 'react-helmet';

class EditListing extends Component {
  constructor() {
    super();
    this.state = {
      artistName: "",
      name: "",
      price: undefined,
      cat: "",
      blurb: "",
      quantity: undefined,
      imageURL1: "",
      imageURL2: "",
      imageURL3: "",
      cutout: "",
      itemID: undefined
    };
  }
  // seeArtistAcct = () => {
  //   return (<ArtistAccount/>)
  // }

  componentDidMount = () => {
    console.log(this.props.itemID);
    fetch("/getItemDetails?itemID=" + this.props.itemID, {
      method: "GET"
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        //console.log(parsed)
        let itemID = parsed._id;
        let artistName = parsed.artistName;
        let blurb = parsed.blurb;
        let category = parsed.category;
        let img1 = parsed.img1;
        let img2 = parsed.img2;
        let img3 = parsed.img3;
        let cutout = parsed.cutout;
        let name = parsed.name;
        let price = parsed.price;
        let quantity = parsed.quantity;
        this.setState({
          itemID: itemID,
          artistName: artistName,
          blurb: blurb,
          category: category,
          img1: img1,
          img2: img2,
          img3: img3,
          cutout: cutout,
          name: name,
          price: price,
          quantity: quantity
        });
      });
  };

  //fetch editListings
  handleSubmit = event => {
    event.preventDefault();

    let bod = JSON.stringify(this.state);

    fetch("/editListing", { method: "POST", body: bod })
      .then(e => e.text())
      .then(e => JSON.parse(e))
      .then(e => {
        if (e.success)
          this.props.history.push("/itemdetail/" + this.state.itemID);
      });
  };

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
    return (
      <div>
        <Helmet bodyAttributes={{style: 'background-color : #ffecdf'}}/>
        <button className="closeButton noPad noButton" onClick={this.back}>
          <img src="/ui-elements/close.png" width="20px" />
        </button>
        {/* <div className="space" /> */}
        <button className="userButtonClick buttonText bold">
          EDIT LISTING
        </button>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
                Item Name:
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                  value={this.state.name}
                  placeholder="Name"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
                Price:
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ price: e.target.value });
                  }}
                  value={this.state.price}
                  placeholder="Price"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 noPad formSpace">
                Quantity:
                <input
                  className="formInput"
                  type="text"
                  onChange={e => {
                    this.setState({ quantity: e.target.value });
                  }}
                  value={this.state.quantity}
                  placeholder="Quantity Available"
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
            />
            <div className="space" />
            Category:{" "}
            <select
              className="selectpicker inputText"
              onChange={e => {
                this.setState({ category: e.target.value });
              }}
              value={this.state.category}
              placeholder="Category"
            >
              <option value="Prints">Prints</option>
              <option value="Pillows">Pillows</option>
              <option value="Embroidery">Embroidery</option>
              <option value="Wallpaper">Wallpaper</option>
              <option value="Curtains">Curtains</option>
            </select>
            <div className="space" />
            Upload up to 3 images:
            <br />
            <input
              id="createListingImg1"
              style={{ display: "none" }}
              type="file"
              onChange={event => this.uploadFile(event.target.files[0], "img1")}
              placeholder="Upload Item Image"
            />
            <br />
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
              ADD/CHANGE IMAGE
            </button>
            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                this.setState({img1: ""})
              }}
            >
              REMOVE
            </button>
            <br />
            <img width="100px" src={this.state.img2} />
            <br />
            <input
              id="createListingImg2"
              style={{ display: "none" }}
              type="file"
              onChange={event => this.uploadFile(event.target.files[0], "img2")}
              placeholder="Upload Item Image"
            />
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
              ADD/CHANGE IMAGE
            </button>
            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                this.setState({img2: ""})
              }}
            >
              REMOVE
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
              ADD/CHANGE IMAGE
            </button>
            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                this.setState({img3: ""})
              }}
            >
              REMOVE
            </button>
            <div className="space" />
            Upload cutout image:
            <br />
            <input
              id="cutoutimg"
              style={{ display: "none" }}
              type="file"
              onChange={event =>
                this.uploadFile(event.target.files[0], "cutout")
              }
              placeholder="Upload Cutout Image"
            />
            <img width="100px" src={this.state.cutout} />
            <br />
            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                document.getElementById("cutoutimg").click();
              }}
              // src="/items/addimage.png"
              // height="50px"
              // width="50px"
            >
              ADD/CHANGE IMAGE
            </button>
            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                this.setState({cutout: ""})
              }}
            >
              REMOVE
            </button>
            <div className="space" />
            <input className="submitButton" type="submit" value="" />
          </form>
        </div>
      </div>
    );
  }
}

let Content = withRouter(EditListing);
export default Content;
