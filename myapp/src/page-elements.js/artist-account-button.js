import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class ArtistAccountButton extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    handleClick = (event) => {
        event.preventDefault();
        this.props.history.push("/artistaccount/"+this.props.artistID)
    }
  render() {
    return (
      <div>
        <button className="noButton" onClick={this.handleClick}>
        {/* <img width="30px" src='../artistacct.png' className="icon"/> */}
        <div className="connect">
          <span className="bold">MY ACCOUNT</span>
          </div>
        </button>
      </div>
    );
  }
}
let artistAcct=withRouter(ArtistAccountButton);

export default artistAcct;
