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
        <div>
            <Welcome />
            <h2>
                Register Form goes in here
            </h2>
            <p>
                email,username,password,fullname,phoneNumber
            </p>
        </div>
    );
  }
}

export default Register;
