/* global Materialize */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import {
  onAddUser,
  onSearchUser,
  fetchMessages } from '../../actions/groupAction';
import { Pagination } from '../../components/Partials';

/**
 * @typedef {object} event
 */

/**
 * Compute className for elements
 * @param {*} val
 * @return {object} classNames
 */
const computeClass = val => classNames({
  link_disabled: val,
  channels: true
});

/**
 * Display AddUserToGroupBoard
 * @class AddUserToGroupBoard
 * @extends {React.Component}
 * @param {any} props
 */
export class AddUserToGroupBoard extends React.Component {
  /**
   * Creates an instance of AddUserToGroupBoard
   * @param {any} props
   * @memberof AddUserToGroupBoard
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      currentGroup: null,
      selectedUsers: [],
      isSelected: [],
      totalPageCount: 0,
      currentGroupId: null
    };
    this.onSearchUserInGroup = this.onSearchUserInGroup.bind(this);
    this.onAddUserToGroup = this.onAddUserToGroup.bind(this);
    this.onShowGroupMessages = this.onShowGroupMessages.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * componentDidMount Life Cycle Method
   * 
   * @param {void} void
   * 
   * @return {void}
   */
  componentDidMount() {
    const locationUrl = this.props.location.pathname;
    const group = { id: locationUrl.split('/')[2] };
    this.setState({
      currentGroupId: parseInt(group.id, 10)
    });
  }

  /**
   * 
   * @param {object} nextProps 
   * 
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const { groupData: { currentGroup } } = nextProps;
    this.setState({
      currentGroup: !isEmpty(currentGroup) ? currentGroup : {}
    });
  }

  /**
   * onSearchUserInGroup Method
   * 
   * @param {event} event
   * 
   * @return {void}
   */
  onSearchUserInGroup(event) {
    event.preventDefault();
    const id = `${this.props.match.params.groupId}`;
    const searchText = this.selectedUser.value;
    const page = 1;
    if (!searchText) {
      this.setState({
        selectedUsers: [],
        totalPageCount: 0
      });
    }
    // call searchUserAction
    if (searchText !== '') {
      this.props.onSearchUser(id, searchText, page).then(
        (searchItem) => {
          this.setState({
            selectedUsers: searchItem.rows,
            totalPageCount: searchItem.count
          });
        }
      );
    }
  }

  /**
   * onAddUserToGroup Method
   * 
   * @param {number} uId
   * 
   * @return {void} 
   */
  onAddUserToGroup(uId) {
    const id = `${this.props.match.params.groupId}`;

    // call addUser action
    this.props.onAddUser(uId, id).then(
      () => {
        this.setState({
          isSelected: [...this.state.isSelected, uId]
        });
        Materialize.toast('user was added succesfully', 3000);
      }
    );
  }

  /**
   * onShowGroupMessages Method
   * 
   * @param {event} event
   * 
   * @return {promise} fetchMessages
   */
  onShowGroupMessages(event) {
    event.preventDefault();

    // get this id from the currentGroup Object in store
    const group = this.state.currentGroup;
    const groupIdB = this.state.currentGroupId;
    const gId = group.id || groupIdB;

    // call enter group and load message
    this.props.fetchMessages(gId).then(
      () => {
        // redirect to the message board
        this.props.history.push(`/dashboard/messages/${gId}`);
      }
    );
  }

  /**
   * HandlePageClick Method
   * 
   * @param {object} page
   * 
   * @return {void}
   */
  handlePageClick(page) {
    const selectedPage = Math.ceil(page.selected * 2);
    const id = `${this.props.match.params.groupId}`;
    const searchText = this.state.searchQuery;
    this.props.onSearchUser(id, searchText, selectedPage);
  }

  /**
   * Render Method
   * 
   * @return {dom} DomElement
   */
  render() {
    const { currentGroupId, selectedUsers } = this.state;
    return (
      <div>
        <br />
        <div id="chatArea" className="white-text row padTop">
          <div className="container centerContainerForForms">
            <div className="card-panel formPanel">
              <form className="centerForm">
                <div className="center col s12 teal-text">
                  <span>
                    Search For Registered User and Add to Group Below:
                  </span>
                  <br />
                  <div className="input-field inline">
                    <input
                      id="add_users"
                      type="search"
                      className="validate"
                      ref={(input) => {
                        this.selectedUser = input;
                      }
                      }
                      onKeyUp={this.onSearchUserInGroup}
                    />
                    <label htmlFor="add_users">Users</label>
                  </div>
                </div>
                <div className="col s12">
                  <ul>
                    {selectedUsers.length >= 1 ?
                      selectedUsers.map(selectedUser => (<li
                        key={selectedUser.id}
                      >
                        <a
                          className={`${this.state.isSelected.includes(selectedUser.id) ? 'link_disabled' : ''} ${computeClass(
                            selectedUser.groups.map(group =>
                              group.id).includes(currentGroupId))}`}
                          role="button"
                          tabIndex={-1}
                          onClick={
                            () => this.onAddUserToGroup(selectedUser.id)
                          }
                        >
                          @{selectedUser.username}
                        </a>
                        { selectedUser.groups.map(
                          group => group.id).includes(currentGroupId) &&
                          <span
                            className="new badge"
                            data-badge-caption="Member"
                          />
                        }
                      </li>))
                      : <li />
                    }
                  </ul>
                  {
                    this.state.selectedUsers.length > 0 ?
                      <Pagination
                        pageCount={this.state.totalPageCount}
                        handlePageClick={this.handlePageClick}
                      /> : null
                  }
                </div>
                <div className="col s12">
                  <p className="center">
                    <button
                      className="btn-large waves-effect waves-light"
                      onClick={this.onSearchUserInGroup}
                    >Search</button> or
                    <button
                      className="btn-large waves-effect waves-light"
                      onClick={this.onShowGroupMessages}
                    >Enter Group</button>
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
  onSearchUser: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  groupData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]).isRequired
};

const mapDispatchToProps = {
  onSearchUser,
  onAddUser,
  fetchMessages
};

/**
 * 
 * @param {object} state, AuthData, groupData
 * @return {onbject} state, authData, groupData
 */
function mapStateToProps({ authData, groupData }) {
  return {
    authData,
    groupData
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(AddUserToGroupBoard));

