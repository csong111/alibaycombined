import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import ConnectArtist from '../ConnectArtist.js';
import ConnectUser from '../ConnectUser.js';

import '../App.css';

class ConnectButton extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    bring = (event) => {
        event.preventDefault();
        this.props.history.push("/connectuser")
    }

  render = () => {
    return (
      <div>
        <button className="noButton" onClick={this.bring}>
        {/* <img src='../connect.png' width="30px"/> */}
        <div className="connect">
        {/* <img width="100px" src='/ui-elements/connect.png'/> */}
        <span className ="accountMobile bold">SIGN IN</span> <span className = "line"> | </span> <span className ="accountMobile bold">SIGN UP</span>
        </div>
        </button>
      </div>
    );
  }
}

let CButton=withRouter(ConnectButton);

export default CButton;