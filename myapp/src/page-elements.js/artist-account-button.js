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
        this.props.history.push("/artistaccount/"+this.props.artistName)
    }
  render() {
    return (
      <div className="">
        <button className="noButton" onClick={this.handleClick}><img src='../artistacct.png' className="icon"/></button>
      </div>
    );
  }
}
let artistAcct=withRouter(ArtistAccountButton);

export default artistAcct;
