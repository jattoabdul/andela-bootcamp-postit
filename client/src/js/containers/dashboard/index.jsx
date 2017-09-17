import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { onLogoutUser } from "../../actions/authAction";
import {
	fetchUserGroups,
	setSelectedGroupAsCurrent,
	fetchMessages } from "../../actions/groupAction";
import DashboardRoutes from './dashboardRoute';
import { SideMenu, MainNav } from "./../../components/partials/";

class BaseDashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: "",
			userGroups: null,
			currentGroup: null,
			groupMessages: null,
			username: "",
			fullName: ""
		};
		// this.gotoAddUserToGroup = this.gotoAddUserToGroup.bind(this);
		this.openMessageBoard = this.openMessageBoard.bind(this);
		this.onLogOut = this.onLogOut.bind(this);
	}
	// check if user is authenticated!
	componentWillMount() {
		if (sessionStorage.getItem("user") === null) {
			this.props.history.push(`/login`);
			return;
		}
		this.props.fetchUserGroups();
	}

	componentWillReceiveProps(nextProps) {
		const { authData: { currentUserData },
			groupData: {
				userGroups,
				currentGroup,
				groupMessages } } = nextProps;
		this.setState({
			userGroups: !isEmpty(userGroups) ? userGroups : null,
			username: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
				? currentUserData.data.username : '',
			fullName: !isEmpty(currentUserData) && !isEmpty(currentUserData.data)
				? currentUserData.data.fullName : '',
			currentGroup: !isEmpty(currentGroup) ? currentGroup : null,
			groupMessages: !isEmpty(groupMessages) ? groupMessages : null
		});
	}

	//add user to group called here for sidebar
	// gotoAddUserToGroup(groupId) {
	// 	// redirecting to add user to group component
	// 	this.props.history.push(`/dashboard/${groupId}/addusertogroup`);
	// }

	openMessageBoard(group, groupId){
		//setCurrentGroup in redux store
		this.props.setSelectedGroupAsCurrent(group);
		//call load messages action on enter of group
		this.props.fetchMessages(groupId).then(
      (item) => {
        // redirect to the message board
        this.props.history.push(`/dashboard/messages/${groupId}`);
      }
    );
	}

	onLogOut() {
		this.props.onLogoutUser();
		// redirecting
		this.props.history.push('/login');
	}

	render() {
		const { fullName, username, userGroups, currentGroup } = this.state;
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
							handleOpenMessageBoard={this.openMessageBoard}
							handleLogout={this.onLogOut} />
						<div id="appBoard" className="col s10 m9 l10 no-padding">
							<MainNav />
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
	setSelectedGroupAsCurrent: PropTypes.func,
	fetchMessages: PropTypes.func,	
	onLogoutUser: PropTypes.func,
	groupData: PropTypes.object.isRequired,
	authData: PropTypes.object.isRequired
}

const mapDispatchToProps = {
	fetchUserGroups,
	setSelectedGroupAsCurrent,
	fetchMessages,
	onLogoutUser
}

function mapStateToProps({ authData, groupData }) {
	return {
		authData,
		groupData
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BaseDashboard));