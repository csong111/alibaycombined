import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import '../App.css';

class CartButton extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
  render() {
    return (
      <div className="">
        <button>CartButton</button>
      </div>
    );
  }
}


export default CartButton;
