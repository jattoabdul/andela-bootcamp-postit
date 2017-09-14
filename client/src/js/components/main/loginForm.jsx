import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Auth from "./../containers/";
import {
    onLoginUser } from "../../actions/authAction";
import Api from "../../utils/api";
import { Welcome } from "./../partials/";
import '../../../styles/index.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginUser = this.onLoginUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
        username: '',
        password: '',
        error_message: ''
    };
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  onFocus() {
    this.setState({ error_message: '' });
  }

  onLoginUser(e) {
    e.preventDefault();
    let { username, password } = this.state;
    username = username.trim();
    password = password;
    if (username !== "" && password !== '') {
      console.log(`this.state:`, this.state);
      this.props.onLoginUser(this.state)
      .then(
          () => {
              const response = JSON.parse(this.props.authData.user);
              // set error messages
              if (response.message === 'username does not exist'
                 || response.message === 'invalid password') {
                     this.setState({
                         error_message: response.message
                     })
                return;
              }
              // redirecting
              this.props.history.push('/dashboard');
          }
      );
    } else {
      this.setState({ error_message: 'Error: All fields are required' });
    }
  }

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
                    <br/>
                    <form
                        onSubmit={this.onLoginUser}
                        id="loginForm"
                        className="row">
                        <p className="flow-text"> &nbsp; Sign In</p>
                        {this.state.error_message === "" ? "" :
                        <div className="chip red white-text center" style={{ width: "20rem" }}>
                          {this.state.error_message}
                          <i className="close material-icons">close</i>
                        </div>}
                        <div className="input-field col s12">
                            <input
                                onFocus={this.onFocus}
                                type="text"
                                id="username_login"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                                /*ref={(input) => { this.username = input; }}*/
                                maxLength="15"
                                pattern="(?=^.{6,15}$)(?!.*\s).*$"
                                required/>
                            <label htmlFor="username_login">Username</label>
                        </div>
                        <div className="input-field col s12 m7 no-padding">
                            <input
                                onFocus={this.onFocus}
                                type="password"
                                id="password_login"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                /*ref={(input) => { this.password = input; }}*/
                                pattern="(?=^.{6,12}$)(?!.*\s).*$"
                                title="6 to 12 characters required"
                                required/>
                            <label htmlFor="password_login">Password</label>
                        </div>
                        <div className="input-field col s12 m5 nopadding">
                            <Link to="/resetpassword" className="forgotPass">
                                forgot password
                            </Link>
                        </div>
                        <div className="input-field col s12">
                            <button 
                                /*onClick= { this.onLoginUser }*/
                                className="btn waves-effect waves-light"
                                type="submit">
                                sign in
                            </button>
                            <br/><br/>
                            <p>
                                &nbsp;
                                 <Link to="/register" className="alternative">
                                    Don&rsquo; have an Account? &nbsp;
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
}

const mapDispatchToProps = {
    onLoginUser
}

function mapStateToProps({authData}){
    return {
        authData
    }
}

// const mapDispatchToProps = dispatch => ({
//     onLoginUser: user => dispatch(loginUser(user))
// });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
