import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class Item extends Component {
  render() {
    return (
      <div className="card">
      <div>
        <Link to={"/details/" + this.props.itemID}> 
          <img className="images" src={'/' + this.props.image} alt="null" />
        </Link>
          <div className ="itemName">{this.props.name}</div>
          <div className="price">${this.props.price}</div>
      </div>
      </div>
          )
        }
      }
      
export default Item;