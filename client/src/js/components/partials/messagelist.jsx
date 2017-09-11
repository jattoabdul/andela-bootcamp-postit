import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MessageItem } from "./../partials/";
import { getGroupMesage,
    createNewGroupMesage } from './../../actions/messagesActions';
class MessageList extends React.Component {
  constructor(props){
    super(props);
  }

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
                readBy={message.readBy}
                sender={message.user.username}
                senderFullName={message.user.fullName} />)
      }
      </div>
    );
  }
}

MessageList.PropTypes = {
messages: PropTypes.array.isRequired
}

export default connect(null, {})(withRouter(MessageList));
