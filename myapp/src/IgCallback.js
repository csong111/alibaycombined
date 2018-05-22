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
        let splitToken=this.props.token.split('=');
        let token=splitToken[1];
        this.setState({artistID: artistID})
        //console.log("ARTISTIDEEE", artistID)
        //console.log("SPLITUP", splitToken)
        let body=JSON.stringify({
            artistID: artistID,
            token: token
        })
        //console.log("BODY", body)
        //this.setState({artistID: artistID});
        fetch("/saveToken", {
            method: 'POST',
            body: body
        })
        .then(res => {
            res.text();
        })
        .then(res => {
            console.log(res);
            this.props.setLoggedIn(artistID);
            this.props.history.push('/artistaccount/' + artistID);
        })
    }
    render() { 
        return (
            <div>Loading Instagram data...</div>
        )
    }
}
 
export default IgCallback;