import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
import { SideMenu, MainNav } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/Dashboard.css"; // Dashboard.scss

class Dashboard extends React.Component {

  render() {
    return (
        <div>
            <SideMenu />
            <MainNav />
            <h2>
                Dashboard
            </h2>
            <p>
                Welcome to PostiT
            </p>
            <p>
                You Dont Have to Shout, Just PostiT
                <span>
                    To start using PostiT, Just Create a group...or...
                    select a group from the side menu, and Enjoy PostiT
                </span>
            </p>
            <button>Create Group</button>
        </div>
    );
  }
}

export default Dashboard;
