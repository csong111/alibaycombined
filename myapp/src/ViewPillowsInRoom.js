import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavButton from "./page-elements.js/nav-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import ArtistAccount from "./ArtistAccount.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import UserAccount from "./UserAccount.js";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import Item from "./page-elements.js/Item.js";

class ViewPillowsInRoom extends Component {
  constructor() {
    super();
    this.state = {
      img1: "",
      img2: "",
      img3: "",
      itemsInCat: [],
      canMove: false,
      imgX: 360,
      imgY: 170,
    };
  }

  componentDidMount = () => {
    fetch("/getCatItems?cat=" + "Pillows", {
      method: "GET"
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        this.setState({ itemsInCat: parsed });
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

  showInRoom = img => {
    this.setState({ img2: img });
  };

  moveImage = e => {
    var dx = e.clientX - this.state.iniX;
    var dy = e.clientY - this.state.iniY;

    function offset(el) {
      var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    var in_ = document.getElementById("moveImg");
    var out_ = document.getElementById("outImg");

    var inx = offset(in_).left
    var iny = offset(in_).top
    var inX = inx + in_.clientWidth;
    var inY = iny + in_.clientHeight;


    var outx = offset(out_).left
    var outy = offset(out_).top
    var outX = outx + out_.clientWidth;
    var outY = outy + out_.clientHeight;


    if(
      inx+dx < outx ||
      iny+dy < outy ||
      inX+dx > outX ||
      inY+dy > outY
    ){
      this.setState({canMove : false})
    }else{
      this.setState({
        iniX: e.clientX,
        iniY: e.clientY,
        imgX: this.state.imgX + dx,
        imgY: this.state.imgY + dy
      });
    }
  };

  // setInnerDiv = () => {
  //   if(this.state.img2){
  //     var in_ = document.getElementById("moveImg");
  //     let y = in_.clientHeight 
  //     let x = in_.clientWidth 
  //   } 
  // }

  render() {

    var fullSize = {
      width: "200px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      resize: "both",
      overflow: "auto",
      border: "10px solid black 0",
    };

    var itemsRendered = this.state.itemsInCat.map((el, id) => {
      if (el.cutout) {
        return (
          <div className="col-6 col-md-3 col-lg-3 noPad space" key={id}>
            <div className="center">
              <Item
                itemID={el._id}
                name={el.name}
                price={el.price}
                artistName={el.artistName}
                img1={el.img1}
              />
              <button
                className="centerContent button noPad connect"
                onClick={() => this.showInRoom(el.cutout)}
              >
                SHOW IN ROOM
              </button>
            </div>
          </div>
        );
      } else return null;
    });

    var moveImg = this.state.img2 ?
     this.state.canMove === false ? (
      <div
        className="img2"
        id="moveImg"
        onMouseDown={e => {
          // console.log("AAAA")
          this.setState({
            canMove: true,
            iniX: e.clientX,
            iniY: e.clientY
          });
        }}
        onMouseUp={e => {
          this.setState({
            canMove: false,
            iniX: e.clientX,
            iniY: e.clientY
          });
        }}
        style={{
          ...fullSize,
          backgroundImage: "url(" + this.state.img2 + ")",
          top: this.state.imgY,
          left: this.state.imgX
        }}
      >
      <img src={this.state.img2} style={{visibility: "hidden",width: "200px"}} /></div>
    ) : (
      <div
        className="img2"
        id="moveImg"
        onMouseMove={this.moveImage}
        onMouseUp={e => {
          this.setState({
            canMove: false,
            iniX: e.clientX,
            iniY: e.clientY
          });
        }}
        style={{
          backgroundImage: "url(" + this.state.img2 + ")",
          ...fullSize,
          top: this.state.imgY,
          left: this.state.imgX
        }}
      >
      <img src={this.state.img2} style={{visibility: "hidden",width: "200px"}} />
      </div>
    ) : null



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

          <div className="flex moveOver">
            {this.props.email ? (
              <UserAccountButton userID={this.props.userID} />
            ) : null}
            {this.props.artistID ? (
              <ArtistAccountButton artistID={this.props.artistID} />
            ) : null}
            {this.props.email || this.props.artistID ? <LogOutButton />: null}
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

          {this.state.img1 ? (
          <div style={{
            width: "800px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundSize: "800px auto",
            backgroundImage: "url(" + this.state.img1  + ")",
          }}
            // onMouseMove={this.setInnerDiv}
          >
            <img id="outImg" width="800px" src={this.state.img1} style={{visibility:"hidden"}} />
            {moveImg}
          </div>
          ) : (
          <div style={{
            width: "800px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundSize: "800px auto",
            backgroundImage: "url(" + "room/couch.jpg"  + ")",
          }}
            // onMouseMove={this.setInnerDiv}
          >
            <img id="outImg" width="800px" src="room/couch.jpg" style={{visibility:"hidden"}} />
            {moveImg}
          </div>
          )}

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


          <button
            type="button"
            className="button noPad connect"
            onClick={() => {
              document.getElementById("createListingImg1").click();
            }}
          >
            CHANGE BACKGROUND IMAGE
          </button>
          <div className="space" />
          <div className="row">{itemsRendered}</div>
        </div>
      </div>
    );
  }
}

let Content = withRouter(ViewPillowsInRoom);
export default Content;
