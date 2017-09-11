import React from "react";
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { getGroupMessage, createNewGroupMessage } from './../../actions/messagesActions';

class MessageInputForm extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
        text: '',
        priority: '',
        error_messages: {},
        isSending: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
  }

componentDidMount() {
    var element = ReactDOM.findDOMNode(this.refs.dropdown)
  
    $(element).ready(function() {
      $('select').material_select();
    });
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  onSendMessage(e) {
    e.preventDefault();
    // console.log("creating group");
    this.setState({
        error_messages: {},
        isSending: true
    });
    this.props.createNewGroupMessage(this.state)
        .then(
            () => {
                console.log('toast new message created');
            });
  }

  render() {
    const { error_messages, text, priority, isSending } = this.state;
    return (
        <div id="messageBox" className="row">
            <form
            onSubmit={this.onSendMessage}>
            <div className="col s3 m2 input-field">
                <select ref="dropdown"
                    id="priority"
                    name="priority"
                    defaultValue="Normal"
                    value={groupName}
                    onChange={this.onChange}>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
                </select>
            </div>
            <div className="col s6 m8 input-field">
                <input
                    type="text"
                    id="message2send"
                    name="text"
                    value={text}
                    onChange={this.onChange}
                    placeholder={`Type your message and hit enter
                        to send or click send`}
                    className="teal-text"/>
            </div>
            <input type="submit" value="Send"
                className="col s3 m2 btn-large waves-effect waves-light"/>
            </form>
        </div>
    );
  }
}

// function mapStateToProps( { login, group, messages }) {
//     return {
//         login,
//         group,
//         messages
//     }
// }

const mapDispatchToProps = {
    createNewGroupMessage
  }
  
  
  MessageInputForm.PropTypes = {
  messages: PropTypes.object.isRequired,
  createNewGroupMessage: PropTypes.func.isRequired
  }
  
  export default connect(null, mapDispatchToProps)(withRouter(MessageInputForm));
