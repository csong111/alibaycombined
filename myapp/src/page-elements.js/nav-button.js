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
      event.preventDefault();
      this.props.history.push("/nav")
    }
  render() {
    return (
      <div className="">
        <button onClick={this.bring}>NavButton</button>
      </div>
    );
  }
}

let navB=withRouter(NavButton);
export default navB;