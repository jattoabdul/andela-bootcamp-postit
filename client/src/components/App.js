import React, { Component } from "react";
import logo from "./../images/logo.svg";
import "./../stylesheet/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to POSTIT</h2>
        </div>
        <p className="App-intro">
          You Dont Have to Shout, Just <code>come</code> and PostIt.
        </p>
      </div>
    );
  }
}

export default App;
