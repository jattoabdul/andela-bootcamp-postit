import React from 'react';
import { Link } from 'react-router-dom';
import { Welcome } from './../partials/';

const Home = () => {

    return (
        <div id="indexContainer" className="teal lighten-5">
            <div id="mainContainer" className="row">
                <Welcome />
                <div className="col s12 m6 indexSideTwo flexCentered">
                <Link to="/login" className="teal btn waves-effect waves-light">
                    Login
                </Link>
                <p className="flow-text">
                    New to POSTiT?
                </p>
                <Link to="/register" className="btn cyan waves-effect waves-light">
                    Create an account
                </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;