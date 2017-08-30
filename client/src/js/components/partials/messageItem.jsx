import React from "react";
// import { connect } from "react-redux";
// import registerUser from "../../actions/registerUser";
// import Api from "../../utils/api";
// import { UserView } from "./../partials/";
// import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageItem.css"; // MessageItem.scss

class MessageItem extends React.Component {

  render() {
    return (
      <div className="chat card">
        <img src={`https://robohash.org/jattoade?size=50x50`}
            alt="jattoade" className="left"/>
        <div className="message left">
            <p className="sender_details">Aminujatto
              <span className="sender_username"> @jattoade</span>
            </p>
            <p className="sender_message">
                some test is great
            </p>
        </div>
        <div className="right details">
            <p className="date right">
              12/2/2017 &nbsp;
                <i
                className="status icon ion-email-unread x15"></i>
              <br/>
              <span className="time">12:34</span>
            </p>
        </div>
      </div>
    );
  }
}

export default MessageItem;
