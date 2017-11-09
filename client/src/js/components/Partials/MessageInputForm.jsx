import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/index.scss';
/**
 * @typedef {object} event
 */

/**
 * Display MessageInputForm
 * @class MessageInputForm
 * @extends {React.Component}
 * @param {any} props
 */
class MessageInputForm extends React.Component {
  /**
   * Creates an instance of MessageInputForm
   * @param {any} props
   * @memberof MessageInputForm
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      priority: 'Normal',
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @param {void} null
   * @return {void} null
   */
  componentDidMount() {
    $('select').material_select();
    $('#priority').on('change', this.handleChange);
  }

  /**
   * Handle Change Method
   * @param {event} event
   * @return {void}
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handle submit of Message item
   * @param {event} event
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.appendChatMessage(this.state.priority, this.state.message);
    this.setState({
      priority: 'Normal',
      message: ''
    });
  }

  /**
   * Render Method
   * @return {dom} DomElement
   */
  render() {
    return (
      <div id="messageBox" className="row">
        <form onSubmit={this.handleSubmit}>
          <div className="col s4 m2 input-field">
            <select
              name="priority"
              id="priority"
              onChange={this.handleChange}
              value={this.state.priority}
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div className="col s8 m8 input-field">
            <input
              type="text"
              id="message2send"
              autoComplete="off"
              name="message"
              placeholder="Type your message and hit enter to send or click send"
              value={this.state.message}
              onChange={this.handleChange}
              className="teal-text"
            />
          </div>
          <input
            id="sendMsgButton"
            type="submit"
            value="Send"
            className="col s3 m2 btn-large"
          />
        </form>
      </div>
    );
  }
}

MessageInputForm.propTypes = {
  appendChatMessage: PropTypes.func.isRequired
};

export default MessageInputForm;
