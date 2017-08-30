import React from "react";
// import { connect } from "react-redux";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
// import { MessageItem } from "./../partials/";
// import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageInputForm.css"; // MessageInputForm.scss

class MessageInputForm extends React.Component {
//   constructor(props) {
//     super(props);
//     // this.state = {
//     //   priority: "normal"
//     // };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     // this.handleSubmit = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ priority: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.appendChatMessage(this.priority.value, this.messageInput.value);
//     this.priority.value = "";
//     this.messageInput.value = "";
//   }


  render() {
    return (
        <div id="messageBox" className="row">
            <form>
            <div className="col s3 m2 input-field">
                <select defaultValue="Normal"
                    id="priority" name="priority">
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
                </select>
            </div>
            <div className="col s6 m8 input-field">
                <input type="text" id="message2send"
                placeholder=
                "Type your message and hit enter to send or click send"
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
