import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
import { SideMenu,
        MainNav,
        UserView,
        MessageList,
        MessageInputForm } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageBoard.css"; // MessageBoard.scss

class MessageBoard extends React.Component {

  render() {
    return (
        <div id="dashContainer" className="teal">
          <div id="appContainer" className="row no-marginbtm">
            <SideMenu />
            <div id="appBoard" className="col s10 m9 l10 no-padding">
              <MainNav />
              <div id="chatArea" className="white-text row no-marginbtm">
                <MessageList />
                <MessageInputForm />
                <UserView />
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default MessageBoard;
