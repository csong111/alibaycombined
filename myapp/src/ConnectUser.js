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
            email: 'jen@email.com',
            password: '123456',
            loggedIn: false,

            //SIGN UP
            firstName: 'jen',
            lastName: 'o',
            emailSignUp: 'jen@email.com',
            passwordSignUp: '123456',
            passwordSignUpConf: '123456'
        }
    }
    redirect = (event) => {
        event.preventDefault();
        this.props.history.push("/")
    }
   handleLogin = (event) => {
       event.preventDefault();
       this.props.loginUser('jen@email.com');
       this.setState({loggedIn: true});
   }

   handleSubmit = (event) => {
       event.preventDefault();
       this.props.history.push("/usersignupcomplete");
   }
    
    render () {
        return (
            <div>
                <h1>CONNECT USER</h1>
                <NavButton />
                {this.state.email? <UserAccountButton/>: null}
                <form onSubmit={this.handleLogin}> LOG IN TO YOUR ACCOUNT
                    <input type="text" onChange={(e)=>{this.setState({email:e.target.value})}} value={this.state.email} placeholder="name@email.com" required/>
                    <input type="password" onChange={(e)=>{this.setState({password:e.target.value})}} value={this.state.password} placeholder="Password" required/>
                    <input type="submit"/>
                {this.state.loggedIn? (<div>THANKS FOR LOGGING IN!<button onClick={this.redirect}>Back to Home</button></div>) : null}
                </form>
                <form onSubmit={this.handleSubmit}> FIRST TIME? CREATE AN ACCOUNT
                    <input type="text" onChange={(e)=>{this.setState({firstName:e.target.value})}} value={this.state.firstName} placeholder="First Name" required/>
                    <input type="text" onChange={(e)=>{this.setState({lastName:e.target.value})}} value={this.state.lastName} placeholder="Last Name" required/>
                    <input type="text" onChange={(e)=>{this.setState({emailSignUp:e.target.value})}} value={this.state.emailSignUp} placeholder="name@email.com" required/>
                    <input type="password" onChange={(e)=>{this.setState({passwordSignUp:e.target.value})}} value={this.state.passwordSignUp} placeholder="Password" required/>
                    <input type="password" onChange={(e)=>{this.setState({passwordSignUpConf:e.target.value})}} value={this.state.passwordSignUpConf} placeholder="Confirm Password" required/>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
let ConnectUserComplete=withRouter(ConnectUser);
export default ConnectUserComplete;