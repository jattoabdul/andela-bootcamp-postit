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
                    <form id="SignUpForm" className="">
                        <div className="form-group">
                            <label htmlFor="fullname_signup">FULL NAME</label>
                            <input type="email"
                                className="form-control"
                                id="fullname_signup"
                                placeholder="Enter your full name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email_signup">Email</label>
                            <input type="email"
                                className="form-control"
                                id="email_signup"
                                placeholder="Your email goes here"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_signup">Password</label>
                            <input type="password"
                                className="form-control"
                                id="password_signup"
                                placeholder="Password"/>
                        </div>
                        <div className="checkbox" style={{ paddingBottom: "1rem" }}>
                            <label>
                            <input type="checkbox"/> &nbsp; I agree to the
                            <a href="/#/serviceterms">Terms of Service</a>
                            </label>
                        </div>
                        <button type="submit"
                            className="btn btn primary-color capsule-full">
                            Sign Up
                        </button>
                        <a href="/#/login">I’m already a member</a>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

export default Register;
