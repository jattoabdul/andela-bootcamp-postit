import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Api from "../../utils/api";

import '../../../styles/index.scss';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    // this.onShowGroupMessages = this.onShowGroupMessages.bind(this);
    this.state = {
      error: "",
      userGroups: null,
      username: props.username || "",
      fullName: props.fullName || ""
    };
  }

  componentWillReceiveProps(nextProps){
    const {username, fullName, userGroups } = this.props
    console.log(username, fullName, userGroups)
    this.setState({
        userGroups: !isEmpty(userGroups) ? userGroups : null,
        username: username? username : 'i dont know',
        fullName:  fullName ? fullName : 'not set',
        });
  }

//   onShowGroupMessages(gId) {
//     Api(null, `/api/v1/groups/${gId}/messages/`, "GET").then(
//         (groupMessages) => {
//           // redirecting
//           this.props.history.push(`/dashboard/messages/${gId}`);
//         //   window.location = `/#/dashboard/messages/${gId}`;
//         }
//     );
//   }

  render() {
    // const { authData: {isAuthenticated, currentUserData} } = this.props;
    // console.log(`currentUserData:`, currentUserData);
    // console.log(`isAuthenticated:`, isAuthenticated);
    const {username, fullName} = this.state;
    // console.log('username', username);
    // console.log(`this.props in render:`, this.props);
    // const { userGroups, currentGroup, isLoadingGroups } = this.props.groupData;
    return (
        <div id="roomsView"
            className="col s2 m3 l2 blue-grey darken-4 white-text">
            <div className="right-align">
            <i className="icon ion-navicon x3 waves-effect waves-light button-collapse"></i>
            </div>
            <img className="profilePic"
                src={`https://robohash.org/${username}`} alt="Profile"/>
            <p className="flow-text center profileName">
                {fullName}
                <small>
                    <br/><a href="" className="username">@{username}</a>
                </small>
            </p>
            <br/>
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
                            onClick={
                                () => {}}>
                              {userGroup.name}
                            </a>
                        </li>)
                    : this.state.userGroups
                }
            </ul>
            {/* this.onShowGroupMessages(userGroup.id) */}
            <div className="buttomNavs container">
                <a onClick={this.props.gotoAddUserToGroup} className="left channels">
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
    fetchUserGroups: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    groupData: PropTypes.object.isRequired,
    authData: PropTypes.object.isRequired
}

export default withRouter(SideMenu);