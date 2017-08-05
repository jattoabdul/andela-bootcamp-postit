import React from "react";
// import { connect } from "react-redux";
// import api from "../helpers/api";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MainNav.css"; // MainNav.scss

class MainNav extends React.Component {

  render() {
    return (
        <div>
            <p>Current Group Name or User FullName</p>
            <p>Description of group or username</p>
            <input type="search"/>
        </div>
    );
  }
}

export default MainNav;
