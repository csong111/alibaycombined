import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class UserAccountButton extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    bring = (event) => {
      event.preventDefault();
      this.props.history.push("/useraccount/"+this.props.userID)
    }
  render() {
    return (
      <div className="">
        <button onClick={this.bring}>UserAccountButton</button>
      </div>
    );
  }
}

let userAccountB = withRouter(UserAccountButton);
export default userAccountB;
