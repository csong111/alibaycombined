import React, { Component } from 'react';

class IgCallback extends Component {
    state = {}
    componentDidMount() {
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
        console.log('ig callback')
        this.props.history.push('/artistaccount/' + this.props.artistID);
    }
    render() { 
        return (
            <div>Loading Instagram data...</div>
        )
    }
}
 
export default IgCallback;