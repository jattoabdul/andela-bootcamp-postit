import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
import { Welcome } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
import "./../../stylesheet/Auth.css"; // Auth.scss

class Register extends React.Component {
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
                    <form id="signUpForm" className="row" action="#">
                        <p className="flow-text"> &nbsp; Sign Up</p>
                        {/* <div className="input-field col s12">
                        <input type="text" id="fullname_signup"/>
                        <label htmlFor="fullname_signup">Fullname</label>
                        </div> */}
                        <div className="input-field col s12">
                        <input type="text" id="username_signup"/>
                        <label htmlFor="username_signup">Username</label>
                        </div>
                        <div className="input-field col s12">
                        <input type="password" id="password_signup"/>
                        <label htmlFor="password_signup">Password</label>
                        </div>
                        <div className="input-field col s12">
                        <input type="email" id="email_signup"/>
                        <label htmlFor="email_signup">Email</label>
                        </div>
                        {/* <div className="input-field col s12">
                        <input type="number" id="phone_signup"/>
                        <label htmlFor="phone_signup">Phone Number</label>
                        </div> */}
                        <div className="input-field col s12">
                        <button className="btn waves-effect waves-light"
                             type="submit">
                             sign Up
                        </button>
                        <p>
                            <a href="/#/login">
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

export default Register;
