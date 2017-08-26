import React from "react";
import { Welcome } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.css 

const Home = () =>
<div id="indexContainer" className="teal lighten-5">
    <div id="mainContainer" className="row">
        <Welcome />
        <div className="col s12 m6 indexSideTwo flexCentered">
          <a href="/login" className="teal btn waves-effect waves-light">
              Login
          </a>
          <p className="flow-text">
              New to POSTiT?
          </p>
          <a href="/register" className="btn cyan waves-effect waves-light">
              Create an account
          </a>
        </div>
    </div>
</div>;

export default Home;
