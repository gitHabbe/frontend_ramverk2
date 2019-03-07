import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    async onSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const login = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`,
            { username, password }
        );
        localStorage.setItem("jwtToken", login.data.token);
        this.props.setUser();
        this.setState({redirect: true});
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-one-third">
                                <form onSubmit={this.onSubmit} className="form">
                                    <label className="formLabel" htmlFor="username">Username</label>
                                    <input onChange={this.onChange} type="text" name="username" className="input"/>
                                    <label className="formLabel" htmlFor="password">Password</label>
                                    <input onChange={this.onChange} type="password" name="password" className="input"/>
                                    <div className="field is-grouped is-grouped-centered">
                                        <button type="submit" className="formButton button is-centered is-info">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Login;