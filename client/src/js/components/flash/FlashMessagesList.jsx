import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from './../../actions/flashMessages.js';

class FlashMessageList extends React.Component {
    render() {
        const messages = this.props.messages.map(message =>
            <FlashMessage 
                key={message.id} message={message}
                deleteFlashMessage={this.props.deleteFlashMessage} />
        );
      return (
        <div>
            {messages}
        </div>
      );
}
}

FlashMessageList.PropTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage:  PropTypes.func.isRequired        
}

function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps, { deleteFlashMessage  })(FlashMessageList);