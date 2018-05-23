import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import UserAccount from "./UserAccount.js";
import Item from "./page-elements.js/Item.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      featuredCat: [
        { name: "Featured Items", imageURL: "collections/1.jpg" },
        { name: "Popular", imageURL: "collections/2.jpg" },
        { name: "Spring", imageURL: "collections/3.jpg" }
      ],
      randomItems: [],
      query: ""
    };
  }

  componentDidMount() {
    fetch("/getRandomItems", {
      method: 'GET'
    }).then(res=>res.text())
      .then(resB=>{
        let parsed=JSON.parse(resB);
        this.setState({randomItems: parsed})
        //console.log(this.state.randomItems[0].artistName)
      })

  }

  render() {

    var itemsRendered = this.state.randomItems.map((el, id) => {
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
            {this.props.email ? <UserAccountButton userID={this.props.userID} />: null}
            {this.props.artistID ? <ArtistAccountButton artistID={this.props.artistID} /> : null}
            <span className="hideLogin">{this.props.email || this.props.artistID ? <LogOutButton />: null}</span>
            {!this.props.email && !this.props.artistID ? <ConnectButton /> : null}
            {this.props.email ? <CartButton userID = {this.props.userID} counter={this.props.counter}  /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}

        
        <div>
          <div name="mainBanner" className="mainBanner row">
            <div className="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad space">
              <Link to={"/featuredcat/" + this.state.featuredCat[0].name}>
                <img width="100%" src={this.state.featuredCat[0].imageURL} />
              </Link>
              <h6 className="center">{this.state.featuredCat[0].name.toUpperCase()}</h6>
            </div>
          </div>

          <div name="smallerBanners" className="row">
            <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad space">
              <Link to={"/featuredcat/" + this.state.featuredCat[1].name}>
                <img width="100%" src={this.state.featuredCat[1].imageURL} />
              </Link>
              <h6 className="center">{this.state.featuredCat[1].name.toUpperCase()}</h6>
            </div>
            <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad space">
              <Link to={"/featuredcat/" + this.state.featuredCat[2].name}>
                <img width="100%" src={this.state.featuredCat[2].imageURL} />
              </Link>
              <h6 className="center">{this.state.featuredCat[2].name.toUpperCase()}</h6>
            </div>
          </div>

        <div name="items" className="row">
          {/* HOW TO DO COLUMNS */}
          {/* <div className="col-2" style={{backgroundColor:"grey"}}>
          </div>
          <div className="col-10">
            <div className="row"> */}
          {itemsRendered}
        </div>
      </div>
      </div>
      // </div>
    );
  }
}

export default Home;
