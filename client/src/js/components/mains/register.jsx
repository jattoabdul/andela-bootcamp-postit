import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import Api from "../../utils/api";
import { Welcome, RegisterForm } from "./../partials/";
import userRegisterRequest from './../../actions/registerActions';
import { addFlashMessage } from './../../actions/flashMessages.js';
import { loginRequest } from './../../actions/loginActions';

class Register extends React.Component {

  render() {
    const { userRegisterRequest, addFlashMessage, loginRequest } = this.props;
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
            <RegisterForm 
              userRegisterRequest={userRegisterRequest}
              addFlashMessage={addFlashMessage}
              loginRequest={loginRequest} />
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  userRegisterRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired 
}

export default connect(null,
    { 
    userRegisterRequest, 
    loginRequest, 
    addFlashMessage })(Register);

