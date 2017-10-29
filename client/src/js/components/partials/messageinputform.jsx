import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import '../../../styles/index.scss';
/**
 * @typedef {object} event
 */

const options = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Urgent', label: 'Urgent' },
  { value: 'Critical', label: 'Critical' }
];

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
    this.handleSelectChange = this.handleSelectChange.bind(this);
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
   * Handle priority select change
   * @param {string} option
   * @return {void}
   */
  handleSelectChange(option) {
    this.setState({
      priority: option
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
            <Select
              name="priority"
              value={this.state.priority}
              options={options}
              onChange={this.handleSelectChange}
            />
          </div>
          <div className="col s8 m8 input-field">
            <input
              type="text"
              id="message2send"
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
