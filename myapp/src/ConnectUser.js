import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class ConnectUser extends Component {
    constructor () {
        super();
        this.state={
            //LOGIN
            emailLogin: 'jen@email.com',
            passwordLogin: '123456',

            //SIGN UP
            firstName: 'jen',
            lastName: 'o',
            emailSignUp: 'jen@email.com',
            passwordSignUp: '123456',
            passwordSignUpConf: '123456'
        }
    }
   
    
    render () {
        return (
            <div>
                <h1>CONNECT USER</h1>
                <NavButton />
                {this.state.emailLogin? <UserAccountButton/>: null}
                <form onSubmit={this.handleLogin}> LOG IN TO YOUR ARTIST ACCOUNT
                    <input type="text" onChange={(e)=>{this.setState({lEmail:e.target.value})}} value={this.state.lEmail} placeholder="name@email.com" required/>
                    <input type="password" onChange={(e)=>{this.setState({lPassword:e.target.value})}} value={this.state.lPassword} placeholder="Password" required/>
                    <input type="submit"/>
        {this.state.loggedIn? (<div>THANKS FOR LOGGING IN!<button onClick={this.redirect}>Back to Home</button></div>) : null}
                </form>
                <form onSubmit={this.handleSubmit}> FIRST TIME? CREATE AN ARTIST ACCOUNT
                    <input type="text" onChange={(e)=>{this.setState({sName:e.target.value})}} value={this.state.sName} placeholder="Name" required/>
                    <input type="text" onChange={(e)=>{this.setState({sEmail:e.target.value})}} value={this.state.sEmail} placeholder="name@email.com" required/>
                    <input type="password" onChange={(e)=>{this.setState({sPassword:e.target.value})}} value={this.state.sPassword} placeholder="Password" required/>
                    <input type="text" onChange={(e)=>{this.setState({sPasswordConf:e.target.value})}} value={this.state.sPasswordConf} placeholder="Confirm Password" required/>
                    <input type="text" onChange={(e)=>{this.setState({sDescription:e.target.value})}} value={this.state.sDescription} placeholder="Artist Description" required/>
                    <input type="text" onChange={(e)=>{this.setState({sLocation:e.target.value})}} value={this.state.sLocation}  placeholder="Montreal, QC" required/>
                    <p>{this.state.sImageURL1}</p>
                    <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Art" required/>
                    <p>{this.state.sImageURL2}</p>
                    <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Art" required/>
                    <p>{this.state.sImageURL3}</p>
                    <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Art" required/>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default ConnectUser;