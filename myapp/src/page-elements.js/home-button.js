import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class HomeButton extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    bring = (event) => {
      event.preventDefault();
      this.props.history.push("/")
    }
  render() {
    return (
      <div>
        <button className="noButton" onClick={this.bring}><img className="logoSmaller" width="160px" src='/ui-elements/logo.png'/></button>
      </div>
    );
  }
}

let homeB =withRouter(HomeButton);
export default homeB;