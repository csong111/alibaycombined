import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import '../App.css';

class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            query: ""
        }
    }

    handleSubmit = () => {
      //
      this.props.history.push("/searchresults/"+this.state.query)
    }

  render() {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={(e)=>this.setState({query: e.target.value})}/>
            <input type="submit"/>
        </form>
      </div>
    );
  }
}

let Content = withRouter(SearchBar)
export default Content;