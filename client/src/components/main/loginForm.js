import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
import { Welcome } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
import "./../../stylesheet/Auth.css"; // Auth.scss

class Login extends React.Component {

  render() {
    return (
        <div id="indexContainer">
            <div id="mainContainer" className="row">
                <Welcome />
                <div className="col s12 m6 indexSideTwo">
                    <div id="authCapsules">
                        <a href="/#/register" className="capsule btn teal">
                            Sign Up
                        </a>
                        <a href="/#/login" className="capsule btn cyan">
                            Sign In
                        </a>
                    </div>
                    <br/>
                    <form id="loginForm" className="row" action="#">
                        <p className="flow-text"> &nbsp; Sign In</p>
                        <div className="input-field col s12">
                            <input type="email" id="email_login"/>
                            <label htmlFor="email_login">Email</label>
                        </div>
                        <div className="input-field col s12 m7 no-padding">
                            <input type="password" id="password_login"/>
                            <label htmlFor="password_login">Password</label>
                        </div>
                        <div className="input-field col s12 m5 nopadding">
                            <a href="/#/resetpassword" className="forgotPass">
                                forgot password
                            </a>
                        </div>
                        <div className="input-field col s12">
                            <button className="btn waves-effect waves-light"
                                    type="submit">
                                sign in
                            </button>
                            <br/><br/>
                            <p>
                                &nbsp;
                                 <a href="/#/register" className="alternative">
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

export default Login;
