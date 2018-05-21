import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import ArtistAccount from "./ArtistAccount.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import UserAccount from "./UserAccount.js";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import Item from "./page-elements.js/Item.js"

class ViewInRoom extends Component {
  constructor() {
    super();
    this.state = {
      img1: "",
      img2: "",
      img3: "",
      itemsInCat: [],
    };
  }

  componentDidMount = () => {
    fetch("/getCatItems?cat="+"Prints", {
      method: 'GET'
    }).then(res=>res.text())
      .then(resB=>{
        let parsed=JSON.parse(resB)
        console.log(parsed)
        this.setState({itemsInCat: parsed})
      })
  };


  //Fetch create listing.
  handleSubmit = event => {
    event.preventDefault();
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

  showInRoom = (img) => {
    this.setState({img2: img})
  }

  render() {
    var itemsRendered = this.state.itemsInCat.map((el,id)=>{
      return (
        <div className="col-6 col-md-4 col-lg-3 noPad space" key={id}>
        
        <Item itemID = {el._id} name = {el.name} price = {el.price} artistName = {el.artistName} img1 = {el.img1} />
        <button onClick={() => this.showInRoom(el.img1)}>SHOW IN ROOM</button>
        </div>
      )
    })

    return (
      <div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}
        <div className="headerElements sticky">
          <NavButton />

          <div className="logo">
            <HomeButton />
          </div>

          <div className="search">
            <SearchBar />
          </div>

          <div className="flex">
            {this.props.email ? (
              <UserAccountButton userID={this.props.userID} />
            ) : null}
            {this.props.artistID ? (
              <ArtistAccountButton artistID={this.props.artistID} />
            ) : null}
            {!this.props.email && !this.props.artistID ? (
              <ConnectButton />
            ) : null}
            {this.props.email ? (
              <CartButton userID={this.props.userID} />
            ) : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>

        {/* NAV !!!!!!!!!!!!!!!!!!*/}

        <div>
          <h2 className="catName">VIEW IN ROOM</h2>
          <form>
            <img className="img2" width="200px" src={this.state.img2} />
            {this.state.img1 ? <img width="700px" src={this.state.img1}/> : <img width="700px" src="room/test.jpg" /> }


            {/* HIDDEN!!!!!!!! */}

            <input
              id="createListingImg1"
              style={{ display: "none" }}
              type="file"
              onChange={event => this.uploadFile(event.target.files[0], "img1")}
              placeholder="Upload Item Image"
            />

            <input
              id="createListingImg2"
              style={{ display: "none" }}
              type="file"
              onChange={event => this.uploadFile(event.target.files[0], "img2")}
              placeholder="Upload Item Image"
            />

            {/* ///////////// */}

            <br />
            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                document.getElementById("createListingImg1").click();
              }}
            >
              BACKGROUND IMAGE
            </button>

            <button
              type="button"
              className="button noPad connect"
              onClick={() => {
                document.getElementById("createListingImg2").click();
              }}
            >
              UPLOAD ITEM IMAGE
            </button>


          </form>
          <div name="cat-items" className="row">
          {itemsRendered}
        </div>
        </div>
      </div>
    );
  }
}

let Content = withRouter(ViewInRoom);
export default Content;
