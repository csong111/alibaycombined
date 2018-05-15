import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import './App.css';

class ConnectArtist extends Component {
    constructor () {
        super();
        this.state={//ARTIST LOGIN
            lEmail: 'jen@email.com',
            lPassword: '123456',
         
            //ARTIST SIGN UP
            sName: 'jen',
            sEmail: 'jen@email.com',
            sPassword: '123456',
            sPasswordConf: '123456',
            sDescription: "I'm an artist",
            sLocation: 'Montreal, QC',
            sImageURL1: 'image1.jpg',
            sImageURL2: 'image2.jpg',
            sImageURL3: 'image3.jpg',
        }
    }

    uploadFile = (event) => {

    }

    handleSubmit = (event) => {
        event.preventDefault();

    }
    
    render () {
        return (
            <div>
                <h1>CONNECT ARTIST</h1>
                <NavButton />
                {this.state.userID === "" ? null : <UserAccountButton />}
                {this.state.userID === "" ? null : <CartButton />}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={(e)=>{this.setState({sName:e.targetValue})}} value={this.state.name} placeholder="Name" required/>
                    <input type="text" onChange={(e)=>{this.setState({sEmail:e.targetValue})}} placeholder="name@email.com" required/>
                    <input type="text" onChange={(e)=>{this.setState({sPassword:e.targetValue})}} placeholder="Password" required/>
                    <input type="text" onChange={(e)=>{this.setState({sPasswordConf:e.targetValue})}} placeholder="Confirm Password" required/>
                    <input type="text" onChange={(e)=>{this.setState({sDescription:e.targetValue})}} placeholder="Artist Description" required/>
                    <input type="text" onChange={(e)=>{this.setState({sLocation:e.targetValue})}} placeholder="Montreal, QC" required/>
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

export default ConnectArtist;