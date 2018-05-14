import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ArtistSignUp extends Component {
    constructor () {
        super();
        this.state={
            nameInput: "",
            emailInput: "",
            passInput: "",
            artistInput: "",
            cityInput: ""
        }
    }

    handleCity = (event) => {
        this.setState({cityInput: event.target.value});
    }

    handleArtist = (event) => {
        this.setState({artistInput: event.target.value});
    }

    handlePass = (event) => {
        this.setState({passInput: event.target.value});
    }

    handleEmail = (event) => {
        this.setState({emailInput: event.target.value});
    }

    handleName = (event) => {
        this.setState({nameInput: event.target.value});
    }

    uploadFile = (event) => {

    }

    handleSubmit = (event) => {
        event.preventDefault();

    }

    render() {
      return (
        <div className="ArtistSign">
        <h1>I'M AN ARTIST</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Referral code"/>
                <div>OR</div>
                <input type="text" onChange={this.handleName} value={this.state.nameInput} placeholder="Name" required/>
                <input type="text" onChange={this.handleEmail} value={this.state.emailInput} placeholder="name@email.com" required/>
                <input type="text" onChange={this.handlePass} value={this.state.passInput} placeholder="Password" required/>
                <input type="text" onChange={this.handleArtist} value={this.state.artistInput} placeholder="Artist Description" required/>
                <input type="text" onChange={this.handleCity} value={this.state.cityInput} placeholder="City, Country" required/>
                <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Art" required/>
                <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Art" required/>
                <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Art" required/>
                <input type="submit"/>
            </form>
        </div>
      );
    }
  }
  
  export default ArtistSignUp;