import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import Api from '../../utils/api';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  requestResetPassword
} from '../../actions/authAction';
import { Welcome } from './../partials/';
import '../../../styles/index.scss';
/**
 * @typedef {object} event
 */

/**
 * Display ResetPassword
 * @class ResetPassword
 * @extends {React.Component}
 * @param {any} props
 */
class ResetPassword extends React.Component {
  /**
   * Creates an instance of ResetPassword
   * @param {any} props
   * @memberof ResetPassword
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.onRequestReset = this.onRequestReset.bind(this);
    this.closeError = this.closeError.bind(this);
    this.state = {
      responseMessage: '',
      requestButtonClassName: 'btn waves-effect waves-light',
      hasStatus: false
    };
  }

  /**
   * onRequestReset password Method
   * @param {event} event
   * @return {void} null
   */
  onRequestReset(event) {
    event.preventDefault();
    if (
      this.state.responseMessage ===
      `password reset link sent,
         please check your email`
    ) {
      this.setState({
        responseMessage: '',
        requestButtonClassName: 'btn waves-effect waves-light'
      });
      return null;
    }
    this.props.requestResetPassword(this.email.value)
      .then((response) => {
        if (response.data.error === undefined) {
          this.setState({
            responseMessage: 'password reset link sent to your email',
            hasStatus: true,
            requestButtonClassName: 'btn waves-effect waves-light disabled'
          });
        }
      });
  }

  /**
   * onChange Method
   * @param {event} event
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * closeError Method
   * @param {event} event
   * @return {void}
   */
  closeError(event) {
    event.preventDefault();
    this.setState({
      hasStatus: false
    });
  }

  /**
   * Render method
   * @return {dom} DomEvent
   */
  render() {
    return (
      <div id="indexContainer" className="teal lighten-5">
        <div id="mainContainer" className="row">
          <Welcome />
          <div className="col s12 m6 indexSideTwo flexCentered">
            <div id="authCapsules">
              <Link to="/register" className="capsule btn teal">
                Sign Up
              </Link>
              <Link to="/login" className="capsule btn cyan">
                Sign In
              </Link>
            </div>
            <form id="forgotPass" className="row">
              <p className="flow-text center-align">
                <span>Forgot Password?</span>
                It&rsquo;s normal for humans to forget
              </p>
              {this.state.hasStatus && (
                <div
                  className="chip green white-text center"
                  style={{
                    width: '100%',
                    fontSize: '12px'
                  }}
                >
                  {this.state.responseMessage}
                  <i className="close material-icons">close</i>
                </div>
              )}
              <div className="input-field col s12 m12 l12">
                <input
                  className="center"
                  type="email"
                  id="email_forgot"
                  ref={(input) => {
                    this.email = input;
                  }}
                />
                <label htmlFor="email_forgot" className="amber-text">
                  What&rsquo;s your email?
                </label>
                <div className="input-field col s12 center center-align">
                  <button
                    onClick={this.onRequestReset}
                    className={this.state.requestButtonClassName}
                    type="submit"
                  >
                    Reset my password
                  </button>
                  <p className="center">
                    <Link to="/login">
                      <span>SIGN IN</span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  requestResetPassword: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  requestResetPassword
};

export default connect(null, mapDispatchToProps)(withRouter(ResetPassword));
