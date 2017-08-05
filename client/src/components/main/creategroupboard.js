import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
import { SideMenu, MainNav } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/CreateGroupBoard.css"; // CreateGroupBoard.scss

class CreateGroupBoard extends React.Component {

  render() {
    return (
        <div>
            <SideMenu />
            <MainNav />
            <div>
                <p>create group form goes in here</p>
            </div>
        </div>
    );
  }
}

export default CreateGroupBoard;
