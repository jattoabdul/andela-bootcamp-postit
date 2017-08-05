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
        <div>
            <textarea
                name="input-message" id="input-message" cols="20" rows="2">
            </textarea>
        </div>
    );
  }
}

export default MessageInputForm;
