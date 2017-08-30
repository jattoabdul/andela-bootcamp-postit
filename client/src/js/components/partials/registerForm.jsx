import React from "react";
import { Link } from 'react-router-dom';
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
            phoneNumber: ''
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
        this.props.userRegisterRequest(this.state);

    }

    render() {
    return (
        <form
            onSubmit={this.onSubmit}
            id="signUpForm"
            className="row">
            <p className="flow-text"> &nbsp; Sign Up</p>
            {/*<div className="chip red white-text center" style={{ width: "20rem" }}>
                error
                <i className="close material-icons">close</i>
            </div>*/}
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
                type="number"
                id="phone_signup"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.onChange}
                required/>
                <label htmlFor="phone_signup">Phone Number</label>
            </div>
            <div className="input-field col s12">
            <button
                className="btn waves-effect waves-light"
                type="submit">
                    sign Up
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
    userRegisterRequest: PropTypes.func.isRequired
}

export default RegisterForm;
