import React from 'react';
import '../../../styles/index.scss';

/**
 * @class MessageBody
 */
class MessageBody extends React.Component {
  /**
   * 
   * @return {dom} DomElement
   */
  render() {
    return (
      <div className="chats">
        <div className="chat card">
          <div className="message">
            <p className="flow-text">
              {this.props.text} + id of the message enters here this.props.text
              + id of the message enters here this.props.text + id of the
              message enters here this.props.text + id of the message enters
              here this.props.text + id of the message enters here
              this.props.text + id of the message enters here this.props.text +
              id of the message enters here this.props.text + id of the message
              enters here
            </p>
            <i
              onClick={this.props.closeMessageBody}
              className="closeMessageBody icon ion-close x15"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBody;
