import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            redirect: false
        }

        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        this.setState({ user: this.props.user });
    }
        

    renderLogin() {
        return (
            <div className="navbar-item">
                <div className="buttons">
                    <Link to="/register" className="button is-warning">
                        <strong>Sign up</strong>
                    </Link>
                    <Link to="/login" className="button is-info">
                        <strong>Log in</strong>
                    </Link>
                </div>
            </div>
        );
    }

    logout() {
        localStorage.removeItem("jwtToken");
        this.setState({redirect: true});
        this.props.setUser();
    }

    renderLogout() {
        return (
            <div className="navbar-item">
                <p className="navbar-item">
                    <strong>{parseFloat(this.props.user.balance).toFixed(2)}</strong>&nbsp;coins
                </p> - 
                <p className="navbar-item">
                    <Link to="/dashboard" >
                        <strong>{this.props.user.username}</strong>
                    </Link>
                </p>
                <div className="buttons">
                    <button onClick={this.logout} className="button is-danger">
                        <strong>Logout</strong>
                    </button>
                </div>
            </div>
        )
    }

    renderMoreNav() {
        return [
            <Link to="/figure" className="navbar-item" key="asdf">
                Figure
            </Link>,
            <Link to="/dashboard" className="navbar-item" key="asdff">
                Dashboard
            </Link>,
            <Link to="/manage" className="navbar-item" key="asdfff">
                Money
            </Link>
        ];
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src="https://bulma.io/images/bulma-logo.png" alt="bulma" width="112" height="28" />
                        </a>

                        <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="/" className="navbar-item">
                                Home
                            </Link>
                            {this.props.user ? this.renderMoreNav() : ""}
                        </div>
                        <div className="navbar-end">
                            {this.props.user ? this.renderLogout() : this.renderLogin()}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;