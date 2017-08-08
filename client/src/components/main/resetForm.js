import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
import { Welcome } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
import "./../../stylesheet/Auth.css"; // Auth.scss

class ResetPassword extends React.Component {

  render() {
    return (
        <div id="indexContainer" className="amber">
            <div id="mainContainer" className="row">
                <Welcome />
                <div className="col s12 m6 indexSideTwo flexCentered">
                    <div id="authCapsules">
                        <a href="/register" className="capsule btn teal">
                            Sign Up
                        </a>
                        <a href="/login" className="capsule btn cyan">
                            Sign In
                        </a>
                    </div>
                    <p>Forgot Password?</p>
                    <form id="forgotPass" action="#" className="row">
                        <p className="flow-text center-align">
                            It&rsquo;s normal for humans to forget
                        </p>
                        <div className="input-field col s12">
                            <input className="center"
                                    type="email" id="email_forgot"/>
                            {/* <!-- you can apply autofocus here,
                                its gives an awesome user experience  --> */}
                            <label htmlFor="email_forgot"
                                className="amber-text">
                                What&rsquo;s your email?
                            </label>
                            <div className="input-field col s12 center center-align">
                                <button className="btn waves-effect waves-light"
                                        type="submit">Reset my password
                                </button>
                                <p className="center">
                                <a href="/login"><span>SIGN IN</span></a>
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

export default ResetPassword;
