import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reroute: false,
            method: "Deposit",
            multiplier: 5.86,
            result: 0,
            amount: 0,
            currency: "¤"
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
        if (this.state.method === "Deposit") {
            this.setState({result: Math.round(this.state.amount * this.state.multiplier),
                currency: "¤"});
        } else if (this.state.method === "withdraw") {
            this.setState({
                result: Math.round(this.state.amount * this.state.multiplier),
                currency: "€"
            });
        }
        console.log(e.target.value);
        
    };

    async onSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("jwtToken");
        if (this.state.method === "Deposit") {
            const test =  await axios.post(`${process.env.REACT_APP_API_URL}/user/deposit`,
            {token, amount: this.state.amount}, {
                headers: {
                    "x-access-token": localStorage.getItem("jwtToken")
                }
            });
        } else if (this.state.method === "Withdraw") {
            const test =  await axios.post(`${process.env.REACT_APP_API_URL}/user/withdraw`,
            {token, amount: this.state.amount}, {
                headers: {
                    "x-access-token": localStorage.getItem("jwtToken")
                }
            });
        }
        this.props.setUser();
        
        console.log(this.state);
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
    }
    

    render() {
        if (this.state.reroute) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <section className="hero is-warning">
                    <div className="hero-body">
                        <div className="container">
                        <h1 className="title">
                            Manage
                        </h1>
                        <h2 className="subtitle">
                            Deposit or withdraw money
                        </h2>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-narrow">
                                <form onSubmit={this.onSubmit} className="form flexcol" method="post">
                                    <p>You are about to {this.state.method}: {this.state.result} {this.state.currency}</p>
                                    <select onChange={this.onChange} name="method">
                                        <option value="Deposit">Deposit</option>
                                        <option value="Withdraw">Withdraw</option>
                                    </select>
                                    <label htmlFor="amount">Amount</label>
                                    <div>
                                        <input onChange={this.onChange} type="number" name="amount"/>
                                        {this.state.method === "Deposit" ? "€" : "¤"}
                                    </div>
                                    <button type="submit" className="button">{this.state.method}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Manage;