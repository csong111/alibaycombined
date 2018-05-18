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
      <div className = "searchElement">
        <form onSubmit={this.handleSubmit}>
            <input className="searchInput" type="text" onChange={(e)=>this.setState({query: e.target.value})} required/>
            <button className="noButton"><img src='search.png' width="20px"/></button>
        </form>
      </div>
    );
  }
}

let Content = withRouter(SearchBar)
export default Content;