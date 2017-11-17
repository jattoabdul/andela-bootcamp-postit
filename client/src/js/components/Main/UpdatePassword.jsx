import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updatePassword
} from '../../actions/authAction';
import { Welcome } from './../Partials/';

/**
 * @typedef {object} event
 */

/**
 * Display UpdatePasswordForm
 * @class UpdatePasswordForm
 * @extends {React.Component}
 * @param {any} props
 */
export class UpdatePassword extends React.Component {
  /**
   * Creates an instance of UpdatePasswordForm
   * @param {any} props
   * @memberof UpdatePasswordForm
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.onResetPassword = this.onResetPassword.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      status: '',
      message: '',
      updateButtonClassName: 'btn waves-effect waves-light'
    };
  }

  /**
   * onChange Method
   * @param {event} event
   * @return {void} void
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * onFocus Method
   * @param {void} empty
   * @return {void}
   */
  onFocus() {
    this.setState({
      status: '',
      message: ''
    });
  }

  /**
   * onResetPassword
   * @param {event} event
   * @return {void} null
   */
  onResetPassword(event) {
    event.preventDefault();
    if (this.state.status === 'success') {
      this.setState({
        status: '',
        message: '',
        updateButtonClassName: 'btn waves-effect waves-light disabled'
      });
      return null;
    }
    if (this.password.value !== '') {
      const hash = window.location.href.split('/')[5];
      if (hash === undefined) {
        this.props.history.push('/login');
        return;
      }
      this.props.updatePassword(this.password.value, hash)
        .then((response) => {
          if (response.error === undefined) {
            this.setState({
              status: 'success',
              message: `password has been changed succesfully,
               please login with your new password`,
              updateButtonClassName: 'btn waves-effect waves-light disabled'
            });
          }
        });
    }
  }

  /**
   * Render Method
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
            <p>Forgot Password?</p>
            <form id="forgotPass" className="row">
              <p className="flow-text center-align">
                Please update your password
              </p>
              {this.state.message === '' ? (
                ''
              ) : (
                <div
                  className="chip green white-text center"
                  style={{
                    width: '100%',
                    fontSize: '10px'
                  }}
                >
                  {this.state.message}
                  <i className="close material-icons">close</i>
                </div>
              )}
              <div className="input-field col s12 m12 l12">
                {this.state.status === '' ? (
                  <input
                    className="center"
                    onFocus={this.onFocus}
                    type="password"
                    id="password_forgot"
                    ref={(input) => {
                      this.password = input;
                    }}
                    pattern="(?=^.{6,12}$)(?!.*\s).*$"
                    title="6 to 12 characters required"
                    required
                  />
                ) : (
                  <input
                    className="center"
                    type="text"
                    id="password_reset_success"
                    value="Password succesfully updated"
                    disabled
                  />
                )}
                <label htmlFor="password_forgot" className="amber-text">
                  What&rsquo;s your new password?
                </label>
                <div className="input-field col s12 center center-align">
                  <button
                    onClick={this.onResetPassword}
                    className={this.state.updateButtonClassName}
                    type="submit"
                  >
                    Update my password
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

UpdatePassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]).isRequired
};

const mapDispatchToProps = {
  updatePassword
};

export default connect(null,
  mapDispatchToProps)(withRouter(UpdatePassword));
