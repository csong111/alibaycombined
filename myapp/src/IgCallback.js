import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

class IgCallback extends Component {
    constructor (props) {
        super(props);
        this.state={
        }
    }
    componentDidMount() {
        let artistID=window.localStorage.getItem("artistID");
        //this.setState({artistID: artistID});
        //let token=this.props.token;
        fetch('/saveToken', {
            method: 'POST',
            body: JSON.stringify({
                artistID: artistID,
                token: this.props.token
            })
        })
        .then(res => res.text())
        .then(res => {
            console.log(res);
            this.props.history.push('/artistaccount/' + artistID);
        })
        // console.log('ig callback', this.props.token)
        //this.props.history.push('/artistaccount/' + this.state.artistID);
    }
    render() { 
        return (
            <div>Loading Instagram data...</div>
        )
    }
}
 
export default IgCallback;