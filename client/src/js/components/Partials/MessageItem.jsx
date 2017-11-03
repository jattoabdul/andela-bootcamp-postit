import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/index.scss';

/**
 * Display MessageItem
 * @class MessageItem
 * @extends {React.Component}
 * @param {any} props
 */
class MessageItem extends React.Component {
  /**
   * Creates an instance of MessageItem
   * @param {any} props
   * @memberof MessageItem
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      recievedMessage: true
    };
  }

  /**
   * Render Method
   * @return {dom} DomElement
   */
  render() {
    const now = new Date(this.props.createdAt).toTimeString();
    const readableTime = now.split(' ')[0];
    return (
      <div id={this.props.id} className="chat card">
        <img
          src={`https://robohash.org/${this.props.sender}?size=50x50`}
          alt={`@${this.props.sender}`}
          className="left"
        />
        <div className="message left">
          <p className="sender_details">
            {this.props.senderFullName}
            <span className="sender_username"> @{this.props.sender}</span>
          </p>
          <p className="sender_message">{this.props.text}</p>
        </div>
        <div className="right details">
          <p className="date right">
            {new Date(this.props.createdAt.substr(0, 10))
              .toUTCString()
              .substr(0, 16)}{' '}
            &nbsp;
            {this.props.readBy.includes(this.props.username) ? (
              <i className="status icon ion-ios-checkmark x15" />
            ) : (
              <i
                onClick={() => this.props.updateReadBy(this.props.id)}
                role="button"
                tabIndex={-1}
                className="status icon ion-email-unread x15"
              />
            )}
            <br />
            <span className="time">{readableTime}</span>
          </p>
        </div>
      </div>
    );
  }
}

MessageItem.propTypes = {
  updateReadBy: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  senderFullName: PropTypes.string.isRequired,
  readBy: PropTypes.arrayOf(String).isRequired
};


export default MessageItem;
