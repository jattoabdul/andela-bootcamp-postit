import React from "react";
// import { connect } from "react-redux";
// import api from "../helpers/api";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/UserView.css"; // UserView.scss

class UserView extends React.Component {

  render() {
    return (
        <div className="white right col s1" id="usersScroll">
              <ul>
                <li>
                  <a
                  href="">
                    <img src="http://i.pravatar.cc/80?img=23" alt=""/>
                  </a>
                </li>
                <li>
                  <a
                  href="">
                    <img src="http://i.pravatar.cc/80?img=59" alt=""/>
                  </a>
                </li>
                <li>
                  <a
                  href="">
                    <img src="http://i.pravatar.cc/80?img=24" alt=""/>
                  </a>
                </li>
                <li>
                  <a
                  href="">
                    <img src="http://i.pravatar.cc/80?img=34" alt=""/>
                  </a>
                </li>
                <li>
                  <a
                  href="">
                    <img src="http://i.pravatar.cc/80?img=17" alt=""/>
                  </a>
                </li>
              </ul>
              <span className="bottomSearch waves-effect waves-teal">
                <i className="icon ion-ios-search teal-text x25"></i>
              </span>
            </div>
    );
  }
}

export default UserView;
