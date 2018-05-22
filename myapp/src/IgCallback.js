import React, { Component } from 'react';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';


class IgCallback extends Component {
    componentDidMount() {
        console.log(window.localStorage.getItem("artistID"));
        // fetch('/saveToken', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         artistID: this.props.artistID,
        //         token: this.props.token
        //     })
        // })
        // .then(res => res.text())
        // .then(res => {
        //     console.log(res);
        //     this.props.history.push('/artistaccount/' + this.props.artistID);
        // })
        console.log('ig callback', this.props.token)
      //  this.props.history.push('/artistaccount/' + this.props.artistID);
    }
    render() { 
        return (
            <div>Loading Instagram data...</div>
        )
    }
}
 
export default IgCallback;