import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Api from '../../utils/api';
import { Welcome } from './../partials/';
import '../../../styles/index.scss';

/**
 * @class UpdatePassword
 */
class UpdatePasswordForm extends React.Component {
  /**
   * 
   * @param {*} props 
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
   * 
   * @param {*} event
   * @return {void} void
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
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
   * 
   * @param {*} event
   * @return {void}
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
      //   console.log(hash);
      if (hash === undefined) {
        window.location = '/#/login';
        return;
      }
      const password = `password=${this.password.value}`;
      Api(
        password,
        `/api/v1/users/reset/${hash}/`,
        'POST',
        null
      ).then((response) => {
        if (response.data.error === undefined) {
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
   * 
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
              <div className="input-field col s12">
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

export default UpdatePasswordForm;
