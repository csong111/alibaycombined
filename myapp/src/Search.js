import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './App.css';
import Item from "./Item.js";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: undefined,
      searchItems: []
    }
  }

handleSearchChange = (event) => {
  this.setState({ searchInput: event.target.value })
}

handleSearchSubmit = (event) => {
  event.preventDefault();
  fetch('/searchForListings?searchTerm=' + this.state.searchInput, { method: 'GET'})
  .then(response => response.text())
  .then(responseBody=> {
    let parsed = JSON.parse(responseBody);
    let itemIDs = parsed.itemIDs
    this.setState({searchItems: itemIDs})
    this.setSearchItems(this.state.searchItems)})
}

setSearchItems = async itemIDs => {
  let responses = await Promise.all(
    itemIDs.map(itemID =>
    fetch("getItemDetails?itemID="+ itemID, {method:'GET'}).then(res =>res.json())
  )
  )
  let itemObjects = responses.map((res, i)=>({ ...res.details, itemID: itemIDs[i]}))
  this.props.setSearchItemIDs(itemObjects)
  this.setState({searchInput: ""})

}



render() {
  return (
    <div className="search">
      <form onSubmit={this.handleSearchSubmit}>
        <div>
        <input className="searchInput" type="text" value={this.state.searchInput} onChange={this.handleSearchChange}></input>
        <input className="searchButton" type="submit" value=""></input>
        </div>
      </form>
      </div>
    )
  }
}

export default Search;