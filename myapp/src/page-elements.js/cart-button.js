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
        <button className="noButton" onClick={this.goToCart}><img width="25px" src='/ui-elements/cart.png' className="icon"/></button>
      </div>
    );
  }
}

let cartB=withRouter(CartButton);
export default cartB;
