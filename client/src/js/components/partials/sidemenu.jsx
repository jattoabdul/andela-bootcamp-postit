import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import '../../../styles/index.scss';

class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		// this.addAUser = this.addAUser.bind(this);
		this.state = {
			error: "",
			userGroups: null,
			currentGroup: null,
			username: props.username || "",
			fullName: props.fullName || ""
		};
	}

	componentWillReceiveProps(nextProps) {
		const { username, fullName, userGroups, currentGroup } = nextProps;
		this.setState({
			userGroups: !isEmpty(userGroups) ? userGroups : null,
			currentGroup: !isEmpty(currentGroup) ? currentGroup : null,
			username: username ? username : '',
			fullName: fullName ? fullName : '',
		});
	}
	//   add a user to group
	//   addAUser(){
	//     const groupId =this.props.match.params.groupId;
	//     console.log('hello groupid of life', groupId)
	//     this.props.gotoAddUserToGroup(groupId);
	//   }


	render() {
		const { username, fullName, currentGroup } = this.state;
		return (
			<div id="roomsView"
				className="col s2 m3 l2 blue-grey darken-4 white-text">
				<div className="right-align">
					<i className="icon ion-navicon x3 waves-effect waves-light button-collapse"></i>
				</div>
				<img className="profilePic"
					src={`https://robohash.org/${username}`} alt="Profile" />
				<p className="flow-text center profileName">
					{fullName}
					<small>
						<br /><a href="" className="username">@{username}</a>
					</small>
				</p>
				<br />
				<h4 className="sideheading">
					Groups <i className="icon ion-ios-people"></i>
					<Link to="/dashboard/create-group">
						<i className="icon ion-plus-circled channels right">
						</i>
					</Link>
				</h4>
				<ul>
					{
						this.props.userGroups !== null ?
							this.props.userGroups
								.map(userGroup => <li className="channels"
									key={userGroup.id}>
									<a
										onClick={() => this.props.handleOpenMessageBoard(userGroup, userGroup.id) }>
										{userGroup.name}
									</a>
								</li>)
							: this.state.userGroups
					}
				</ul>
				{/* this.onShowGroupMessages(userGroup.id) */}
				<div className="buttomNavs container">
					<a className="left channels">
						<i className="icon ion-person-add"></i>
					</a>
					<a onClick={() => this.props.handleLogout()} className="right channels">
						<i className="icon ion-android-exit"></i>
					</a>
				</div>
			</div>
		);
	}
}


SideMenu.propTypes = {
	fetchUserGroups: PropTypes.func,
	handleLogout: PropTypes.func,
	handleSetCurrentGroup: PropTypes.func,
	groupData: PropTypes.object,
	authData: PropTypes.object
}

export default withRouter(SideMenu);