import React, { Component } from 'react';
import axios from 'axios';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = async e => {
        e.preventDefault();
        console.log("this.state: ", this.state);

        const { username, password, password2 } = this.state;
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`,
                {username, password, password2});
            console.log("TCL: Register -> res", res);
        } catch (error) {
			console.log("TCL: Register -> }catch -> error", error);
        }
        
    }
    render() {
        return (
            <div>
                <section className="hero is-danger">
                    <div className="hero-body">
                        <div className="container">
                        <h1 className="title">
                            Register
                        </h1>
                        <h2 className="subtitle">
                            Here you can register a user
                        </h2>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-narrow">
                                <form onSubmit={this.onSubmit} className="form flexcol">
                                    <label htmlFor="username">Username</label>
                                    <input onChange={this.onChange} type="text" name="username"/>
                                    <label htmlFor="password">Password</label>
                                    <input onChange={this.onChange} type="password" name="password"/>
                                    <label htmlFor="password2">Password again</label>
                                    <input onChange={this.onChange} type="password" name="password2"/>
                                    <button type="submit" className="button is-warning">Sign-up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Register;