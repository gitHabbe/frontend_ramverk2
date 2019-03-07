import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import io from 'socket.io-client';
import axios from "axios";

class Figure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reroute: false
        }
    }

    async componentWillMount() {
        const token = localStorage.getItem("jwtToken");
        const test = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/token`,
            {token}
        );
        console.log('TCL: Figure -> componentDidMount -> test', test)
        if (!test.data.token) {
            this.setState({reroute: true});
        }
    }
    
    
    render() {
        if (this.state.reroute) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                Figure
            </div>
        );
    }
}

export default Figure;