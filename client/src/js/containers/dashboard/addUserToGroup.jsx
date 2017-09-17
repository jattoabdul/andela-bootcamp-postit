import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import {
  onAddUser,
  onSearchUser,
  fetchMessages } from '../../actions/groupAction';
import '../../../styles/index.scss';


class AddUserToGroupBoard extends React.Component {
  constructor(props) {
    super(props);
    // this.onCreateGroup = this.onCreateGroup.bind(this);
    this.state = {
      error: "",
      currentGroup: null,
      selectedUsers: []
    };
    this.onSearchUserInGroup = this.onSearchUserInGroup.bind(this);
    this.onAddUserToGroup = this.onAddUserToGroup.bind(this);
    this.onShowGroupMessages = this.onShowGroupMessages.bind(this);
  }

  componentWillReceiveProps(nextProps) {
		const { authData: { currentUserData },
			groupData: { userGroups, currentGroup } } = nextProps;
		// console.log(`currentGroup on add user to group component:`, currentGroup);
		this.setState({
			currentGroup: !isEmpty(currentGroup) ? currentGroup : null
		});
  }
  
  // onSearchUserInGroup Method
  onSearchUserInGroup(e) {
    e.preventDefault();
    const id = `${this.props.match.params.groupId}`;
    const searchText = this.selectedUser.value;
    if (!searchText) {
      this.setState({
        selectedUsers: []
      });
    }
    // call searchUserAction
    this.props.onSearchUser(id, searchText).then(
      (searchItem) => {
        this.setState({
          selectedUsers: searchItem
        });
      }
    );
  }

  // onAddUserToGroup Method
  onAddUserToGroup(uId) {
    // e.preventDefault();
    const id = `${this.props.match.params.groupId}`;
    //call addUser action
    this.props.onAddUser(uId, id).then(
      (item) => {
        console.log('added user to group succes', item)
        Materialize.toast(`user with ID: ${item.username} is added succesfully`, 4000);
      }
    );
  }


  onShowGroupMessages(e) {
    e.preventDefault();
    //get this id from the currentGroup Object in store
    // const gId = `${this.props.match.params.groupId}`;
    const group = this.state.currentGroup;
    const gId = group.id;
    //call enter group and load message
    this.props.fetchMessages(gId).then(
      (item) => {
        // redirect to the message board
        this.props.history.push(`/dashboard/messages/${gId}`)
      }
    );
  }

  // render Method
  render() {
    return (
      <div>
        <br />
        <div id="chatArea" className="white-text row padTop">
          <div className="container centerContainerForForms">
            <div className="card-panel formPanel">
              <form className="centerForm">
                <div className="center col s12 teal-text">
                  <span>Search For Registered User and Add to Group Below:</span>
                  <br/>
                    <div className="input-field inline">
                    <input
                      id="add_users"
                      type="search"
                      className="validate"
                      ref={(input) => {
                        this.selectedUser = input;
                      }
                      }
                      onKeyUp={this.onSearchUserInGroup} />
                    <label htmlFor="add_users">Users</label>
                  </div>
                </div>
                <div className="col s12">
                  <ul>
                    {/* check if user is a member of currentGroup 
                                        and display the badge based on that and
                                        add disabled to the anchor tag */}
                    {this.state.selectedUsers.length >= 1 ?
                      this.state.selectedUsers.map(selectedUser => <li key={selectedUser.id}>
                        <a
                          className="channels"
                          onClick={
                            () => this.onAddUserToGroup(selectedUser.id)
                          }>
                          @{selectedUser.username}
                        </a>
                        <span className="new badge" data-badge-caption="Member"></span>
                      </li>)
                      : <li></li>
                    }
                  </ul>
                </div>
                <div className="col s12">
                  <p className="center">
                    <button className="btn-large waves-effect waves-light"
                      onClick={this.onSearchUserInGroup}>Search</button> or
                    <button className="btn-large waves-effect waves-light"
                      onClick={this.onShowGroupMessages}>Enter Group</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddUserToGroupBoard.propTypes = {
  onSearchUser: PropTypes.func,
  onAddUser: PropTypes.func,
  fetchMessages: PropTypes.func,
  groupData: PropTypes.object,
	authData: PropTypes.object
}

const mapDispatchToProps = {
  onSearchUser,
  onAddUser,
  fetchMessages
}

function mapStateToProps({ authData, groupData }){
  return {
      authData,
      groupData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddUserToGroupBoard));

