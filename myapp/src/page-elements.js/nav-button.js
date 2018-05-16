import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class NavButton extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
  render() {
    return (
      <div className="">
        <button>NavButton</button>
      </div>
    );
  }
}


export default NavButton;