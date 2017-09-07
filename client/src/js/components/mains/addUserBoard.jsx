import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { SideMenu, MainNav } from './../partials/';
import { addUserToGroup, searchUser } from './../../actions/groupActions';
import { logout } from './../../actions/loginActions';

class AddUserBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error_messages: {},
        userQuery: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSearchUser = this.onSearchUser.bind(this);
    this.onAddUserToGroup = this.onAddUserToGroup.bind(this);
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  onSearchUser(e) {
    const groupId = this.props.match.params.groupId;
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value
    }, () => {
        this.props.searchUser(groupId, this.state.userQuery);
    });
    // const groupId = this.props.group.currentGroup.id;
    // this.props.searchUser(groupId, this.state.userQuery);
  }

//   OnCreateGroup Method
  onAddUserToGroup(userId) {
    // e.preventDefault();
    console.log('======>adding user');
    const groupId = this.props.match.params.groupId;
    this.props.addUserToGroup(groupId, userId)
        .then(
        () => {
            console.log(this.props.group.userAdded);
            // Add a toastr message here.
            Materialize.toast(`user with ID: ${userId} is added succesfully`, 4000);
        });
  }

  render() {
    const { isAuthenticated, user } = this.props.login;
    const { matchedUsers } = this.props.group;
    const { error_messages, userQuery } = this.state;
    return (
        <div id="dashContainer" className="teal">
            <div id="appContainer" className="row no-marginbtm">
            <SideMenu
                isAuthenticated={isAuthenticated}
                user={user}/>
            <div id="appBoard" className="col s10 m9 l10 no-padding">
                <MainNav />
                <br />
            <div id="chatArea" className="white-text row padTop">
            <div className="container centerContainerForForms">
                <div className="card-panel formPanel">
                    <form className="centerForm">
                        <div className="col s12 teal-text">
                        Add User (s):
                        <div className="input-field inline">
                            <input
                                id="add_users"
                                name="userQuery"
                                value={userQuery}
                                onChange={this.onSearchUser}
                                type="search"
                                className="validate"/>
                            <label htmlFor="add_users">Users</label>
                        </div>
                        </div>
                        <div className="col s12">
                        <ul>
                            { matchedUsers !== undefined ?
                                    matchedUsers.map(eachUser => <li 
                                        key={eachUser.id}
                                        className="teal-text">
                                        <a
                                         onClick={
                                             () => this.onAddUserToGroup(eachUser.id)
                                            }>
                                         @{eachUser.username}
                                         <span className="new badge" data-badge-caption="Member"></span>
                                         </a>
                                        </li>)
                                : null
                            }
                        </ul>
                        </div>
                        <div className="col s12">
                            <p className="center">
                                {/* <button className="btn-large waves-effect waves-light">Search</button> or */}
                                {/* <button className="btn-large waves-effect waves-light">Enter Group</button> */}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state){
    return {
        login: state.login,
        group: state.group
    }
  }

const mapDispatchToProps = {
    addUserToGroup,
    searchUser
}

AddUserBoard.PropTypes = {
    login: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddUserBoard));
