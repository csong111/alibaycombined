import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class Item extends Component {
  render() {
    // console.log(this.props.location.pathname)
    // console.log(this.props.location.pathname.split('/')[1])
    return (
      <div>
      <div>
        <Link to={"/itemdetail/" + this.props.itemID}> 
          <img width ="100%"src={this.props.imageURL} alt="null" />
        </Link>
          <div className="bold"><p>{this.props.name}</p></div>
          <div><p>${this.props.price}</p></div>
          <div><p>by {this.props.artistName}</p></div>
          {this.props.location.pathname.split('/')[1] === "artistaccount" ? <Link to = {"/editlisting/" + this.props.itemID}>Edit Item</Link> : null}
      </div>
      </div>
          )
        }
      }
    

      let Content = withRouter(Item)
      export default Content;
      