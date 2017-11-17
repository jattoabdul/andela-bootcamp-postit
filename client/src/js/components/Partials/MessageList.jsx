import React from 'react';
import PropTypes from 'prop-types';
import { MessageItem } from './../Partials/';

/**
 * Display MessageList
 * @class MessageList
 * @extends {React.Component}
 * @param {any} props
 */
export class MessageList extends React.Component {
  /**
   * Creates an instance of MessageList
   * @param {any} props
   * @memberof MessageList
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      listed: true
    };
  }

  /**
   * Render Method
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

MessageList.propTypes = {
  updateReadBy: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MessageList;
