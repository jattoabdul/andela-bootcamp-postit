import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
import Api from "../../utils/api";
import { Welcome } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
import "./../../stylesheet/Auth.css"; // Auth.scss

class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.onResetPassword = this.onResetPassword.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      status: "",
      message: "",
      updateButtonClassName: "btn waves-effect waves-light"
    };
  }

  onFocus() {
    this.setState({
      status: "",
      message: ""
    });
  }

  onResetPassword(e) {
    e.preventDefault();
    if (this.state.status === "success") {
      this.setState({
        status: "",
        message: "",
        updateButtonClassName: "btn waves-effect waves-light disabled"
      });
      return null;
    }
    if (this.password.value !== "") {
      const hash = window.location.href.split("/")[4];
    //   console.log(hash);
      if (hash === undefined) {
        window.location = "/login";
        return;
      }
      const password = `password=${this.password.value}`;
      console.log(password);
      Api(password, `/api/users/reset/${hash}/`, "POST", null).then(
        (response) => {
          if (response.data.error === undefined) {
            this.setState({
              status: "success",
              message: `password has been changed succesfully,
               please login with your new password`,
              updateButtonClassName: "btn waves-effect waves-light disabled"
            });
          }
        }
    );
    }
  }
  render() {
    return (
        <div id="indexContainer" className="teal lighten-5">
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
                    <form id="forgotPass" className="row">
                        <p className="flow-text center-align">
                            Please update your password
                        </p>
                        {this.state.message === "" ? "" :
                        <div className="chip green white-text center" style={{ width: "20rem" }}>
                          {this.state.message}, please login with your credentials
                          <i className="close material-icons">close</i>
                        </div>}
                        <div className="input-field col s12">
                            {
                            this.state.status === "" ?
                            <input className="center"
                                   onFocus={this.onFocus}
                                   type="password" id="password_forgot"
                                   ref={(input) => { this.password = input; }}
                                   /> :
                            <input className="center"
                                   type="text" id="password_reset_success"
                                   value="Password succesfully updated" disabled/>
                            }
                            <label htmlFor="password_forgot"
                                className="amber-text">
                                What&rsquo;s your new password?
                            </label>
                            <div className="input-field col s12 center center-align">
                                <button onClick={this.onResetPassword}
                                    className={this.state.updateButtonClassName}
                                    type="submit">Update my password
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

export default UpdatePassword;
