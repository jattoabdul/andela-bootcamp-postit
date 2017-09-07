import React from 'react';
// import {  } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error_messages: {},
            isLoading: false            
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
       this.setState({
           error_messages: {},
           isLoading: true
       });
       this.props.loginRequest(this.state).then(
        () => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            // console.log(user);
            if (user.message !== 'username does not exist' &&
                user.message !== 'invalid password') {
                // redirecting
                this.props.history.push('/dashboard');
            } else {
            // login error handling
            this.setState({
                error_message: user.message,
                isLoading: false
            });
            }
        });
    }

    render() {
    const { error_messages, username, password, isLoading  } = this.state;
    return (
        <form
            onSubmit={this.onSubmit}
            id="loginForm"
            className="row">
            <p className="flow-text"> &nbsp; Sign In</p>
            {error_messages.message && 
                <div className="chip red white-text center" style={{ width: "20rem" }}>
                {error_messages.message}
                <i className="close material-icons">close</i>
            </div>}
            <div className="input-field col s12">
                <input
                    type="text"
                    id="username_login"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    maxLength="15"
                    pattern="(?=^.{6,15}$)(?!.*\s).*$"
                    required/>
                <label htmlFor="username_login">Username</label>
            </div>
            <div className="input-field col s12 m7 no-padding">
                <input 
                    type="password"
                    id="password_login"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    pattern="(?=^.{6,12}$)(?!.*\s).*$"
                    title="6 to 12 characters required"
                    required/>
                <label htmlFor="password_login">Password</label>
            </div>
            <div className="input-field col s12 m5 nopadding">
                <Link to="/resetpassword" className="forgotPass">
                    forgot password
                </Link>
            </div>
            <div className="input-field col s12">
                <button
                    className="btn waves-effect waves-light"
                    disabled={isLoading}
                    type="submit">
                    Sign In
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
    );
}
}

LoginForm.propTypes = {
    loginRequest: PropTypes.func.isRequired
}

export default withRouter(LoginForm);
