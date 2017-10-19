import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import '../../../styles/index.scss';

const options = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Urgent', label: 'Urgent' },
  { value: 'Critical', label: 'Critical' }
];

/**
 * 
 * @class MessageInputForm
 */
class MessageInputForm extends React.Component {
  /**
   * 
   * @param {*} props 
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
   * 
   * @param {*} event
   * @return {void}
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * 
   * @param {*} option
   * @return {void}
   */
  handleSelectChange(option) {
    this.setState({
      priority: option
    });
  }

  /**
   * 
   * @param {*} event
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
   * 
   * @return {dom} DomElement
   */
  render() {
    return (
      <div id="messageBox" className="row">
        <form onSubmit={this.handleSubmit}>
          <div className="col s3 m2 input-field">
            <Select
              name="priority"
              value={this.state.priority}
              options={options}
              onChange={this.handleSelectChange}
            />
          </div>
          <div className="col s6 m8 input-field">
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
            type="submit"
            value="Send"
            className="col s3 m2 btn-large waves-effect waves-light"
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
