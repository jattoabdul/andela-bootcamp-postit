import React from "react";
import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
import loginUser from "../../actions/loginUser";
import Api from "../../utils/api";
import { Welcome } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
import "./../../stylesheet/Auth.css"; // Auth.scss

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.onRegisterUser = this.onRegisterUser.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      error_message: ""
    };
  }

  onFocus() {
    this.setState({ error_message: "" });
  }

  onRegisterUser(e) {
    e.preventDefault();
    let { username, fullname, email, phoneNumber, password } = this;
    username = username.value.trim();
    fullname = fullname.value.trim();
    email = email.value.trim();
    phoneNumber = phoneNumber.value.trim();
    password = password.value;
    console.log(`${username},${fullname},${email},${phoneNumber},${password}`);
    if (username === ""
        || fullname === ""
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
    const userString = `username=${username}&fullName=${fullname}&email=${email}
        &password=${password}&phoneNumber=${phoneNumber}`;
    Api(userString, "/api/users/signup", "POST", null).then(
      (registerRes) => {
        console.log(registerRes.err);
        if (registerRes.err === undefined) {
          Api(userString, "/api/users/signin", "POST", null).then(
            (loginRes) => {
              if (loginRes.message !== "username does not exist") {
                this.props.onLoginUser(JSON.stringify(loginRes));
                sessionStorage.setItem("user", JSON.stringify(loginRes));
                window.location = "/dashboard";
              } else {
                this.setState({ error_message: loginRes.message });
              }
            }
          );
        } else {
          this.setState({ error_message: registerRes.err.message });
        }
      }
    );
  }

  render() {
    return (
        <div id="indexContainer" className="teal lighten-5">
            <div id="mainContainer" className="row">
                <Welcome />
                <div className="col s12 m6 indexSideTwo">
                    <div id="authCapsules">
                        <a href="/register" className="capsule btn teal">
                            Sign Up
                        </a>
                        <a href="/login" className="capsule btn cyan">
                            Sign In
                        </a>
                    </div>
                    <form id="signUpForm" className="row">
                        <p className="flow-text"> &nbsp; Sign Up</p>
                        {this.state.error_message === "" ? "" :
                        <div className="chip red white-text center" style={{ width: "20rem" }}>
                          {this.state.error_message}
                          <i className="close material-icons">close</i>
                        </div>}
                        <div className="input-field col s6">
                          <input onFocus={this.onFocus}
                            type="text" id="fullname_signup"
                            ref = {(input) => { this.fullname = input; }}
                            required/>
                          <label htmlFor="fullname_signup">Fullname</label>
                        </div>
                        <div className="input-field col s6">
                        <input onFocus={this.onFocus}
                          type="text" id="username_signup"
                          ref = {(input) => { this.username = input; }}
                          required/>
                        <label htmlFor="username_signup">Username</label>
                        </div>
                        <div className="input-field col s6">
                        <input onFocus={this.onFocus}
                          type="password" id="password_signup"
                          ref = {(input) => { this.password = input; }}
                          required/>
                        <label htmlFor="password_signup">Password</label>
                        </div>
                        <div className="input-field col s6">
                        <input onFocus={this.onFocus}
                          type="email" id="email_signup"
                          ref = {(input) => { this.email = input; }}
                          required/>
                        <label htmlFor="email_signup">Email</label>
                        </div>
                         <div className="input-field col s12">
                          <input onFocus={this.onFocus}
                            type="number" id="phone_signup"
                            ref = {(input) => { this.phoneNumber = input; }}
                            required/>
                          <label htmlFor="phone_signup">Phone Number</label>
                        </div>
                        <div className="input-field col s12">
                        <button
                          onClick= { this.onRegisterUser }
                          className="btn waves-effect waves-light"
                          type="submit">
                             sign Up
                        </button>
                        <p>
                            <a href="/login">
                                <span>Already have an account</span>
                            </a>
                        </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  onLoginUser: user => dispatch(loginUser(user))
});

export default connect(null, mapDispatchToProps)(Register);
