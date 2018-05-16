import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class ArtistAccountButton extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
  render() {
    return (
      <div className="">
        <button onClick={this.handleClick}>ArtistAccountButton</button>
      </div>
    );
  }
}


export default ArtistAccountButton;
