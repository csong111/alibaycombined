import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import '../App.css';

class UserAccountButton extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
  render() {
    return (
      <div className="">
        <button onClick={this.handleClick}>UserAccountButton</button>
      </div>
    );
  }
}


export default UserAccountButton;
