import React from 'react';
// import {  } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userRegisterRequest } from './../../actions/registerActions';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            fullName: '',
            email: '',
            phoneNumber: '',
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
        this.props.userRegisterRequest(this.state).then(
            (registerResponse) => {
                if (registerResponse.err === undefined) {
                    // register success handling
                    // flashing message
                    this.props.addFlashMessage({
                        type:'success',
                        text: 'SignUp successful, Welcome to PostiT!!!'
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
                else {
                    // register error handling
                    this.setState({
                        error_messages: registerRes.err,
                        isLoading: false
                    });
                }
            }
        );
    }

    render() {
    const {error_messages} = this.state;
    return (
        <form
            onSubmit={this.onSubmit}
            id="signUpForm"
            className="row">
            <p className="flow-text"> &nbsp; Sign Up</p>
            {error_messages.message && 
                <div className="chip red white-text center" style={{ width: "20rem" }}>
                {error_messages.message}
                <i className="close material-icons">close</i>
            </div>}
            <div className="input-field col s6">
                <input
                type="text"
                id="fullname_signup"
                name="fullName"
                value={this.state.fullName}
                onChange={this.onChange}
                required/>
                <label htmlFor="fullname_signup">Fullname</label>
            </div>
            <div className="input-field col s6">
            <input
                type="text"
                id="username_signup"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                maxLength="15"
                pattern="(?=^.{6,15}$)(?!.*\s).*$"
                required/>
            <label htmlFor="username_signup">Username</label>
            </div>
            <div className="input-field col s6">
            <input
                type="password"
                id="password_signup"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                pattern="(?=^.{6,12}$)(?!.*\s).*$"
                title="6 to 12 characters required"
                required/>
            <label htmlFor="password_signup">Password</label>
            </div>
            <div className="input-field col s6">
            <input
                type="email"
                id="email_signup"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                required/>
            <label htmlFor="email_signup">Email</label>
            </div>
                <div className="input-field col s12">
                <input
                type="tel"
                id="phone_signup"
                name="phoneNumber"
                pattern="^\d{11}$"
                value={this.state.phoneNumber}
                onChange={this.onChange}
                required/>
                <label htmlFor="phone_signup">Phone Number</label>
            </div>
            <div className="input-field col s12">
            <button
                className="btn waves-effect waves-light"
                disabled={this.state.isLoading}
                type="submit">
                    Sign Up
            </button>
            <p>
                <Link to="/login">
                    <span>Already have an account</span>
                </Link>
            </p>
            </div>
        </form>        
    );
}
}

RegisterForm.propTypes = {
    userRegisterRequest: PropTypes.func.isRequired,
    loginRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

export default withRouter(RegisterForm);
