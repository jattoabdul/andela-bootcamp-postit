import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinner-material';
import { onLoginUser, onRegisterUser } from '../../actions/authAction';
import { Welcome } from './../partials/';
import '../../../styles/index.scss';

/**
 * @typedef {object} event
 */

/**
 * Display Register
 * @class Register
 * @extends {React.Component}
 * @param {any} props
 */
class Register extends React.Component {
  /**
   * Creates an instance of Register
   * @param {any} props
   * @memberof Register
   * @return {void} 
   */
  constructor(props) {
    super(props);
    this.onRegisterUser = this.onRegisterUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.closeError = this.closeError.bind(this);
    this.state = {
      username: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      error_message: '',
      hasError: false,
      isLoading: false
    };
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
   * onFocus Method
   * @return {void}
   */
  onFocus() {
    this.setState({ error_message: '' });
  }

  /**
   * onRegister Method
   * @param {event} event
   * @return {void}
   */
  onRegisterUser(event) {
    event.preventDefault();
    let { username, fullName, email, phoneNumber, password } = this.state;
    username = username.trim();
    fullName = fullName.trim();
    email = email.trim();
    phoneNumber = phoneNumber.trim();
    password = password;
    if (
      username === '' ||
      fullName === '' ||
      email === '' ||
      phoneNumber === '' ||
      password === ''
    ) {
      this.setState({ error_message: 'Error: please all field are required' });
      return;
    }
    if (phoneNumber.length !== 11) {
      this.setState({ error_message: 'Error: phone number not correct' });
      return;
    }
    this.setState({ isLoading: true });
    this.props
      .onRegisterUser(this.state)
      .then((registerRes) => {
        if (registerRes.err === undefined) {
          // login dispatch
          this.props.onLoginUser(this.state).then(() => {
            const response = JSON.parse(this.props.authData.user);
            // set error messages
            if (
              response.message === 'username does not exist' ||
              response.message === 'invalid password'
            ) {
              this.setState({
                error_message: response.message,
                hasError: true
              });
              return;
            }
            this.setState({ isLoading: false });
            // redirecting
            this.props.history.push('/dashboard');
          });
        } else {
          this.setState({
            error_message: registerRes.err.message,
            hasError: true
          });
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * close Error Method
   * @param {event} event
   * @return {void}
   */
  closeError(event) {
    event.preventDefault();
    this.setState({
      hasError: false
    });
  }

  /**
   * Render Method
   * @return {dom} DomELement
   */
  render() {
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
            <form
              onSubmit={this.onRegisterUser}
              id="signUpForm"
              className="row"
            >
              <p className="flow-text"> &nbsp; Sign Up</p>
              {this.state.hasError && (
                <div
                  className="chip red white-text center"
                  style={{ width: '20rem' }}
                >
                  {this.state.error_message}
                  <i
                    className="close material-icons"
                    tabIndex={-1}
                    role="button"
                    onClick={this.closeError}
                  >
                    close
                  </i>
                </div>
              )}
              <div className="input-field col s12 m6 l6">
                <input
                  onFocus={this.onFocus}
                  type="text"
                  id="fullname_signup"
                  name="fullName"
                  value={this.state.fullName}
                  onChange={this.onChange}
                  required
                />
                <label htmlFor="fullname_signup">Fullname</label>
              </div>
              <div className="input-field col s12 m6 l6">
                <input
                  onFocus={this.onFocus}
                  type="text"
                  id="username_signup"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  maxLength="15"
                  pattern="(?=^.{6,15}$)(?!.*\s).*$"
                  required
                />
                <label htmlFor="username_signup">Username</label>
              </div>
              <div className="input-field col s12 m6 l6">
                <input
                  onFocus={this.onFocus}
                  type="password"
                  id="password_signup"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  pattern="(?=^.{6,12}$)(?!.*\s).*$"
                  title="6 to 12 characters required"
                  required
                />
                <label htmlFor="password_signup">Password</label>
              </div>
              <div className="input-field col s12 m6 l6">
                <input
                  onFocus={this.onFocus}
                  type="email"
                  id="email_signup"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
                <label htmlFor="email_signup">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onFocus={this.onFocus}
                  type="tel"
                  id="phone_signup"
                  name="phoneNumber"
                  pattern="^\d{11}$"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  required
                />
                <label htmlFor="phone_signup">Phone Number</label>
              </div>
              <div className="input-field col s12">
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                >
                  sign Up
                </button>
                {this.state.isLoading && (
                  <Spinner
                    size={40}
                    spinnerColor={'#fff'}
                    spinnerWidth={2}
                    visible
                  />
                )}
                <p>
                  <Link to="/login">
                    <span>Already have an account</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  onRegisterUser: PropTypes.func.isRequired,
  onLoginUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onRegisterUser,
  onLoginUser
};
/**
 * mapStateToProps
 * @param {*} state
 * @return {object} AuthData-State
 */
function mapStateToProps(state) {
  return {
    authData: state.authData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Register)
);
