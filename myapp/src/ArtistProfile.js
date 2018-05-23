import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import Item from "./page-elements.js/Item.js";
import "./App.css";

class ArtistProfile extends Component {
  constructor() {
    super();
    this.state = {
      loaded : false ,
      artistName: "",
      bio: "",
      location: "",
      profPicURL: "",
      items: [],
      igData: []
    };
  }
  componentDidMount() {
    //console.log(this.props.userID)
    var body = {
      artistName: this.props.artistName
    };
    //console.log("getArtistProfile-1",body)
    fetch("/getArtistProfile", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        let artistName = parsed.artistName;
        let bio = parsed.bio;
        let location = parsed.location;
        let profPicURL = parsed.profPicURL;
        this.setState({
          artistName: artistName,
          bio: bio,
          location: location,
          profPicURL: profPicURL
        });
      });

    fetch("/getArtistItems?artistName=" + this.props.artistName, {
      method: "GET"
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        //console.log(parsed)
        this.setState({ items: parsed, loaded: true });
      });
  
  


    fetch("/checkToken", {
      method: "POST",
      body: JSON.stringify({artistName: this.props.artistName })
    }).then(res=>res.text())
      .then(resB=> {

        if (resB){
        let parsed = JSON.parse(resB)
        if (parsed.success !== false || parsed.success === undefined) {
          parsed = {
            success: parsed.success,
            ...JSON.parse(parsed.RESB)
          };

        let IGData = parsed.data;
        let imgInfo = IGData.map(item=>{
          return item.images;
        })
        let imgItems=imgInfo.map(item=>{
          return item.thumbnail;
        })
        let imgURLs=imgItems.map(item=>{
          return item.url;
        })
        let imgLinks= IGData.map(item=>{
          return item.link
        })
        //console.log("HELLO", imgLinks)
        this.setState({imgURLs: imgURLs, imgLinks: imgLinks})
      }}})
  }

  renderIGPhotos = () => {
    if (!this.state.imgURLs) return null;
    return this.state.imgURLs.map((imgURL, id) => {
      return <div className="col-6 col-lg-2 col-md-3 col-sm-4 col-xs-6 noPad space">
      <img src={imgURL} onClick={()=>{this.openInNewTab(this.state.imgLinks[id], window.innerWidth/2, window.innerHeight/1.5)}}></img>
      </div>
    })
  }
  openInNewTab = (url, w, h) => {
      var left = (window.screen.width - w) / 2;
      var top = (window.screen.height - h) / 4;  
      var win = window.open(url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  
    win.focus();
  }

  render() {

  
    let accountInfo = () => {
      return (
        <div>
          <h4>Name: {this.state.artistName}</h4>
          <h4>Location: {this.state.location}</h4>
          <h4 className="restrictWidth">{this.state.bio}</h4>
        </div>
      );
    };
    let itemsRendered = this.state.items.map((el, id) => {
      return (
        <div className="col-6 col-md-4 col-lg-3 noPad space" key={id}>
          <Item
            itemID={el._id}
            name={el.name}
            price={el.price}
            artistName={el.artistName}
            img1={el.img1}
          />
        </div>
      );
    });
    if(this.state.loaded === true){
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
              {this.props.email  ? <UserAccountButton userID={this.props.userID} /> : null}
              {this.props.artistID ? <ArtistAccountButton artistID={this.props.artistID} />: null}
              <span className="hideLogin">{this.props.email || this.props.artistID ? <LogOutButton />: null}</span>
              {!this.props.email && !this.props.artistID ? <ConnectButton /> : null}
              {this.props.email ? <CartButton userID={this.props.userID} counter={this.props.counter} /> : null}
            </div>
          </div>
  
          <div className="searchMobile space">
            <SearchBar />
          </div>  
          <div className="artistProfile space">
            <img className="profileImage" src={this.state.profPicURL} />
            <span className="spaceLeft accountInfo">{accountInfo()}</span>
          </div>
          <div className="space" />
          <div className="space" />
          <h4>Other items by this artist:</h4>
          <div className="row">
          {itemsRendered}
          </div>
          <div className="space" />
          {this.state.imgLinks ? <h2>{this.state.artistName.toUpperCase()}'S INSTAGRAM FEED</h2> : null}
          <div className="row">
          {this.renderIGPhotos()}
          </div>
        </div>
      );
    }else{
      return (<div></div>)
    }
  }
}

export default ArtistProfile;
