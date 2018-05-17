import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class ConnectArtist extends Component {
    constructor (props) {
        super(props);
        this.state={//ARTIST LOGIN
            aName: 'aisha',
            aPassword: '123456',
            loggedIn: false,
         
            //ARTIST SIGN UP
            sName: 'jen',
            sEmail: 'jen@email.com',
            sPassword: '123456',
            sPasswordConf: '123456',
            sDescription: "I'm an artist",
            sLocation: 'Montreal, QC',
            sProfPicURL: 'image.jpg',
            sImageURL1: 'image1.jpg',
            sImageURL2: 'image2.jpg',
            sImageURL3: 'image3.jpg',
        }
    }

    uploadFile = (event) => {
        // Fetch upload pic
    }
    bringU = (event) => {
        this.props.history.push("/connectuser");
    }
    
    handleLogin = (event) => {
        event.preventDefault();
        this.props.loginArtist("aisha") //change to artistName from backend
        this.setState({loggedIn: true});
        // Fetch login in
        this.props.history.push("/")
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push("/artistsignupcomplete")
        // Fetch add new Artist
    }
    back = (event) => {
        event.preventDefault();
        window.history.back();
    }

    render () {
        return (
            <div>
                <button onClick={this.back}>X</button>
                <button onClick={this.bringU}>I'm a user</button>
                <button>I'm an artist</button>
                <h1>CONNECT ARTIST</h1>
                <NavButton />
                <HomeButton/>
                {this.state.lEmail? <ArtistAccountButton/>: null}
                <hr/>
                <form onSubmit={this.handleLogin}> LOG IN TO YOUR ARTIST ACCOUNT
                    <input type="text" onChange={(e)=>{this.setState({aName: e.target.value})}} value={this.state.aName} placeholder="name@email.com" required/>
                    <input type="password" onChange={(e)=>{this.setState({aPassword:e.target.value})}} value={this.state.aPassword} placeholder="Password" required/>
                    <input type="submit"/>
                </form>
                <hr/>
                <form onSubmit={this.handleSubmit}> FIRST TIME? CREATE AN ARTIST ACCOUNT
                    <input type="text" onChange={(e)=>{this.setState({sName:e.target.value})}} value={this.state.sName} placeholder="Name" required/>
                    <input type="text" onChange={(e)=>{this.setState({sEmail:e.target.value})}} value={this.state.sEmail} placeholder="name@email.com" required/>
                    <input type="password" onChange={(e)=>{this.setState({sPassword:e.target.value})}} value={this.state.sPassword} placeholder="Password" required/>
                    <input type="password" onChange={(e)=>{this.setState({sPasswordConf:e.target.value})}} value={this.state.sPasswordConf} placeholder="Confirm Password" required/>
                    <input type="text" onChange={(e)=>{this.setState({sDescription:e.target.value})}} value={this.state.sDescription} placeholder="Artist Description" required/>
                    <input type="text" onChange={(e)=>{this.setState({sLocation:e.target.value})}} value={this.state.sLocation}  placeholder="Montreal, QC" required/>
                    <p>{this.state.sProfPicURL}</p>
                    <input type="file" onChange={event => this.uploadFile(event.target.files[0])} placeholder="Upload Proflile Picture" required/>
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
let ConnectComplete=withRouter(ConnectArtist);

export default ConnectComplete;