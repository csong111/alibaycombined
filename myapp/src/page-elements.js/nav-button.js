import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class NavButton extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    bring = (event) => {
      // console.log("hey")
      event.preventDefault();
      this.props.history.push("/nav")
    }
  render() {
    return (
      <div>
        {/* <button className="noButton navIcon" onClick={this.bring}><img src='/ui-elements/nav.png' width="22px"/></button> */}
        <button className="navIcon" onClick={this.bring}></button>
      </div>
    );
  }
}

let navB=withRouter(NavButton);
export default navB;