import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
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
        { name: "Spring", imageURL: "collections/2.jpg" },
        { name: "Popular", imageURL: "collections/3.jpg" }
      ],
      randomItems: [
        // {
        //   itemID: "123456",
        //   name: "Spring Print",
        //   price: 50,
        //   artistName: "aisha",
        //   imageURL: "/items/43581461_041_b2.jpg",
        //   cat: "Spring",
        //   blurb: "Here's my spring print",
        //   quantity: 2
        // },
        // {
        //   itemID: "123457",
        //   name: "Awesome Embroidery",
        //   price: 100,
        //   artistName: "caro",
        //   imageURL: "/items/44313724_104_b.jpg",
        //   cat: "Spring",
        //   blurb: "Best embroidery ever!",
        //   quantity: 1
        // },
        // {
        //   itemID: "123458",
        //   name: "Pillow",
        //   price: 100,
        //   artistName: "caro",
        //   imageURL: "/items/44622173_045_b.jpg",
        //   cat: "Popular",
        //   blurb: "Check out my pillow",
        //   quantity: 1
        // },
        // {
        //   itemID: "123459",
        //   name: "Painting",
        //   price: 20,
        //   artistName: "jen",
        //   imageURL: "/items/45513033_045_b10.jpg",
        //   cat: "Prints",
        //   blurb: "This is a cool painting",
        //   quantity: 3
        // },
        // {
        //   itemID: "123450",
        //   name: "Cool Print",
        //   price: 30,
        //   artistName: "jen",
        //   imageURL: "/items/45589157_095_b.jpg",
        //   cat: "Prints",
        //   blurb: "Great print",
        //   quantity: 4
        // }
      ],
      query: ""
    };
  }

  componentDidMount() {
    fetch("/getRandomItems", {
      method: 'GET'
    }).then(res=>res.text())
      .then(resB=>{
        let parsed=JSON.parse(resB);
        console.log(parsed)
        this.setState({randomItems: parsed})
      })
    //FETCH get randomItems then setState the results endpoint: getRandomItems
  }

  render() {
    // let featuredCollection = this.state.featuredCat.map((el, id) => {
    //   return (
    //     <div key={id}>
    //       <Link to = {"/featuredcat/" + el.name}><img src = {el.imageURL} /></Link>
    //       <br />
    //       <p>{el.name}</p>
    //     </div>
    //   );
    // });

    console.log(this.state.randomItems)

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
        <div className="headerElements">
          <NavButton />

          <div className="logo">
            <HomeButton />
          </div>
          
          <div className="search">
            <SearchBar />
          </div>

          <div>
            {this.props.email !== "" ? <UserAccountButton userID={this.props.userID}  /> : null}
            {this.props.artistName !== "" ? <ArtistAccountButton artistName={this.props.artistName} /> : null}
            {this.props.email === "" && this.props.artistName === "" ? (
              <ConnectButton />
            ) : null}
            {this.props.email !== "" ? <CartButton userID = {this.props.userID}  /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>

        <div>
          <div name="mainBanner" className="row">
            <div className="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad space">
              <Link to={"/featuredcat/" + this.state.featuredCat[0].name}>
                <img width="100%" src={this.state.featuredCat[0].imageURL} />
              </Link>
              <p>{this.state.featuredCat[0].name}</p>
            </div>
          </div>

          <div name="smallerBanners" className="row">
            <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad space">
              <Link to={"/featuredcat/" + this.state.featuredCat[1].name}>
                <img width="100%" src={this.state.featuredCat[1].imageURL} />
              </Link>
              <p>{this.state.featuredCat[1].name}</p>
            </div>
            <div className="col-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 noPad space">
              <Link to={"/featuredcat/" + this.state.featuredCat[2].name}>
                <img width="100%" src={this.state.featuredCat[2].imageURL} />
              </Link>
              <p>{this.state.featuredCat[2].name}</p>
            </div>
          </div>


        {/* <NavButton />
        <HomeButton/>
        {this.props.email !== "" ? <UserAccountButton userID={this.props.userID} /> : null}
        {this.props.artistName !== "" ? <ArtistAccountButton artistName={this.props.artistName} /> : null}
        {this.props.email === "" && this.props.artistName === "" ? <ConnectButton /> : null}
        {this.props.email !== "" ? <CartButton userID = {this.props.userID} /> : null} */}


        {/* <SearchBar /> */}
        {/* <h2>Featured collection</h2> */}
        {/* <div name="categories">
            {featuredCollection}
        </div> */}
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
