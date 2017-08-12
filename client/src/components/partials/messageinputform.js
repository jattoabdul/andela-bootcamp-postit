import React from "react";
// import { connect } from "react-redux";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
// import { MessageItem } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageInputForm.css"; // MessageInputForm.scss

class MessageInputForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   priority: "normal"
    // };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmit = this.handleChange.bind(this);
  }

//   handleChange(event) {
//     this.setState({ priority: event.target.value });
//   }

  handleSubmit(event) {
    event.preventDefault();
    this.props.appendChatMessage(this.priority.value, this.messageInput.value);
    this.priority.value = "";
    this.messageInput.value = "";
  }


  render() {
    return (
        <div id="messageBox" className="row">
            <form onSubmit={this.handleSubmit}>
            <div className="col s3 m2 input-field">
                <select value="normal"
                    ref={ (select) => { this.priority = select; }}
                    id="priority" name="priority">
                <option value="normal">Normal</option>
                <option value="important">Important</option>
                <option value="urgent">Urgent</option>
                </select>
            </div>
            <div className="col s6 m8 input-field">
                <input type="text" id="message2send"
                placeholder=
                "Type your message and hit enter to send or click send"
                ref={ (message) => { this.messageInput = message; }}
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

// <button className="col s3 m2 btn-large waves-effect waves-light">
//   Send
// </button>
