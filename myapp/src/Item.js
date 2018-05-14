import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Item extends Component {
  render() {
    return (
      <div className="card">
      <div>
        <Link to={"/details/" + this.props.itemID}> 
          <img className="images" src={'/' + this.props.image} alt="null" linkto/>
        </Link>
          <div className ="itemName">{this.props.name}</div>
          <div className="price">${this.props.price}</div>
        {this.props.removeBtn?  
        <button
          name={this.props.itemID}
          className="removeButton"
          onClick={this.props.removeCart}
        >
          REMOVE FROM CART
        </button> : null}
        {this.props.deleteBtn? 
          <button name={this.props.itemID}
          className="deleteButton"
          onClick={this.props.deleteListing}
          >DELETE ITEM
          </button>: null}
      </div>
      </div>
          )
        }
      }
      
export default Item;