import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bulma/css/bulma.css';
import './App.css'
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          {/* <Navbar isLoggedIn={this.state.isLoggedIn}/> */}
          {/* <Route path="/"                 component={Home}/> */}
          <Route path="/register"         component={Register}/>
          <Route path="/login"            component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
