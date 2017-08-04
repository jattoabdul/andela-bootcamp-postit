import React from "react";
import logo from "./../../images/logo.svg";
import { Welcome } from "./../partials/";
import "./../../stylesheet/App.css";

const Home = () =>
<div className="App">
    <Welcome />
    <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to POSTIT</h2>
    </div>
    <p className="App-intro">
        You Dont Have to Shout, Just <code>come</code> and PostIt.
    </p>
</div>;

export default Home;
