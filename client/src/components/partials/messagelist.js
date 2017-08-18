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
                          key={message.id}
                          id={message.id}
                          sender={message.user.username}
                          senderFullName={message.user.fullName}
                          username={this.props.username}
                          fullName={this.props.fullName}
                          openMessageBody={this.props.openMessageBody} />)
        }
        </div>
    );
  }
}

export default MessageList;
