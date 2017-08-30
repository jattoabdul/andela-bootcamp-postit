import React from "react";
// import { connect } from "react-redux";
// import Api from "../../utils/api";
// import "./../../stylesheet/App.css"; // Home.scss

class UserView extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
        <div className="white right col s1" id="usersScroll">
              <ul>
                <li>
                  <a>
                    <img src="https://robohash.org/jattoade"
                      alt="{this.props.username}"/>
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

// {`https://robohash.org/${this.props.username}`}
