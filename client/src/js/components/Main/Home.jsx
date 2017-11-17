import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Welcome } from './../Partials/';

/**
 * Display Home
 * @class Home
 * @param {any} props
 * @return {dom} DomeElement
 */
const Home = () => (
  <div id="indexContainer" className="teal lighten-5">
    <div id="mainContainer" className="row">
      <Welcome />
      <div className="col s12 m6 indexSideTwo flexCentered">
        <h3 className="alt-logo center-align">
          <i className="icon ion-speakerphone" /> POSTiT
        </h3>
        <div className="home-mobile">
          <Link to="/login" className="teal btn waves-effect waves-light">
                Login
          </Link>
          <p className="flow-text">New to POSTiT?</p>
          <Link
            to="/register"
            className="btn cyan waves-effect waves-light"
          >
                Create an account
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(Home);
