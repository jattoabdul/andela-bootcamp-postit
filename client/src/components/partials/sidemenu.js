import React from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import Api from "../../utils/api";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/SideMenu.css"; // SideMenu.scss

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onShowGroupMessages = this.onShowGroupMessages.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.state = {
      error: "",
      userGroups: null,
      username: "",
      fullName: ""
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("user") !== null) {
      Api(null, `/api/user/`, "GET").then(
            (userGroupsResponse) => {
              console.log("=======> user group res with", userGroupsResponse.data.groups);
              this.setState({
                userGroups: userGroupsResponse.data.groups,
                username: userGroupsResponse.data.username,
                fullName: userGroupsResponse.data.fullName
              });
            }
        );
    }
  }
  onShowGroupMessages(gId) {
    Api(null, `/api/groups/${gId}/messages/`, "GET").then(
        (groupMessages) => {
          console.log(groupMessages, "====> group messages");
          window.location = `/dashboard/messages/${gId}`;
        }
    );
  }

  onLogOut() {
    window.location = `/login`;
    sessionStorage.removeItem("user");
  }
  render() {
    return (
        <div id="roomsView"
            className="col s2 m3 l2 blue-grey darken-4 white-text">
            <div className="right-align">
            <i className="icon ion-navicon x3 waves-effect waves-light"></i>
            </div>
            <img className="profilePic"
                src={`https://robohash.org/${this.state.username}`} alt="Profile"/>
            <p className="flow-text center profileName">
                {this.state.fullName}
                <small>
                    <br/><a href="" className="username">@{this.state.username}</a>
                </small>
            </p>
            <br/>
            <h4 className="sideheading">
                Groups <i className="icon ion-ios-people"></i>
            </h4>
            <ul>
                {
                    this.state.userGroups !== null ?
                    this.state.userGroups
                        .map(userGroup => <li key={userGroup.id}>
                            <a
                            onClick={
                                () => this.onShowGroupMessages(userGroup.id)}>
                              {userGroup.name}
                            </a>
                        </li>)
                    : this.state.userGroups
                }
            </ul>

            <div className="buttomNavs container">
                <a href="" className="left">
                    <i className="icon ion-person-add"></i>
                </a>
                <a onClick={() => this.onLogOut()} className="right">
                    <i className="icon ion-android-exit"></i>
                </a>
            </div>
        </div>
    );
  }
}


export default SideMenu;
