import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class Item extends Component {
  render() {
    // console.log(this.props.location.pathname)
    // console.log(this.props.location.pathname.split('/')[1])
    return (
      <div>
      <div className="center">
        <Link to={"/itemdetail/" + this.props.itemID}> 
          <img width ="100%"src={this.props.img1} alt="null" />
        </Link>
          <div className="spaceSmaller" />
          <div className="bold">
          <p>{this.props.name}</p>
          <p>${this.props.price}</p>
          <p>by <Link className="a" to={"/artistprofile/" + this.props.artistName}>{this.props.artistName}</Link></p>
          {this.props.location.pathname.split('/')[1] === "artistaccount" ? <Link to = {"/editlisting/" + this.props.itemID}><button className="button noPad connect">EDIT ITEM</button></Link> : null}
          </div>
      </div>
      </div>
          )
        }
      }
    

      let Content = withRouter(Item)
      export default Content;
      