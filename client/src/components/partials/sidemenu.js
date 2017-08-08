import React from "react";
// import { connect } from "react-redux";
// import api from "../helpers/api";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/SideMenu.css"; // SideMenu.scss
// import logo from "./../../images/logo.svg";

class SideMenu extends React.Component {

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
                <li><a href="">Laravel Group</a></li>
                <li><a href="">Django Group</a></li>
                <li><a href="">Firebase Group</a></li>
                <li><a href="">NodeJS Group</a></li>
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
