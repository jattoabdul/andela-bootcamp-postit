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
			fullName: props.fullName || "",
			activeClassList: false,
			activeClassAnchor: false
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

	// this.props.handleOnResetCurrentGroup()
	
	openNextMessageBoard(userGroup){
		const { currentGroup } = this.state;
		// get the crrentGroup Id from the location and strip out the url
		const path = this.props.location.pathname;
		const currGroupId = currentGroup && currentGroup.id;
		const isloadedMessages= !!path.match('/dashboard/message');
		if (!isloadedMessages) {
			this.props.handleOpenMessageBoard(userGroup);
		}
		else if (isloadedMessages && currGroupId !== userGroup.id){
			this.props.handleOpenMessageBoard(userGroup);
		}
	}

	render() {
		const { 
				username, fullName,
				currentGroup, userGroups,
				activeClassList, activeClassAnchor } = this.state;
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
								.map(userGroup =>  
									<li className={currentGroup && (userGroup.id === currentGroup.id) ? 'channels activeChannel' : 'channels'}
										key={userGroup.id}>
										<a
										className={currentGroup && (userGroup.id === currentGroup.id) ? 'white-text' : 'wheat-text'}
											onClick={() => this.openNextMessageBoard(userGroup) }>
											{userGroup.name}
										</a>
									</li>)
							: this.state.userGroups
					}
				</ul>
				<div className="buttomNavs container">
					<a className="left channels"
						onClick={() => this.props.handleAddUserToGroup()}>
						<i className="icon ion-person-add"></i>
					</a>
					<a onClick={() => this.props.handleLogout()}
						className="right channels">
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

{/* <li className={activeClassList ? 'channels activeChannel' : 'channels'}
	key={userGroup.id}>
	<a
	className={activeClassAnchor ? 'white-text' : 'wheat-text' }
		onClick={() => this.openNextMessageBoard(userGroup) }>
		{userGroup.name}
	</a>
</li> */}
