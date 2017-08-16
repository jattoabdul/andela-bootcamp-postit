import React from "react";
// import { connect } from "react-redux";
// import Api from "../../utils/api";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MainNav.css"; // MainNav.scss

class MainNav extends React.Component {

  render() {
    return (
        <nav className="blue-grey darken-4">
          <div className="nav-wrapper">
            <a href="/dashboard" className="brand-logo center">
              POSTiT
              <i className="icon ion-speakerphone left x2"></i>
              <sub><small>you dont have to shout</small></sub>
            </a>
            <ul className="right">
              <li>
                <a href="" className="waves-effect waves-light">
                  <i className="icon ion-android-more-vertical"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default MainNav;
