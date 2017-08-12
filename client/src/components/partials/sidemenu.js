import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Api from "../../utils/api";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/SideMenu.css"; // SideMenu.scss

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      userGroups: null
    };
    this.onShowGroupMessages = this.onShowGroupMessages.bind(this);
  }

  componentDidMount() {
    Api(null, `/api/user/`, "GET").then(
        (userGroupsResponse) => {
          console.log(userGroupsResponse.data.groups);
          this.setState({
            userGroups: userGroupsResponse.data.groups
          });
        }
    );
  }
  onShowGroupMessages(gId) {
    Api(null, `/api/groups/${gId}/messages/`, "GET").then(
        (groupMessages) => {
          console.log(groupMessages, "====> group messages");
        // this.props.history.push(`/dashboard/message/${gId}`);
        }
    );
  }
  render() {
    return (
        <div id="roomsView"
            className="col s2 m3 l2 blue-grey darken-4 white-text">
            <div className="right-align">
            <i className="icon ion-navicon x3 waves-effect waves-light"></i>
            </div>
            <img className="profilePic"
                src="http://i.pravatar.cc/150?img=59" alt="Profile"/>
            <p className="flow-text center profileName">
                Abdulqahar Aminujatto
                <small>
                    <br/><a href="" className="username">@jattoade</a>
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
                            <Link to="/dashboard/messages"
                            onClick={
                                () => this.onShowGroupMessages(userGroup.id)}>
                              {userGroup.name}
                            </Link>
                        </li>)
                    : this.state.userGroups
                }
            </ul>

            <div className="buttomNavs container">
                <a href="" className="left">
                    <i className="icon ion-person-add"></i>
                </a>
                <a href="" className="right">
                    <i className="icon ion-android-exit"></i>
                </a>
            </div>
        </div>
    );
  }
}


export default SideMenu;
