import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reroute: false,
            rows: []
        }
    }

    
    async componentWillMount() {
        const token = localStorage.getItem("jwtToken");
        const user = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/token`,
            {token}
        );
        if (!user.data.token) {
            this.setState({reroute: true});
        }
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/purchases`,
            { headers: { "x-access-token": localStorage.getItem("jwtToken") } }
        );
        console.log('TCL: User -> componentWillMount -> res', res);
        let rows = res.data.rows.map((row, i) => {
            return <tr key={i}>
                <td>{row.figure_name}</td>
                <td>{row.count}</td>
                <td>{row.value}</td>
                <td>{row.value * row.count}</td>
            </tr>
        });
        this.setState({rows});
    }
    

    render() {
        if (this.state.reroute) {
            return <Redirect to="/login" />
        }
        
        return (
            <div>
                <section className="hero is-primary">
                    <div className="container">
                        <div className="hero-body">
                            <h1 className="title is-1">User</h1>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-narrow">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Figure</th>
                                            <th>Count</th>
                                            <th>Value</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default User;
