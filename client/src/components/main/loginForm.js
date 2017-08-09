import React from "react";
import { connect } from "react-redux";
// import Auth from "./../containers/";
import loginUser from "../../actions/loginUser";
import Api from "../../utils/api";
import { Welcome } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
import "./../../stylesheet/Auth.css"; // Auth.scss

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginUser = this.onLoginUser.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      error_message: ""
    };
  }

  onFocus() {
    this.setState({ error_message: "" });
  }

  onLoginUser(e) {
    e.preventDefault();
    let { username, password } = this;
    username = username.value.trim();
    password = password.value;
    if (username !== "" && password !== "") {
      const userString = `username=${username}&password=${password}`;
      Api(userString, "/api/users/signin", "POST").then(
        (loginRes) => {
          if (loginRes.message !== "username does not exist") {
            // console.log(loginRes);
            this.props.onLoginUser(JSON.stringify(loginRes));
            sessionStorage.setItem("user", JSON.stringify(loginRes));
            window.location = "/dashboard";
          }
        }
      );
    } else {
      this.setState({ error_message: "Error: All fields are required" });
    }
  }

  render() {
    return (
        <div id="indexContainer" className="amber">
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
                    <br/>
                    <form id="loginForm" className="row">
                        <p className="flow-text"> &nbsp; Sign In</p>
                        <div className="input-field col s12">
                            <input onFocus={this.onFocus}
                                type="text" id="username_login"
                                ref={(input) => { this.username = input; }}
                                required/>
                            <label htmlFor="username_login">Username</label>
                        </div>
                        <div className="input-field col s12 m7 no-padding">
                            <input onFocus={this.onFocus}
                                type="password" id="password_login"
                                ref={(input) => { this.password = input; }}
                                required/>
                            <label htmlFor="password_login">Password</label>
                        </div>
                        <div className="input-field col s12 m5 nopadding">
                            <a href="/resetpassword" className="forgotPass">
                                forgot password
                            </a>
                        </div>
                        <div className="input-field col s12">
                            <button onClick= { this.onLoginUser }
                                className="btn waves-effect waves-light"
                                type="submit">
                                sign in
                            </button>
                            <br/><br/>
                            <p>
                                &nbsp;
                                 <a href="/register" className="alternative">
                                    Don&rsquo; have an Account? &nbsp;
                                <span>SIGN UP NOW</span>
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

export default connect(null, mapDispatchToProps)(Login);
