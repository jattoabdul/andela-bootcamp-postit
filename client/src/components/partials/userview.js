import React from "react";
// import { connect } from "react-redux";
// import api from "../helpers/api";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/UserView.css"; // UserView.scss

class UserView extends React.Component {

  render() {
    return (
        <div>
            <ul>
                <li>image with badge(online/offline)</li>
                <li>image with badge(online/offline)</li>
            </ul>
            <button>icon</button>
        </div>
    );
  }
}

export default UserView;
