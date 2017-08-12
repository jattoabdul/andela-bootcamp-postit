import React from "react";
// import { connect } from "react-redux";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
// import { UserView } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageItem.css"; // MessageItem.scss

class MessageItem extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  render() {
    const now = new Date(this.props.timestamp);
    const hhmmss = now.toISOString().substr(11, 8);
    return (
      <div className="chat card">
        <img src="http://i.pravatar.cc/60?img=59"
            alt="@jattoade" className="left"/>
        <div className="message left">
            <p className="sender_details">Jatto {this.props.priority}
              <span className="sender_username">@jattoade</span>
            </p>
            <p className="sender_message">
                {this.props.text}
            </p>
        </div>
        <div className="right details">
            <p className="date right">
              Aug 5 &nbsp;
              <i className="status icon ion-ios-checkmark-outline x15"></i>
              <br/>
              <span className="time">{hhmmss}</span>
            </p>
        </div>
      </div>
    );
  }
}

export default MessageItem;

//       <i className="status icon ion-alert x15"></i>
