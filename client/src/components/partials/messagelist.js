import React from "react";
// import { connect } from "react-redux";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
import { MessageItem } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageList.css"; // MessageList.scss

class MessageList extends React.Component {

  render() {
    return (
        <div className="chats">
            <MessageItem/>
        </div>
    );
  }
}

export default MessageList;
