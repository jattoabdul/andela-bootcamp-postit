import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { onLogoutUser } from '../../actions/authAction';
import {
  fetchUserGroups,
  setSelectedGroupAsCurrent,
  fetchMessages,
  setSelectedGroupMembers
} from '../../actions/groupAction';
import DashboardRoutes from './DashboardRoutes';
import { SideMenu, MainNav } from './../../components/Partials/';

/**
 * @typedef {object} event
 */

/**
 * @description Display BaseDashboard
 * 
 * @class BaseDashboard
 * 
 * @extends {React.Component}
 * 
 * @param {any} props
 */
class BaseDashboard extends Component {
  /**
   * Creates an instance of BaseDashboard
   * @param {any} props
   * @memberof BaseDashboard
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      userGroups: null,
      currentGroup: null,
      currentGroupMembers: null,
      groupMessages: null,
      username: '',
      fullName: '',
      sideNavStatus: false
    };
    this.addAUser = this.addAUser.bind(this);
    this.openMessageBoard = this.openMessageBoard.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  /**
   * conponentWIllMount Life Cycle Method - check if user is authenticated!
   * @return {void}
   */
  componentWillMount() {
    this.props.fetchUserGroups();
  }

  /**
   * componentWillReceiveProps Life Cycle Mehtod
   * @param {*} nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const {
      authData: { currentUserData },
      groupData: {
        userGroups,
        currentGroup,
        groupMessages,
        currentGroupMembers
      }
    } = nextProps;
    this.setState({
      userGroups: !isEmpty(userGroups) ? userGroups : null,
      username:
        !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
          ? currentUserData.data.username
          : '',
      fullName:
        !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
          ? currentUserData.data.fullName
          : '',
      currentGroup: !isEmpty(currentGroup) ? currentGroup : null,
      groupMessages: !isEmpty(groupMessages) ? groupMessages : null,
      currentGroupMembers: !isEmpty(currentGroupMembers)
        ? currentGroupMembers
        : null
    });
  }

  /**
   * onLogOut Method
   * @param {void} void
   * @return {void}
   */
  onLogOut() {
    this.props.onLogoutUser();
    // redirecting
    // eslint-disable-next-line
    this.props.history.push('/login');
  }

  /**
   * toggleSideNav Method
   * @param {event} event
   * @return {void}
   */
  toggleSideNav(event) {
    event.preventDefault();
    this.setState({
      sideNavStatus: !this.state.sideNavStatus
    });
  }

  /**
   * openMessageBoard
   * @param {object} group 
   * @return {void}
   */
  openMessageBoard(group) {
    // setCurrentGroup in redux store
    this.props.setSelectedGroupAsCurrent(group);
    // get Group Members on enter of groups and fetching messages
    this.props.setSelectedGroupMembers(group.id).then(usersItem => usersItem);
    // call load messages action on enter of group
    this.props.fetchMessages(group.id).then(() => {
      // redirect to the message board
      // eslint-disable-next-line
      this.props.history.push(`/dashboard/messages/${group.id}`);
    });
  }

  /**
   * add a user to currentGroup
   * @param {void} void
   * @return {void}
   */
  addAUser() {
    // eslint-disable-next-line
    const path = this.props.location.pathname;
    const isInGroup = !!path.match('/dashboard/message');
    if (!isInGroup) {
      // eslint-disable-next-line
      Materialize.toast('Please Select A Group', 2000);
    } else if (isInGroup) {
      // eslint-disable-next-line
      const locationUrl = this.props.location.pathname;
      const groupId = locationUrl.split('/')[3];
      // eslint-disable-next-line
      this.props.history.push(`/dashboard/${groupId}/addusertogroup`);
    }
  }

  /**
   * Render Method
   * @return {dom} DomElement
   */
  render() {
    const {
      fullName,
      username,
      userGroups,
      currentGroup,
      sideNavStatus
    } = this.state;
    return (
      <div>
        <div id="dashContainer" className="teal lighten-5">
          <div id="appContainer" className="row no-marginbtm">
            <SideMenu
              {...this.props}
              username={username}
              fullName={fullName}
              userGroups={userGroups}
              currentGroup={currentGroup}
              sideNavStatus={sideNavStatus}
              handleOpenMessageBoard={this.openMessageBoard}
              handleLogout={this.onLogOut}
              handleAddUserToGroup={this.addAUser}
              toggleSideNav={this.toggleSideNav}
            />
            <div id="appBoard" className="col s12 m9 l10 no-padding">
              <MainNav
                sideNavStatus={sideNavStatus}
                toggleSideNav={this.toggleSideNav}
                handleLogout={this.onLogOut}
              />
              <div className="containers">
                <DashboardRoutes {...this.props} {...this.state} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BaseDashboard.propTypes = {
  fetchUserGroups: PropTypes.func.isRequired,
  setSelectedGroupAsCurrent: PropTypes.func.isRequired,
  setSelectedGroupMembers: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  onLogoutUser: PropTypes.func.isRequired,
  groupData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.array
  ]).isRequired,
  authData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool
  ]).isRequired
};

const mapDispatchToProps = {
  fetchUserGroups,
  setSelectedGroupAsCurrent,
  setSelectedGroupMembers,
  fetchMessages,
  onLogoutUser
};

/**
 * 
 * @param {object} state - authData, groupData
 * @return {object} state - authData, groupData
 */
function mapStateToProps({ authData, groupData }) {
  return {
    authData,
    groupData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(BaseDashboard)
);
