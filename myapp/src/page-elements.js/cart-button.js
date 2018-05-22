import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class CartButton extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    goToCart = (event) => {
      event.preventDefault();
      this.props.history.push("/cart/"+this.props.userID);
    }
  render() {
    return (
      <div>
        <button className="noButton flex" onClick={this.goToCart}>
        <img width="25px" src='/ui-elements/cart.png' />
        <div className="counter">{this.props.counter}</div>
        </button>

      </div>
    );
  }
}

let cartB=withRouter(CartButton);
export default cartB;
