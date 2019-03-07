import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import 'bulma/css/bulma.css';
import './App.css'
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Figure from "./Components/Figure";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    this.setUser = this.setUser.bind(this);
  }
  
  async componentWillMount() {
    await this.setUser();
  }

  async setUser() {
    const token = localStorage.getItem("jwtToken");
    const user = await axios.post(`${process.env.REACT_APP_API_URL}/user/token`,
      { token });
    this.setState({user: user.data.user});
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar                 setUser={this.setUser} user={this.state.user} />
          <Route exact path="/"   component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login"    render={props => <Login {...props} setUser={this.setUser} />} />
          <Route path="/figure" component={Figure} />
        </div>
      </Router>
    );
  }
}

export default App;
