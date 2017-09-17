import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  onLoginUser,
  onRegisterUser } from "../../actions/authAction";
import Api from "../../utils/api";
import { Welcome } from "./../partials/";
import '../../../styles/index.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.onRegisterUser = this.onRegisterUser.bind(this);
    this.onChange = this.onChange.bind(this);    
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      username: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      error_message: ""
    };
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  onFocus() {
    this.setState({ error_message: "" });
  }

  onRegisterUser(e) {
    e.preventDefault();
    let { username, fullName, email, phoneNumber, password } = this.state;
    username = username.trim();
    fullName = fullName.trim();
    email = email.trim();
    phoneNumber = phoneNumber.trim();
    password = password;
    // console.log(`${username},${fullname},${email},${phoneNumber},${password}`);
    if (username === ""
        || fullName === ""
        || email === ""
        || phoneNumber === ""
        || password === "") {
      this.setState({ error_message: "Error: please all field are required" });
      return;
    }
    if (phoneNumber.length !== 11) {
      this.setState({ error_message: "Error: phone number not correct" });
      return;
    }
    // dispatching onRegisterUser request
    this.props.onRegisterUser(this.state).then(
      (registerRes) => {
        // console.log(registerRes.err);
        if (registerRes.err === undefined) {
          // login dispatch
          this.props.onLoginUser(this.state).then(
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
          )
        } else {
        this.setState({ error_message: registerRes.err.message });
        }
      }
    )
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
                    <form
                    onSubmit={this.onRegisterUser}
                      id="signUpForm"
                      className="row">
                        <p className="flow-text"> &nbsp; Sign Up</p>
                        {this.state.error_message === "" ? "" :
                        <div className="chip red white-text center" style={{ width: "20rem" }}>
                          {this.state.error_message}
                          <i className="close material-icons">close</i>
                        </div>}
                        <div className="input-field col s6">
                          <input onFocus={this.onFocus}
                            type="text"
                            id="fullname_signup"
                            name="fullName"
                            value={this.state.fullName}
                            onChange={this.onChange}
                            /*ref = {(input) => { this.fullname = input; }}*/
                            required/>
                          <label htmlFor="fullname_signup">Fullname</label>
                        </div>
                        <div className="input-field col s6">
                        <input onFocus={this.onFocus}
                          type="text"
                          id="username_signup"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChange}
                          /*ref = {(input) => { this.username = input; }}*/
                          maxLength="15"
                          pattern="(?=^.{6,15}$)(?!.*\s).*$"
                          required/>
                        <label htmlFor="username_signup">Username</label>
                        </div>
                        <div className="input-field col s6">
                        <input onFocus={this.onFocus}
                          type="password"
                          id="password_signup"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          /*ref = {(input) => { this.password = input; }}*/
                          pattern="(?=^.{6,12}$)(?!.*\s).*$"
                          title="6 to 12 characters required"
                          required/>
                        <label htmlFor="password_signup">Password</label>
                        </div>
                        <div className="input-field col s6">
                        <input onFocus={this.onFocus}
                          type="email"
                          id="email_signup"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          /*ref = {(input) => { this.email = input; }}*/
                          required/>
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
                            /*ref = {(input) => { this.phoneNumber = input; }}*/
                            required/>
                          <label htmlFor="phone_signup">Phone Number</label>
                        </div>
                        <div className="input-field col s12">
                        <button
                          /* onClick= { this.onRegisterUser } */
                          className="btn waves-effect waves-light"
                          type="submit">
                             sign Up
                        </button>
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
}

const mapDispatchToProps = {
  onRegisterUser,
  onLoginUser
}

function mapStateToProps(state){
  return {
      authData: state.authData
  }
}

// const mapDispatchToProps = dispatch => ({
//   onLoginUser: user => dispatch(loginUser(user))
// });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
