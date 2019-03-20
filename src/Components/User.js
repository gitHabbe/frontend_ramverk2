import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reroute: false,
            history: [],
            summary: []
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
		console.log("res: ", res);
        const res2 = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/figures`,
            { headers: { "x-access-token": localStorage.getItem("jwtToken") } }
        );
		console.log("res2: ", res2);
        let history = res.data.rows.map((row, i) => {
            return <tr key={i}>
                <td>{row.figure_name}</td>
                <td>{row.count}</td>
                <td>{row.value}</td>
                <td>{row.value * row.count}</td>
                <td>{row.tradeType}</td>
            </tr>
        });
        let summary = res2.data.rows.map((row, i) => {
            return <tr key={i}>
                <td>{row.figure_name}</td>
                <td>{row.count}</td>
                {/* <td>{row.MoneySpend}</td> */}
            </tr>
        });
        this.setState({history, summary});
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
                            <h3 className="title is-4">Inventory Summary</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Figure</th>
                                        <th>Count</th>
                                        {/* <th>Money spent</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.summary}
                                </tbody>
                            </table>
                            </div>
                        </div>
                            <hr/>
                    </div>
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-narrow has-text-centered">
                                <h3 className="title is-4">Purchase history</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Figure</th>
                                            <th>Count</th>
                                            <th>Value</th>
                                            <th>Total</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.history}
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
