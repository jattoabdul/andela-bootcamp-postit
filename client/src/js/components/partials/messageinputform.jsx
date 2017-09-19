import React from "react";
import Select from 'react-select';
import '../../../styles/index.scss';

const options = [
    { value: 'Normal', label: 'Normal' },
    { value: 'Urgent', label: 'Urgent' },
    { value: 'Critical', label: 'Critical' }
]

class MessageInputForm extends React.Component {
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

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleSelectChange(option) {
      
      this.setState({
          priority: option
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.appendChatMessage(this.state.priority, this.state.message);
    this.setState({
        priority: 'Normal',
        message: ''
    });
  }

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
                <input type="text"
                id="message2send"
                name="message"
                placeholder=
                "Type your message and hit enter to send or click send"
                value={this.state.message}
                onChange={this.handleChange}
                className="teal-text"/>
            </div>
            <input type="submit" value="Send"
                className="col s3 m2 btn-large waves-effect waves-light"/>
            </form>
        </div>
    );
  }
}

export default MessageInputForm;
