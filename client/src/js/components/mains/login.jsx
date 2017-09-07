import React from "react";
import { render } from 'react-dom';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import Api from "../../utils/api";
import { Welcome, LoginForm } from "./../partials/";
import { loginRequest } from './../../actions/loginActions';

class Login extends React.Component {
  render() {
    const { loginRequest } = this.props;
    return (
        <div id="indexContainer" className="teal lighten-5">
            <div id="mainContainer" className="row">
                <Welcome />
                <div className="col s12 m6 indexSideTwo">
                    <div id="authCapsules">
                        <Link to="/register" className="capsule btn teal">
                            Sign Up
                        </Link>
                        <Link to="/login" className="capsule btn cyan">
                            Sign In
                        </Link>
                    </div>
                    <br/>
                    <LoginForm
                        loginRequest={loginRequest}
                        />
                </div>
            </div>
        </div>
    );
  }
}

Login.PropTypes = {
    loginRequest: PropTypes.func.isRequired
}

export default connect(null, {loginRequest})(Login);
