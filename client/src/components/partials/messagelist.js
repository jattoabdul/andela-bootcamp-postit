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
          {
            this.props.messages.map(message =>
                <MessageItem createdAt={message.createdAt}
                          priority={message.priority}
                          text={message.text}
                          key={message.id} />)
        }
        </div>
    );
  }
}

export default MessageList;
