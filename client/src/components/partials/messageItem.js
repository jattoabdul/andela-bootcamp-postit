import React from "react";
// import { connect } from "react-redux";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
// import { UserView } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/MessageItem.css"; // MessageItem.scss

class MessageItem extends React.Component {

  render() {
    return (
      <div>
        <div className="chat card">
          <img src="http://i.pravatar.cc/60?img=59"
              alt="@jattoade" className="left"/>
          <div className="message left">
              <p className="sender_details">Jatto Abdulqahhar
                <span className="sender_username">@jattoade</span>
              </p>
              <p className="sender_message">
                  Hi everyone! It&rsquo;s my pleasure to be here
              </p>
          </div>
          <div className="right details">
              <p className="date right">
                Aug 5 &nbsp;
                <i className="status icon ion-ios-checkmark-outline x15"></i>
                <br/>
                <span className="time">2:30am</span>
              </p>
          </div>
        </div>
        <div className="chat card">
          <img src="http://i.pravatar.cc/60?img=59"
              alt="@jattoade" className="left"/>
          <div className="message left">
              <p className="sender_details">
                  Ajala AbdulSamii
                  <span className="sender_username">@jalasem</span>
              </p>
              <p className="sender_message">
              Hello!, welcome to NodeJS Room. It is a pleasure 2 have u too.
              </p>
          </div>
          <div className="right details">
              <p className="date right">
              Aug 5 &nbsp;
              <i className="status icon ion-alert x15"></i>
              <br/>
              <span className="time">2:34am</span>
              </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageItem;
