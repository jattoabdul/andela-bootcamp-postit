import React from "react";
// import { connect } from "react-redux";
// import api from "../helpers/api";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/SideMenu.css"; // SideMenu.scss
import logo from "./../../images/logo.svg";

class SideMenu extends React.Component {

  render() {
    return (
        <aside>
            <span>Navicon</span>
            <img src={logo} className="App-logo" alt="logo" />
            <p>UserProfile</p>
            <ul>
                <li>Groups</li>
                <li>Messages</li>
            </ul>
        </aside>
    );
  }
}

export default SideMenu;
