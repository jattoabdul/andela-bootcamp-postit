import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinner-material';
import {
  onLoginUser
} from '../../actions/authAction';
import { Welcome } from './../partials/';
import '../../../styles/index.scss';

/**
 * Display Login
 * @class Login
 * @extends {React.Component}
 * @param {any} props
 */
class Login extends React.Component {
  /**
   * Creates an instance of Login
   * @param {any} props
   * @memberof Login
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.onLoginUser = this.onLoginUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.closeError = this.closeError.bind(this);
    this.state = {
      username: '',
      password: '',
      error_message: '',
      isLoading: false,
      hasError: false
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
   * onFocus method
   * @param {void} void
   * @return {void}
   */
  onFocus() {
    this.setState({ error_message: '' });
  }

  /**
   * onLoginUser Method
   * @param {event} event
   * @return {void} 
   */
  onLoginUser(event) {
    event.preventDefault();
    let { username, password } = this.state;
    username = username.trim();
    password = password;
    if (username !== '' && password !== '') {
      this.setState({ isLoading: true });
      this.props.onLoginUser(this.state)
        .then(
          () => {
            const response = JSON.parse(this.props.authData.user);
            // set error messages
            if (response.message === 'username does not exist'
            || response.message === 'invalid password') {
              this.setState({
                error_message: response.message,
                hasError: true,
                isLoading: false
              });
              return;
            }
            // setting isLoading to false
            this.setState({ isLoading: false });
            // redirecting
            this.props.history.push('/dashboard');
          }
        );
    } else {
      this.setState({ error_message: 'Error: All fields are required' });
    }
  }
  /**
   * closeError Method - flash message error
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
   * @return {dom} DomElement
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
            <br />
            <form
              onSubmit={this.onLoginUser}
              id="loginForm"
              className="row"
            >
              <p className="flow-text"> &nbsp; Sign In</p>
              {this.state.hasError &&
                <div className="chip red white-text center" style={{ width: '20rem' }}>
                  {this.state.error_message}
                  <i className="close material-icons" tabIndex={-1} role="button" onClick={this.closeError}>close</i>
                </div>}
              <div className="input-field col s12">
                <input
                  onFocus={this.onFocus}
                  type="text"
                  id="username_login"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  maxLength="15"
                  pattern="(?=^.{6,15}$)(?!.*\s).*$"
                  required
                />
                <label htmlFor="username_login">Username</label>
              </div>
              <div className="input-field col s12 no-padding">
                <input
                  onFocus={this.onFocus}
                  type="password"
                  id="password_login"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  pattern="(?=^.{6,12}$)(?!.*\s).*$"
                  title="6 to 12 characters required"
                  required
                />
                <label htmlFor="password_login">Password</label>
                <span>
                  <Link to="/resetpassword" className="forgotPass">
                    forgot password
                  </Link>
                </span>
              </div>
              <div className="input-field col s12">
                {!this.state.isLoading &&
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                >
                  sign in
                </button> }
                {this.state.isLoading &&
                  <Spinner
                    size={40}
                    spinnerColor={'#fff'}
                    spinnerWidth={2}
                    visible
                  />}
                <br /><br />
                <p>
                  &nbsp;
                  <Link to="/register" className="alternative">
                    Don&rsquo;t have an Account? &nbsp;
                    <span>SIGN UP NOW</span>
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

Login.propTypes = {
  onLoginUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onLoginUser
};

/**
 * 
 * @param {object} Authdata
 * @return {object} authData 
 */
function mapStateToProps({ authData }) {
  return {
    authData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
