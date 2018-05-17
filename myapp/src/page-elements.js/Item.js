import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class Item extends Component {
  render() {
    // console.log(this.props.location.pathname)
    // console.log(this.props.location.pathname.split('/')[1])
    return (
      <div className="card">
      <div>
        <Link to={"/itemdetail/" + this.props.itemID}> 
          <img className="images" src={'/' + this.props.image} alt="null" />
        </Link>
          <div className ="itemName">{this.props.name}</div>
          <div className="price">${this.props.price}</div>
          {this.props.location.pathname.split('/')[1] === "artistaccount" ? <Link to = {"/editlisting/" + this.props.itemID}>Edit Item</Link> : null}
      </div>
      </div>
          )
        }
      }
    

      let Content = withRouter(Item)
      export default Content;
      