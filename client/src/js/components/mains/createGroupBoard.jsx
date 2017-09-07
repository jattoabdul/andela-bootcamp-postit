import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { SideMenu, MainNav } from './../partials/';
import { createNewGroup } from './../../actions/groupActions';
import { logout } from './../../actions/loginActions';

class CreateGroupBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        groupName: '',
        groupDesc: '',
        error_messages: {},
        isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onCreateGroup = this.onCreateGroup.bind(this);
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }


//   OnCreateGroup Method
  onCreateGroup(e) {
    e.preventDefault();
    // console.log("creating group");
    this.setState({
        error_messages: {},
        isLoading: true
    })
    
    this.props.createNewGroup(this.state)
        .then(
        () => {
            console.log(this.props.group);
            const groupId = this.props.group.currentGroup.id;
            console.log(groupId);
            // redirecting to add user to group component
            this.props.history.push(`/add/${groupId}/user`);
        });
  }

  render() {
    const { isAuthenticated, user } = this.props.login;
    const { error_messages, groupName, groupDesc, isLoading } = this.state;
    return (
        <div id="dashContainer" className="teal">
            <div id="appContainer" className="row no-marginbtm">
            <SideMenu
                isAuthenticated={isAuthenticated}
                user={user} />
            <div id="appBoard" className="col s10 m9 l10 no-padding">
                <MainNav />
                <br />
            <div id="chatArea" className="white-text row padTop">
            <div className="container centerContainerForForms">
                <div className="card-panel formPanel">
                    <form
                        onSubmit={this.onCreateGroup}
                        className="centerForm">
                        <div className="input-field col s12">
                        <input
                            type="text"
                            id="group_name-create"
                            name="groupName"
                            value={groupName}
                            onChange={this.onChange}
                            pattern="(?=^.{6,20}$).*$"
                            required/>
                        <label htmlFor="group_name-create">Group Name</label>
                        </div>
                        <div className="input-field col s12">
                        <textarea
                            id="group_desc-create"
                            name="groupDesc"
                            value={groupDesc}
                            onChange={this.onChange}
                            pattern="(?=^.{0,150}$).*$"
                            className="materialize-textarea">
                        </textarea>
                        <label htmlFor="group_desc-create">
                            Group Description
                        </label>
                        </div>
                        <div className="col s12">
                        <p className="center">
                            <button
                                type="submit"
                                className="btn-large waves-effect waves-light">
                                Create Group
                            </button>
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

function mapStateToProps( { login, group }){
    return {
        login,
        group
    }
  }

  const mapDispatchToProps = {
        createNewGroup
  }


CreateGroupBoard.PropTypes = {
    login: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    createNewGroup: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateGroupBoard));
