import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
// import Api from "../../utils/api";
import { Welcome } from "./../partials/";

class Login extends React.Component {

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
                    <form id="loginForm" className="row">
                        <p className="flow-text"> &nbsp; Sign In</p>
                        <div className="chip red white-text center" style={{ width: "20rem" }}>
                          <i className="close material-icons">close</i>
                        </div>
                        <div className="input-field col s12">
                            <input
                                type="text" id="username_login"
                                required/>
                            <label htmlFor="username_login">Username</label>
                        </div>
                        <div className="input-field col s12 m7 no-padding">
                            <input onFocus={this.onFocus}
                                type="password" id="password_login"
                                required/>
                            <label htmlFor="password_login">Password</label>
                        </div>
                        <div className="input-field col s12 m5 nopadding">
                            <a href="/resetpassword" className="forgotPass">
                                forgot password
                            </a>
                        </div>
                        <div className="input-field col s12">
                            <button
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

// const mapDispatchToProps = dispatch => ({
//     onLoginUser: user => dispatch(loginUser(user))
// });

// export default connect(null, mapDispatchToProps)(Login);
export default Login;
