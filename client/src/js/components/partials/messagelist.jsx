import React from 'react';
import { MessageItem } from './../partials/';
import '../../../styles/index.scss';

/**
 * @class MessageList
 */
class MessageList extends React.Component {
  /**
   * 
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      listed: true
    };
  }

  /**
   * @return {dom} DomElement
   */
  render() {
    return (
      <div className="chats">
        {this.props.messages.map(message => (
          <MessageItem
            createdAt={message.createdAt}
            priority={message.priority}
            text={message.text}
            key={message.id}
            id={message.id}
            readBy={message.readBy}
            sender={message.user.username}
            senderFullName={message.user.fullName}
            username={this.props.username}
            fullName={this.props.fullName}
            updateReadBy={this.props.updateReadBy}
          />
        ))}
      </div>
    );
  }
}

export default MessageList;
