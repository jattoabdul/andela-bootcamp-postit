import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import Api from "../../utils/api";


class SideMenu extends React.Component {

  render() {
    return (
        <div id="roomsView"
            className="col s2 m3 l2 blue-grey darken-4 white-text">
            <div className="right-align">
            <i className="icon ion-navicon x3 waves-effect waves-light button-collapse"></i>
            </div>
            <img className="profilePic"
                src="https://robohash.org/jatto" alt="Profile"/>
            <p className="flow-text center profileName">
                Aminujatto
                <small>
                    <br/><a href="" className="username">@jatttoade</a>
                </small>
            </p>
            <br/>
            <h4 className="sideheading">
                Groups <i className="icon ion-ios-people"></i>
            </h4>
            <ul>
                <li>
                    <a>
                        Django Dev
                    </a>
                </li>
            </ul>

            <div className="buttomNavs container">
                <a className="left">
                    <i className="icon ion-person-add"></i>
                </a>
                <a className="right">
                    <i className="icon ion-android-exit"></i>
                </a>
            </div>
        </div>
    );
  }
}


export default SideMenu;
