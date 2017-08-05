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
        <div>
            <SideMenu />
            <MainNav />
            <UserView />
            <MessageList />
            <MessageInputForm />
        </div>
    );
  }
}

export default MessageBoard;
