import React from "react";
// import { connect } from "react-redux";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
// import { MessageItem } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageInputForm.css"; // MessageInputForm.scss

class MessageInputForm extends React.Component {

  render() {
    return (
        <div id="messageBox" className="row">
            <form>
            <div className="col s3 m2 input-field">
                <select id="priority">
                <option value="normal">Normal</option>
                <option value="important">Important</option>
                <option value="urgent">Urgent</option>
                </select>
            </div>
            <div className="col s6 m8 input-field">
                <input type="text" id="message2send"
                placeholder=
                "Type your message and hit enter to send or click send"
                className="teal-text"/>
            </div>
            <button className="col s3 m2 btn-large waves-effect waves-light">
                Send
            </button>
            </form>
        </div>
    );
  }
}

export default MessageInputForm;
