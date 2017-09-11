import React from "react";
import ReactDOM from 'react-dom';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from './../../actions/loginActions';
import { addUserToGroup,
    fetchUserGroups,
    sideBarSetCurrentGroup } from './../../actions/groupActions';

class SideMenu extends React.Component {

  constructor(props) {
      super(props)

      this.onLogout = this.onLogout.bind(this);
      this.onAddToGroup = this.onAddToGroup.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserGroups();
  }

  onAddToGroup(e) {
      e.preventDefault();
      const groupId = this.props.group.currentGroup.id;
    //   const groupId =this.props.match.params.groupId;
    //   console.log(groupId);
      // redirecting to add user to group component
      this.props.history.push(`/add/${groupId}/user`);
  }

  onOpenGroup(group){
    // e.preventDefault();
    // fire setCurrentGroupDetails Action
    this.props.sideBarSetCurrentGroup(group);
    const groupId = group.id;
    // redirecting to group message board
    // console.log(`setting current group ${groupId} on messageBoard`, group);
    this.props.history.push(`/dashboard/${groupId}/message`);
  }

  onLogout(){
      this.props.logout();
      // redirecting
      this.props.history.push('/login');
  }

  render() {
       const { isAuthenticated, user } = this.props.login;
       const { groups, isLoadingGroup } = this.props.group;
    //    console.log(user, 'sidemenu bastard props');

      const GroupItems = ({name, onClick}) => {
        // const className = isSelected ? "channels teal-text" : "channels white-text";
        const className = "channels white-text";
        return (
          <li onClick={onClick} className={className}>{name}</li>
        );
      };

    return (
        <div id="roomsView"
            className="col s2 m3 l2 blue-grey darken-4 white-text">
            <div className="right-align">
            <Link to="/dashboard">
                <i  className={`icon ion-home x3 waves-effect
                    waves-light`}></i>
            </Link>
            </div>
            <img className="profilePic"
                src={ user === null ?
                    "https://robohash.org/guest" :
                    `https://robohash.org/${user.data.username}`} alt="Profile"/>
            <p className="flow-text center profileName">
                {user === null ? "Guest" : user.data.fullName}
                <small>
                    <br/><a className="username">@{ user === null ? "Guest" : user.data.username}</a>
                </small>
            </p>
            <br/>
            <h4 className="sideheading">
                Groups <i className="icon ion-ios-people"></i>
                <span className="right">
                <Link to="/create-group">
                    <i className="icon ion-android-add-circle"></i>
                </Link>
                </span>
            </h4>
            <ul>
                {
                  isLoadingGroup !== true ? 
                  groups.map((userGroup) => {
                    {/* const is_selected = selectedChannelId === userGroup.id; */}
                    {/* const onChannelSelect = () => openAndSelectChannel(userGroup.id); */}
                    {/* isSelected={is_selected} */}
                    const onChannelSelect = () => this.onOpenGroup(userGroup);
                    return <GroupItems key={userGroup.id} name={userGroup.name}
                      onClick={onChannelSelect} />
                  }) : <li>Group Loading ...</li>
                }
            </ul>

            <div className="buttomNavs container">
                <span
                    onClick={this.onAddToGroup}
                    className="left">
                    <i className="icon ion-person-add"></i>
                </span>
                <span
                    onClick={this.onLogout}
                    className="right">
                    <i className="icon ion-android-exit"></i>
                </span>
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
    logout,
    fetchUserGroups,
    sideBarSetCurrentGroup
}

SideMenu.PropTypes = {
    logout: PropTypes.func.isRequired,
    fetchUserGroups: PropTypes.func.isRequired,
    sideBarSetCurrentGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));
